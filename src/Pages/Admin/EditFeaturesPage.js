import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditFeaturesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/features`)
      .then((res) => res.json())
      .then((info) => setFeature(info));
  }, []);

  let rowNumber = 1;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFeature = async (event) => {
    event.preventDefault();

    const featureDesc = event.target.featureDesc.value;
    const featureTitle = event.target.featureTitle.value;

    if (!image) {
      alert("Please select an image for the slider.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    // Upload the image to ImgBB using the ImgBB API key
    const imgbbApiKey = "1f8cc98e0f42a06989fb5e2589a9a8a4";
    const imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    try {
      const response = await fetch(imgbbUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const featureImg = data.data.url;

        const feature = {
          featureDesc,
          featureTitle,
          featureImg,
        };

        const url = `http://localhost:5000/add-feature`;
        const sliderResponse = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(feature),
        });

        if (sliderResponse.ok) {
          navigate("/admin/setting-homepage/");
        } else {
          alert("Failed to add feature.");
        }
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
        <BackToAdminDashboard></BackToAdminDashboard>
      {/* <form className="form" onSubmit={handleFeature}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Add Features</span>
            </h4>
            <div className="col-sm">
              <label className="mt-1">Enter Feature Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="featureTitle"
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
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Upload Feature Image</label>
              <div className="form-group mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="col-sm">
              <button type="submit" className="action-btn">
                <span>Add Feature</span>
              </button>
            </div>
          </div>
        </div>
      </form> */}

      <div className="container">
      <h5 className="sub-heading mb-15">
            <span> List</span>
          </h5>
        <table className="rwd-table">
         
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Feature Title</th>
              <th>Edit</th>
            </tr>
            {feature.map((item) => (
              <tr key={item._id}>
                <td>{rowNumber++}</td>
                <td>{item.featureTitle}</td>
                <td data-th="Edit">
                  <Link to={`/admin/edit-feature/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditFeaturesPage;
