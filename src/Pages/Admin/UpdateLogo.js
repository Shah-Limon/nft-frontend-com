import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const UpdateLogo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogoUpload = async (event) => {
    event.preventDefault();
    const logoFile = event.target.logo.files[0];

    if (!logoFile) {
      // Handle case where no file is selected.
      return;
    }

    // Upload the logo to ImgBB and get the URL
    const imgbbApiKey = "1f8cc98e0f42a06989fb5e2589a9a8a4"; // Replace with your ImgBB API key
    const formData = new FormData();
    formData.append("image", logoFile);

    try {
      const imgbbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=" + imgbbApiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      if (imgbbResponse.ok) {
        const imgbbData = await imgbbResponse.json();
        const logoUrl = imgbbData.data.url;

        // Update the logo URL in your MongoDB server
        const updateData = {
          logo: logoUrl,
        };

        const url = `http://localhost:5000/logo/${id}`;
        const updateResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (updateResponse.ok) {
          navigate("/admin/setting-general/");
        } else {
          // Handle the case where the update to MongoDB fails
        }
      } else {
        // Handle the case where ImgBB upload fails
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error:", error);
    }
  };

  return (
    <div className="payment-setting" data-aos="fade-up" data-aos-duration={3000}>
      <form className="form" onSubmit={handleLogoUpload}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div className="col-sm">
              <label className="mt-1">Upload Logo</label>
              <div className="form-group mb-3">
                <input type="file" className="form-control" name="logo" />
              </div>
            </div>

            <div className="col-sm">
              <button type="submit" className="action-btn">
                <span>Upload Logo</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateLogo;
