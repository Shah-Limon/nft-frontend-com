import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import axios from "axios";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setPackage] = useState([]);
  const [user] = useAuthState(auth);
  const [imgUrl, setImgUrl] = useState(p.img || "");
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=1f8cc98e0f42a06989fb5e2589a9a8a4",
        formData
      );
      setImgUrl(response.data.data.url);
    } catch (error) {
      console.error("Image upload failed: ", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/package/${id}`)
      .then((res) => res.json())
      .then((info) => setPackage(info));
    setImgUrl(p.img || "");
  }, []);

  let rowNumber = 1;

  const handlePackages = (event) => {
    event.preventDefault();
    const packageName = event.target.packageName.value;
    const price = event.target.price.value;
    const featureOne = event.target.featureOne.value;
    const featureTwo = event.target.featureTwo.value;
    const featureThree = event.target.featureThree.value;
    const featureFour = event.target.featureFour.value;
    const featureFive = event.target.featureFive.value;
    const featureSix = event.target.featureSix.value;
    const featureSeven = event.target.featureSeven.value;
    const featureEight = event.target.featureEight.value;
    const featureNine = event.target.featureNine.value;
    const featureTen = event.target.featureTen.value;

    const websiteCheck = {
      packageName,
      price,
      img: imgUrl,
      featureOne,
      featureTwo,
      featureThree,
      featureFour,
      featureFive,
      featureSix,
      featureSeven,
      featureEight,
      featureNine,
      featureTen,
    };

    const url = `http://localhost:5000/edit-package/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(websiteCheck),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/packages/");
      });
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handlePackages}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1 mb-15">Package Name</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Package Name"
                  name="packageName"
                  defaultValue={p.packageName}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Package Price</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  defaultValue={p.price}
                  placeholder="Enter Package Price"
                  name="price"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Upload Image</label>
              <div class="form-group mb-3">
                <label for="file-upload" className="custom-file-upload">
                  Choose File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="custom-file-input"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imgUrl && (
                  <img src={imgUrl} alt="Uploaded" style={{ width: "100px" }} />
                )}
              </div>
            </div>

            <div class="col-sm">
              <label className="mt-1">Feature One</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Feature One"
                  name="featureOne"
                  defaultValue={p.featureOne}
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
                  name="featureTwo"
                  defaultValue={p.featureTwo}
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
                  name="featureThree"
                  defaultValue={p.featureThree}
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
                  name="featureFour"
                  defaultValue={p.featureFour}
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
                  name="featureFive"
                  defaultValue={p.featureFive}
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
                  name="featureSix"
                  defaultValue={p.featureSix}
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
                  name="featureSeven"
                  defaultValue={p.featureSeven}
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
                  name="featureEight"
                  defaultValue={p.featureEight}
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
                  name="featureNine"
                  defaultValue={p.featureNine}
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
                  name="featureTen"
                  defaultValue={p.featureTen}
                />
              </div>
            </div>

            <div class="col-sm">
              <button type="submit" class="action-btn">
                <span>Update Package</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;
