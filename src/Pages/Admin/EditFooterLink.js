import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const EditFooterLink = () => {
  const [footerLink, setFooterLink] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLinks = (event) => {
    event.preventDefault();
    const FooterAbout = event.target.FooterAbout.value;

    const CopyRight = event.target.CopyRight.value;

    const footerLink = {
      FooterAbout,
     
      CopyRight,
    };

    const url = `http://localhost:5000/footer-link/${id}/`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerLink),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/footer-link/${id}`)
      .then((res) => res.json())
      .then((info) => setFooterLink(info));
  }, [id]);

  return (
    <div className="payment-setting" data-aos="fade-up" data-aos-duration={2000}>
      <BackToAdminDashboard></BackToAdminDashboard>
      <form class="form mb-15" onSubmit={handleLinks}>
        <h4 className="mb-15">Update About & CopyRight</h4>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Enter Short About</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type short About"
                  name="FooterAbout"
                  defaultValue={footerLink.FooterAbout}
                />
              </div>
            </div>
            
            <div class="col-sm">
              <label className="mt-1">Enter CopyRight Text</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter CopyRight Text"
                  name="CopyRight"
                  defaultValue={footerLink.CopyRight}
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

export default EditFooterLink;
