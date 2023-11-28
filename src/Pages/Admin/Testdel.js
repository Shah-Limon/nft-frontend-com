// Your React component (CreateService.js)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const CreateService = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgbbApiKey] = useState("1f8cc98e0f42a06989fb5e2589a9a8a4"); // Your imgbb API key

  const checkSlugExists = async (slug) => {
    try {
      const response = await axios.get(`http://localhost:5000/check-slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error checking slug:", error);
      return [];
    }
  };

  const handleMetaUpdate = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    let postSlug = event.target.postSlug.value.trim(); // Get the entered slug

    if (!postSlug) {
      // If no slug is provided, generate one from the title
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

    let img = null;
    img = imageFile ? imagePreview : img;

    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("key", imgbbApiKey);

        const imgbbResponse = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );

        img = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Image upload to imgbb failed:", error);
        return;
      }
    }

    const chooseData = {
      title,
      description,
      img,
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
        navigate("/admin/setting");
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

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form className="form mb-15" onSubmit={handleMetaUpdate}>
      <form className="form mb-15" onSubmit={handleMetaUpdate}>
        <div className="container">
          <div className="justify-content-center align-items-baseline">
            <div className="col-sm">
              <label className="mt-1">Add Service Image</label>
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
              <label className="mt-1">Post Slug</label>
              <div class="form-group mb-3">
                <input type="text" class="form-control" name="postSlug" />
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
              <button type="submit" className="action-btn">
                <span>Add Service</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      </form>
    </div>
  );
};

export default CreateService;
