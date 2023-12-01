import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const EditServiceTitle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/service-title`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);

  const handleUpdateTitle = (event) => {
    event.preventDefault();
    const titleTopText = event.target.titleTopText.value;
    const title = event.target.title.value;
    const description = event.target.description.value;
   

    const updateTeamTitle = {
      titleTopText,
      title,
      description,
    };

    const url = `http://localhost:5000/edit-service-title/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateTeamTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/services-list");
      });
  };

  return (
    <div
      className="payment-setting"
      data-aos="fade-up"
      data-aos-duration={2000}
    >
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form" onSubmit={handleUpdateTitle}>
        <div class="container">
          {
            title.map(e =>
              <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Title Top Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type Title Top Text"
                    name="titleTopText"
                    defaultValue={e.titleTopText}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Title</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Title"
                    name="title"
                    defaultValue={e.title}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Short Description</label>
                <div class="form-group mb-3">
                  <textarea
                  style={{ width: '100%', height: '100px' }}
                    type="text"
                    class="form-control"
                    placeholder="Enter Short Description"
                    name="description"
                    defaultValue={e.description}
                  />
                </div>
              </div>
  
              <div class="col-sm">
                <button type="submit" class="action-btn">
                  <span>Update Title</span>
                </button>
              </div>
            </div>
              )
          }
          
          
         
        </div>
      </form>
    </div>
  );
};

export default EditServiceTitle;
