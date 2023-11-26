import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const BannerSliderList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);
  const [image, setImage] = useState(null); // To store the uploaded image

  useEffect(() => {
    fetch(`http://localhost:5000/sliders`)
      .then((res) => res.json())
      .then((info) => setSliders(info));
  }, []);

  let rowNumber = 1;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSlider = async (event) => {
    event.preventDefault();

    const sliderTitle = event.target.sliderTitle.value;
    const sliderDesc = event.target.sliderDesc.value;

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
        const sliderImg = data.data.url;

        const slider = {
          sliderTitle,
          sliderDesc,
          sliderImg,
        };

        const url = `http://localhost:5000/slider`;
        const sliderResponse = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(slider),
        });

        if (sliderResponse.ok) {
          navigate("/admin/setting-homepage/");
        } else {
          alert("Failed to add slider.");
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
      <form className="form" onSubmit={handleSlider}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Add Slider</span>
            </h4>
            <div className="col-sm">
              <label className="mt-1">Enter Slider Title</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Slider Title"
                  name="sliderTitle"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Enter Slider Short Description</label>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Slider Short Description"
                  name="sliderDesc"
                />
              </div>
            </div>
            <div className="col-sm">
              <label className="mt-1">Upload Slider Image</label>
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
                <span>Add Slider</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="container">
        <table className="rwd-table">
          <h5 className="sub-heading mb-15">
            <span>Slider List</span>
          </h5>
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Slider Title</th>
              <th>Edit</th>
            </tr>
            {sliders.map((item) => (
              <tr key={item._id}>
                <td>{rowNumber++}</td>
                <td>{item.sliderTitle}</td>
                <td data-th="Edit">
                  <Link to={`/admin/edit-slider/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerSliderList;
