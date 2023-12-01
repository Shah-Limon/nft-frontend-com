import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imgbbApiKey] = useState("1f8cc98e0f42a06989fb5e2589a9a8a4"); // Your imgbb API key
  const [serviceImageFile, setServiceImageFile] = useState(null);
  const [serviceImagePreview, setServiceImagePreview] = useState(null);
  const [postSlug, setPostSlug] = useState("");
  

  const handleServiceImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setServiceImageFile(selectedFile);
    const previewURL = URL.createObjectURL(selectedFile);
    setServiceImagePreview(previewURL);
  };

  const checkSlugExists = async (slug) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/check-slug/${slug}`
      );
      return response.data;
    } catch (error) {
      console.error("Error checking slug:", error);
      return [];
    }
  };

  const handleEditService = async (event) => {
    event.preventDefault();
    setLoading(true);
    const title = event.target.title.value;
    const description = event.target.description.value;

    let postSlug = event.target.postSlug.value.trim();
    if (!postSlug) {
      postSlug = generateSlug(title);
    }
    const existingSlugs = await checkSlugExists(postSlug);
    if (existingSlugs.includes(postSlug)) {
      let slugCounter = 1;
      let newSlug = postSlug;
      while (existingSlugs.includes(newSlug)) {
        newSlug = `${postSlug}-${slugCounter}`;
        slugCounter++;
      }
      postSlug = newSlug;
    }

    let serviceImg = service.img || null;
    serviceImg = serviceImageFile ? serviceImagePreview : serviceImg;

    if (serviceImageFile) {
      try {
        const formData = new FormData();
        formData.append("image", serviceImageFile);
        formData.append("key", imgbbApiKey);

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        serviceImg = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Service Image upload to imgbb failed:", error);
        return;
      }
    }

    const updateService = {
      title,
      description,
      img: serviceImg,
      postSlug,
    };

    const url = `http://localhost:5000/update-service-list/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateService),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        navigate("/admin/setting");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error adding service:", error);
      });
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Update postSlug when title changes
  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    const slug = generateSlug(titleValue);
    setPostSlug(slug);
  };

  const [service, setService] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/service-list/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setService(info);
        if (info && info.postSlug) {
          setPostSlug(info.postSlug);
          setServiceImagePreview(info.img);
        }
      });
  }, [id]);

  const [ServicePackage, setServicesPackages] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/service-packages`)
      .then((res) => res.json())
      .then((info) => setServicesPackages(info));
  }, []);

  let rowNumber = 1;

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>

      <h4 className="text-center mt-15">Edit Service</h4>
      <form className="form mb-15" onSubmit={handleEditService}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div className="col-sm">
              <label className="mt-1">Service Image</label>
              <div className="form-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleServiceImageUpload}
                />
              </div>
              {serviceImagePreview && (
                <img
                  src={serviceImagePreview}
                  alt="ServiceImage"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
            <div class="col-sm">
              <label className="mt-1">Edit Service Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Service Title"
                  name="title"
                  defaultValue={service && service.title}
                  onChange={handleTitleChange}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Edit Post Slug</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="postSlug"
                  defaultValue={postSlug}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Edit Service Description</label>
              <div class="form-group mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Type Service Description"
                  style={{ width: "100%", minHeight: "200px" }}
                  name="description"
                  defaultValue={service && service.description}
                />
              </div>
            </div>

            <div className="col-sm">
              <button
                type="submit"
                className="action-btn"
                disabled={loading}
                style={{ marginBottom: "100px" }}
              >
                {loading ? (
                  <span>Updating...</span>
                ) : (
                  <span>Update Service</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="container mt-3">
        <h5 className="text-center mt-15">Package List</h5>
        {
          ServicePackage.filter(plan => plan.serviceID === service._id).length < 3 &&
          <Link
          to={`/admin/add-service-package/${id}`}
          className="mt-15 action-btn"
        >
          <span>Add Service Package</span>
        </Link>
        }
        
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Package Name</th>
              <th>Package Price</th>
              <th>Edit</th>
            </tr>

            {ServicePackage.map(
              (e) => 
                service._id === e.serviceID && (
                  <tr key={e._id}>
                    <td>{rowNumber++}</td>
                    <td data-th="Website Name">{e.packageName}</td>
                    <td data-th="Email">${e.price} USD</td>
                    <td data-th="Edit">
                      <Link to={`/admin/edit-service-package/${e._id}`}>Edit</Link>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditService;

