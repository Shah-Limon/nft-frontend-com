import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const EditMetaInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meta, setMeta] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgbbApiKey] = useState("1f8cc98e0f42a06989fb5e2589a9a8a4"); // Your imgbb API key

  useEffect(() => {
    fetch(`http://localhost:5000/meta-infomation/${id}`)
      .then((res) => res.json())
      .then((info) => setMeta(info));
  }, [id]);

  const handleMetaUpdate = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
  
    let img = null;
  
    if (meta.length > 0 && meta[0].img) {
      img = meta[0].img;
    }
  
    // Determine if an image is being uploaded or if a stored image link should be used
    img = imageFile ? imagePreview : img;
  
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
  
        img = imgbbResponse.data.data.url;
      } catch (error) {
        console.error("Image upload to imgbb failed:", error);
        return; // Don't proceed if image upload fails
      }
    }
  
    const chooseData = {
      title,
      description,
      img,
    };
  
    const url = `http://localhost:5000/meta-infomation/${id}`;
    fetch(url, {
      method: "PUT",
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
        <div className="container" key={meta._id}>
          <div className="justify-content-center align-items-baseline">
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
              {!imageFile && !imagePreview && meta.img && (
                <img
                  src={meta.img}
                  alt="Stored Images"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>

            <div class="col-sm">
              <label className="mt-1">Edit Meta Title</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Edit Meta Title"
                  name="title"
                  defaultValue={meta.title}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Edit Meta description</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Edit Meta description"
                  name="description"
                  defaultValue={meta.description}
                />
              </div>
            </div>

            <div className="col-sm">
              <button type="submit" className="action-btn">
                <span>Update Meta</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMetaInfo;
