import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
const PackageTitleEdit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/package-title/${id}`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  const handlePackagesTitle = (event) => {
    event.preventDefault();
    const titleTop = event.target.titleTop.value;
    const titleOne = event.target.titleOne.value;
    const titleTwo = event.target.titleTwo.value;
    const description = event.target.description.value;

    const packageTitle = {
      titleTop,
      titleOne,
      titleTwo,
      description,
    };

    const url = `http://localhost:5000/package-title/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(packageTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };

  return (
    <div className="payment-setting" data-aos="fade-up" data-aos-duration={2000}>
      <form class="form" onSubmit={handlePackagesTitle}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Title Top Text</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Title Top Text"
                  name="titleTop"
                  defaultValue={title.titleTop}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Type Title 1st Part</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Title 1st Part"
                  name="titleOne"
                  defaultValue={title.titleOne}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Type Title 2nd Part</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Title 2nd Part"
                  name="titleTwo"
                  defaultValue={title.titleTwo}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Description</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Description"
                  name="description"
                  defaultValue={title.description}
                />
              </div>
            </div>

            <div class="col-sm">
              <button type="submit" class="action-btn">
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PackageTitleEdit;
