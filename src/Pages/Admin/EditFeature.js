import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgbbApiKey] = useState("1f8cc98e0f42a06989fb5e2589a9a8a4");

  useEffect(() => {
    fetch(`http://localhost:5000/feature/${id}`)
      .then((res) => res.json())
      .then((info) => setFeature(info));
  }, [id]);

  const handleFeature = async (event) => {
    event.preventDefault();
    // const topText = event.target.topText.value;
    // const title = event.target.title.value;
    // const subText = event.target.subText.value;
    const featureDesc = event.target.featureDesc.value;
    const featureTitle = event.target.featureTitle.value;

    // Determine if an image is being uploaded or if a stored image link should be used
    let featureImg = feature.img; 

    if (!imageFile && feature.featureImg) {
      featureImg = feature.featureImg; 
    }

    // If an image is being uploaded, send it to imgbb
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("key", imgbbApiKey);

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        featureImg = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Image upload to imgbb failed:", error);
        return; 
      }
    }

    const updatedFeature = {
      // topText,
      // title,
      // subText,
      featureImg,
      featureDesc,
      featureTitle,
    };

    const url = `http://localhost:5000/feature/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFeature),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);

    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-15" onSubmit={handleFeature}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Edit Features</span>
            </h4>
            {/* <div className="col-sm">
              <label className="mt-1">Enter Title Top Text</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title Top Text"
                  name="topText"
                  defaultValue={feature.topText}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="title"
                  defaultValue={feature.title}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Short Sub Text</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="subText"
                  defaultValue={feature.subText}
                />
              </div>
            </div> */}

            <div className="col-sm">
              <label className="mt-1">Enter Feature Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="featureTitle"
                  defaultValue={feature.featureTitle} // Set the default value
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Feature Short Description</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Short Description"
                  name="featureDesc"
                  defaultValue={feature.featureDesc}
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Upload Image</label>
              <div className="form-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Images"
                  style={{ maxWidth: "100px" }}
                />
              )}
              {!imageFile && !imagePreview && feature.featureImg && (
                <img
                  src={feature.featureImg}
                  alt="Stored Images"
                  style={{ maxWidth: "100px" }}
                />
              )}
              {!imageFile && !imagePreview && !feature.featureImg && (
                <img
                  src="default-image-url-here"
                  alt="Default Image"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
            <div className="col-sm">
              <button type="submit" className="action-btn">
                <span>Update Feature</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFeature;
