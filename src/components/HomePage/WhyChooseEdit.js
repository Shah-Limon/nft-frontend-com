import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const WhyChooseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [choose, SetChoose] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imgbbApiKey] = useState("1f8cc98e0f42a06989fb5e2589a9a8a4"); // Your imgbb API key

  useEffect(() => {
    fetch(`http://localhost:5000/why-choose/`)
      .then((res) => res.json())
      .then((info) => SetChoose(info));
  }, []);

  const handleWhyEdit = async (event) => {
    event.preventDefault();
    const whyToptext = event.target.whyToptext.value;
    const bannerHeadingText1 = event.target.bannerHeadingText1.value;
    const bannerHeadingText2 = event.target.bannerHeadingText2.value;
    const cardTitleOne = event.target.cardTitleOne.value;
    const cardDescOne = event.target.cardDescOne.value;
    const cardTitleTwo = event.target.cardTitleTwo.value;
    const cardDescTwo = event.target.cardDescTwo.value;
    const cardTitleThree = event.target.cardTitleThree.value;
    const cardDescThree = event.target.cardDescThree.value;
    const cardTitleFour = event.target.cardTitleFour.value;
    const cardDescFour = event.target.cardDescFour.value;

    // Determine if an image is being uploaded or if a stored image link should be used
    let img = imageFile ? imagePreview : choose[0].img;

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
      img,
      whyToptext,
      bannerHeadingText1,
      bannerHeadingText2,
      cardTitleOne,
      cardDescOne,
      cardTitleTwo,
      cardDescTwo,
      cardTitleThree,
      cardDescThree,
      cardTitleFour,
      cardDescFour,
    };

    const url = `http://localhost:5000/edit-why-choose/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(chooseData),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
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
      <form className="form mb-15" onSubmit={handleWhyEdit}>
        {choose.map((e) => (
          <div className="container" key={e.id}>
            <div className="justify-content-center align-items-baseline">
              <div className="col-sm">
                <label className="mt-1">
                  Upload Image 
                </label>
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
                {!imageFile && !imagePreview && e.img && (
                  <img
                    src={e.img}
                    alt="Stored Images"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>

              <div class="col-sm">
                <label className="mt-1">Why Choose Title Top Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Banner Top Text"
                    name="whyToptext"
                    defaultValue={e.whyToptext}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Heading Text(1sT Line)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Heading Text(1sT Line)"
                    name="bannerHeadingText1"
                    defaultValue={e.bannerHeadingText1}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Heading Text(2nd Line)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Heading Text(1sT Line)"
                    name="bannerHeadingText2"
                    defaultValue={e.bannerHeadingText2}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Card Title (One)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (One)"
                    name="cardTitleOne"
                    defaultValue={e.cardTitleOne}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Card Description (One)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (One)"
                    name="cardDescOne"
                    defaultValue={e.cardDescOne}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Two)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Two)"
                    name="cardTitleTwo"
                    defaultValue={e.cardTitleTwo}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Two)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (Two)"
                    name="cardDescTwo"
                    defaultValue={e.cardDescTwo}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Three)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Three)"
                    name="cardTitleThree"
                    defaultValue={e.cardTitleThree}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Three)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (Three)"
                    name="cardDescThree"
                    defaultValue={e.cardDescThree}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Card Title (Four)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Title (Four)"
                    name="cardTitleFour"
                    defaultValue={e.cardTitleFour}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Card Description (Four)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Card Description (Four)"
                    name="cardDescFour"
                    defaultValue={e.cardDescFour}
                  />
                </div>
              </div>

              <div className="col-sm">
                <button type="submit" className="action-btn">
                  <span>Update Why Choose</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default WhyChooseEdit;
