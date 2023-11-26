import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditBannerSlider = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/slider/${id}`)
      .then((res) => res.json())
      .then((info) => setSliders(info));
  }, [id]);

  let rowNumber = 1;

  const handleSlider = async (event) => {
    event.preventDefault();

    const sliderTitle = event.target.sliderTitle.value;
    const sliderDesc = event.target.sliderDesc.value;
    const fileInput = event.target.sliderImg.files[0]; // Get the selected file

    // Upload the image to imgbb
    try {
      const formData = new FormData();
      formData.append("image", fileInput);
      formData.append("key", "1f8cc98e0f42a06989fb5e2589a9a8a4"); // Your imgbb API key

      const imgbbResponse = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );

      const sliderImg = imgbbResponse.data.data.url; // Get the image URL from the imgbb response

      const sliderUpdate = {
        sliderTitle,
        sliderDesc,
        sliderImg,
      };

      const url = `http://localhost:5000/slider/${id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sliderUpdate),
      })
        .then((res) => res.json())
        .then((result) => {
          navigate("/admin/setting-homepage/");
        });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="payment-setting" data-aos="fade-up" data-aos-duration={3000}>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handleSlider}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="sub-heading">
              <span>Update Slider</span>
            </h4>
            <div class="col-sm">
              <label className="mt-1">Enter Slider Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Slider Title"
                  name="sliderTitle"
                  defaultValue={sliders.sliderTitle}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Slider Short Description</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Slider Short Description"
                  name="sliderDesc"
                  defaultValue={sliders.sliderDesc}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Upload Slider Image</label>
              <div class="form-group mb-3">
                <input
                  type="file"
                  class="form-control"
                  name="sliderImg"
                />
              </div>
            </div>

            <div class="col-sm">
              <button type="submit" class="action-btn">
                <span>Update Slider</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBannerSlider;
