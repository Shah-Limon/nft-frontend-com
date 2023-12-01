import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackToAdminDashboard from "./Admin/BackToAdminDashboard";

const AddServicePackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setPackage] = useState([]);
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);

  const [imgUrl, setImgUrl] = useState(p.img || "");

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
    console.log("Fetching data for ID:", id);
    fetch(`http://localhost:5000/service-list/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((info) => {
        console.log("Fetched data:", info);
        setService(info);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  const handlePackages = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const serviceID = event.target.serviceID.value;
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
        serviceID,
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

      const url = `http://localhost:5000/add-service-package`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(websiteCheck),
      });

      if (response.ok) {
        setLoading(false); // Set loading to false when request completes
        navigate("/admin/setting/");
      } else {
        throw new Error("Failed to add package");
      }
    } catch (error) {
      setLoading(false); // Set loading to false if there's an error
      console.error("Error adding package:", error);
    }
  };

  return (
    <div className="mb-5">
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handlePackages}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <input
              type="text"
              class="form-control"
              value={service._id}
              name="serviceID"
            />
            <div class="col-sm">
              <label className="mt-1 mb-15">Package Name</label>
              <div class="form-group mb-3">
                <input
                required
                  type="text"
                  class="form-control"
                  placeholder="Type Package Name"
                  name="packageName"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Package Price</label>
              <div class="form-group mb-3">
                <input
                required
                  type="number"
                  class="form-control"
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
                />
              </div>
            </div>

            <div class="col-sm">
              <button type="submit" className="action-btn" disabled={loading}>
              <span>{loading ? 'Adding...' : 'Add Package'}</span>
               
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddServicePackage;
