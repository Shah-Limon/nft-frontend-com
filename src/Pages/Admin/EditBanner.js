import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, [id]);

  const [user] = useAuthState(auth);

  const handleBanner = (event) => {
    event.preventDefault();
    const bannerToptext = event.target.bannerToptext.value;
    const bannerHeadingText1 = event.target.bannerHeadingText1.value;
    const bannerHeadingText2 = event.target.bannerHeadingText2.value;
    const typingHeading1 = event.target.typingHeading1.value;
    const typingHeading2 = event.target.typingHeading2.value;
    const typingHeading3 = event.target.typingHeading3.value;
    const bannertext = event.target.bannertext.value;

    const updateBanner = {
      bannerToptext,
      bannerHeadingText1,
      bannerHeadingText2,
      typingHeading1,
      typingHeading2,
      typingHeading3,
      bannertext,
    };

    const url = `http://localhost:5000/edit-banner/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBanner),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form mb-15" onSubmit={handleBanner}>
        {banner.map((e) => (
          <div class="container">
            <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Banner Top Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Banner Top Text"
                    name="bannerToptext"
                    defaultValue={e.bannerToptext}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">
                  Enter Banner Heading Text(1sT Line)
                </label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Heading Text(1sT Line)"
                    name="bannerHeadingText1"
                    defaultValue={e.bannerHeadingText1}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">
                  Enter Banner Heading Text(2sT Line)
                </label>
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
                <label className="mt-1">Enter Banner Typing Text(1)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Typing Text(1)"
                    name="typingHeading1"
                    defaultValue={e.typingHeading1}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Banner Typing Text(2)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Typing Text(2)"
                    name="typingHeading2"
                    defaultValue={e.typingHeading2}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Enter Banner Typing Text(3)</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Typing Text(3)"
                    name="typingHeading3"
                    defaultValue={e.typingHeading3}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Enter Banner Paragraph</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Banner Paragraph"
                    name="bannertext"
                    defaultValue={e.bannertext}
                  />
                </div>
              </div>

              <div class="col-sm">
                <button type="submit" class="action-btn">
                  <span>Update Bannner</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </form>

     
    </div>
  );
};

export default EditBanner;
