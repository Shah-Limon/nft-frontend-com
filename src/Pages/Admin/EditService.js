import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

    const updateService = {
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
        // Set the postSlug from service.postSlug if it exists
        if (info && info.postSlug) {
          setPostSlug(info.postSlug);
        }
      });
  }, [id]);

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

            <div class="justify-content-center align-items-baseline">
              <hr></hr>
              <h4 className="text-center mt-15">Edit Package One</h4>
              <div class="col-sm">
                <label className="mt-1 mb-15">Package Name</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Package Name"
                    name="packageNamePackageOne"
                    defaultValue={service && service.packageNamePackageOne}
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
                    defaultValue={service && service.pricePackageOne}
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
                    defaultValue={service && service.packageImagePackageOne}
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
                    defaultValue={service && service.featureOnePackageOne}
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
                    defaultValue={service && service.featureTwoPackageOne}
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
                    defaultValue={service && service.featureThreePackageOne}
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
                    defaultValue={service && service.featureFourPackageOne}
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
                    defaultValue={service && service.featureFivePackageOne}
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
                    defaultValue={service && service.featureSixPackageOne}
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
                    defaultValue={service && service.featureSevenPackageOne}
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
                    defaultValue={service && service.featureEightPackageOne}
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
                    defaultValue={service && service.featureNinePackageOne}
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
                    defaultValue={service && service.featureTenPackageOne}
                  />
                </div>
              </div>
            </div>
            <div class="justify-content-center align-items-baseline">
              <hr></hr>
              <h4 className="text-center mt-15">Edit Package Two</h4>
              <div class="col-sm">
                <label className="mt-1 mb-15">Package Name</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Package Name"
                    name="packageNamePackageTwo"
                    defaultValue={service && service.packageNamePackageTwo}
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
                    defaultValue={service && service.pricePackageTwo}
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
                    defaultValue={service && service.packageImagePackageTwo}
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
                    defaultValue={service && service.featureOnePackageTwo}
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
                    defaultValue={service && service.featureTwoPackageTwo}
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
                    defaultValue={service && service.featureThreePackageTwo}
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
                    defaultValue={service && service.featureFourPackageTwo}
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
                    defaultValue={service && service.featureFivePackageTwo}
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
                    defaultValue={service && service.featureSixPackageTwo}
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
                    defaultValue={service && service.featureSevenPackageTwo}
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
                    defaultValue={service && service.featureEightPackageTwo}
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
                    defaultValue={service && service.featureNinePackageTwo}
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
                    defaultValue={service && service.featureTenPackageTwo}
                  />
                </div>
              </div>
            </div>
            <div class="justify-content-center align-items-baseline">
              <hr></hr>
              <h4 className="text-center mt-15">Edit Package Three</h4>
              <div class="col-sm">
                <label className="mt-1 mb-15">Package Name</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Package Name"
                    name="packageNamePackageThree"
                    defaultValue={service && service.packageNamePackageThree}
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
                    defaultValue={service && service.pricePackageThree}
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
                    defaultValue={service && service.packageImagePackageThree}
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
                    defaultValue={service && service.featureOnePackageThree}
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
                    defaultValue={service && service.featureTwoPackageThree}
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
                    defaultValue={service && service.featureThreePackageThree}
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
                    defaultValue={service && service.featureFourPackageThree}
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
                    defaultValue={service && service.featureFivePackageThree}
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
                    defaultValue={service && service.featureSixPackageThree}
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
                    defaultValue={service && service.featureSevenPackageThree}
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
                    defaultValue={service && service.featureEightPackageThree}
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
                    defaultValue={service && service.featureNinePackageThree}
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
                    defaultValue={service && service.featureTenPackageThree}
                  />
                </div>
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
    </div>
  );
};

export default EditService;
