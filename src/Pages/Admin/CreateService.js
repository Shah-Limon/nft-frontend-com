import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const CreateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgbbApiKey] = useState("1f8cc98e0f42a06989fb5e2589a9a8a4"); // Your imgbb API key
  const [serviceImageFile, setServiceImageFile] = useState(null);
  const [serviceImagePreview, setServiceImagePreview] = useState(null);

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

  const handleAddService = async (event) => {
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

    let serviceImg = null;
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

    const chooseData = {
      title,
      description,
      img: serviceImg,
      postSlug,
    };

    const url = `http://localhost:5000/add-service`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(chooseData),
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

  const handleDeleteService = (serviceId) => {
    fetch(`http://localhost:5000/service/${serviceId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        const updatedService = services.filter(
          (service) => service._id !== serviceId
        );
        setServices(updatedService);
      })
      .catch((error) => {
        console.error("There was a problem with the delete request:", error);
      });
  };

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/services-list`)
      .then((res) => res.json())
      .then((info) => setServices(info.reverse()));
  }, []);

  const [servicesTitle, setServicesTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/service-title`)
      .then((res) => res.json())
      .then((info) => setServicesTitle(info));
  }, []);

  return (
    <div className="mb-5">
      <BackToAdminDashboard></BackToAdminDashboard>
      <div className="container mt-3">
        <h5 className="text-center mt-15">Services List</h5>

        {servicesTitle.map((e) => (
          <Link key={e.id} to={`/admin/edit-service-title/${e._id}`}>
            <h6 className="mt-15 action-btn">
              <span>Edit Service Title</span>
            </h6>
          </Link>
        ))}

        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Service Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {services.map((item, index) => (
              <tr key={item._id}>
                <td data-th="SL No.">{index + 1}</td>
                <td data-th="Service Name">{item.title}</td>
                <td data-th="Edit">
                  <Link to={`/admin/edit-service/${item._id}`}>Edit</Link>
                </td>
                <td data-th="Delete">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteService(item._id)}
                  >
                    Delete Service
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-center mt-15">Add Service</h4>

      <form className="form mb-15" onSubmit={handleAddService}>
        <input hidden name="postSlug" />
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div className="col-sm">
              <label className="mt-1">Add Service Image</label>
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
              <label className="mt-1">Type Service Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Service Title"
                  name="title"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Type Service Description</label>
              <div class="form-group mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Type Service Description"
                  style={{ width: "100%", minHeight: "200px" }}
                  name="description"
                />
              </div>
            </div>

            <div className="col-sm">
              <button type="submit" className="action-btn" disabled={loading}>
                {loading ? <span>Adding...</span> : <span>Add Service</span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateService;
