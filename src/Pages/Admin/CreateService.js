import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const CreateService = () => {
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

      packageNamePackageOne: event.target.packageNamePackageOne.value,
      packageImagePackageOne: event.target.packageImagePackageOne.value,
      pricePackageOne: event.target.pricePackageOne.value,
      featureOnePackageOne: event.target.featureOnePackageOne.value,
      featureTwoPackageOne: event.target.featureTwoPackageOne.value,
      featureThreePackageOne: event.target.featureThreePackageOne.value,
      featureFourPackageOne: event.target.featureFourPackageOne.value,
      featureFivePackageOne: event.target.featureFivePackageOne.value,
      featureSixPackageOne: event.target.featureSixPackageOne.value,
      featureSevenPackageOne: event.target.featureSevenPackageOne.value,
      featureEightPackageOne: event.target.featureEightPackageOne.value,
      featureNinePackageOne: event.target.featureNinePackageOne.value,
      featureTenPackageOne: event.target.featureTenPackageOne.value,

      packageNamePackageTwo: event.target.packageNamePackageTwo.value,
      packageImagePackageTwo: event.target.packageImagePackageTwo.value,
      pricePackageTwo: event.target.pricePackageTwo.value,
      featureOnePackageTwo: event.target.featureOnePackageTwo.value,
      featureTwoPackageTwo: event.target.featureTwoPackageTwo.value,
      featureThreePackageTwo: event.target.featureThreePackageTwo.value,
      featureFourPackageTwo: event.target.featureFourPackageTwo.value,
      featureFivePackageTwo: event.target.featureFivePackageTwo.value,
      featureSixPackageTwo: event.target.featureSixPackageTwo.value,
      featureSevenPackageTwo: event.target.featureSevenPackageTwo.value,
      featureEightPackageTwo: event.target.featureEightPackageTwo.value,
      featureNinePackageTwo: event.target.featureNinePackageTwo.value,
      featureTenPackageTwo: event.target.featureTenPackageTwo.value,

      packageNamePackageThree: event.target.packageNamePackageThree.value,
      packageImagePackageThree: event.target.packageImagePackageThree.value,
      pricePackageThree: event.target.pricePackageThree.value,
      featureOnePackageThree: event.target.featureOnePackageThree.value,
      featureTwoPackageThree: event.target.featureTwoPackageThree.value,
      featureThreePackageThree: event.target.featureThreePackageThree.value,
      featureFourPackageThree: event.target.featureFourPackageThree.value,
      featureFivePackageThree: event.target.featureFivePackageThree.value,
      featureSixPackageThree: event.target.featureSixPackageThree.value,
      featureSevenPackageThree: event.target.featureSevenPackageThree.value,
      featureEightPackageThree: event.target.featureEightPackageThree.value,
      featureNinePackageThree: event.target.featureNinePackageThree.value,
      featureTenPackageThree: event.target.featureTenPackageThree.value,
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

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/services-list`)
      .then((res) => res.json())
      .then((info) => setServices(info.reverse()));
  }, []);

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

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <div className="container mt-3">
        <h5 className="text-center mt-15">Services List</h5>
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

            <div class="justify-content-center align-items-baseline">
              <hr></hr>
              <h4 className="text-center mt-15">PackageOne</h4>
              <div class="col-sm">
                <label className="mt-1 mb-15">Package Name</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Package Name"
                    name="packageNamePackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Package Price</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Package Price"
                    name="pricePackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Type the Image URL</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type the Image URL"
                    name="packageImagePackageOne"
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Feature One</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature One"
                    name="featureOnePackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Two</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Two"
                    name="featureTwoPackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Three</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type feature Three"
                    name="featureThreePackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Four</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Four"
                    name="featureFourPackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Five</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Five"
                    name="featureFivePackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Six</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Six"
                    name="featureSixPackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Seven</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Seven"
                    name="featureSevenPackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Eight</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Eight"
                    name="featureEightPackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Nine</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Nine"
                    name="featureNinePackageOne"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Ten</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Ten"
                    name="featureTenPackageOne"
                  />
                </div>
              </div>
            </div>
            <div class="justify-content-center align-items-baseline">
              <hr></hr>
              <h4 className="text-center mt-15">Package Two</h4>
              <div class="col-sm">
                <label className="mt-1 mb-15">Package Name</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Package Name"
                    name="packageNamePackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Package Price</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Package Price"
                    name="pricePackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Type the Image URL</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type the Image URL"
                    name="packageImagePackageTwo"
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Feature One</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature One"
                    name="featureOnePackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Two</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Two"
                    name="featureTwoPackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Three</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type feature Three"
                    name="featureThreePackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Four</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Four"
                    name="featureFourPackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Five</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Five"
                    name="featureFivePackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Six</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Six"
                    name="featureSixPackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Seven</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Seven"
                    name="featureSevenPackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Eight</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Eight"
                    name="featureEightPackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Nine</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Nine"
                    name="featureNinePackageTwo"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Ten</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Ten"
                    name="featureTenPackageTwo"
                  />
                </div>
              </div>
            </div>
            <div class="justify-content-center align-items-baseline">
              <hr></hr>
              <h4 className="text-center mt-15">Package Three</h4>
              <div class="col-sm">
                <label className="mt-1 mb-15">Package Name</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Package Name"
                    name="packageNamePackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Package Price</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Package Price"
                    name="pricePackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Type the Image URL</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type the Image URL"
                    name="packageImagePackageThree"
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Feature One</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature One"
                    name="featureOnePackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Two</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Two"
                    name="featureTwoPackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Three</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type feature Three"
                    name="featureThreePackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Four</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Four"
                    name="featureFourPackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Five</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Five"
                    name="featureFivePackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Six</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Six"
                    name="featureSixPackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Seven</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Seven"
                    name="featureSevenPackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Eight</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Eight"
                    name="featureEightPackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Nine</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Nine"
                    name="featureNinePackageThree"
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Feature Ten</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Feature Ten"
                    name="featureTenPackageThree"
                  />
                </div>
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
