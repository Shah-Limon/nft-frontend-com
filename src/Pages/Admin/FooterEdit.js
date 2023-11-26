import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";
const FooterEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [footerLink, setFooterLink] = useState([]);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/footer-links/`)
      .then((res) => res.json())
      .then((info) => setFooterLink(info));
  }, [id]);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-social/`)
      .then((res) => res.json())
      .then((info) => setSocial(info));
  }, [id]);

  // const handleFooter = (event) => {
  //   event.preventDefault();
  //   const facebook = event.target.facebook.value;
  //   const twitter = event.target.twitter.value;
  //   const instragram = event.target.instragram.value;
  //   const youtube = event.target.youtube.value;

  //   const footerSocial = {
  //     facebook,
  //     twitter,
  //     instragram,
  //     youtube,
  //   };

  //   const url = `http://localhost:5000/footer-social/`;
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(footerSocial),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       navigate("/admin/setting");
  //     });
  // };

  // const handleLinks = (event) => {
  //   event.preventDefault();
  //   const linkOne = event.target.linkOne.value;
  //   const linkTwo = event.target.linkTwo.value;
  //   const linkThree = event.target.linkThree.value;
  //   const linkFour = event.target.linkFour.value;
  //   const linkFive = event.target.linkFive.value;

  //   const footerLink = {
  //     linkOne,
  //     linkTwo,
  //     linkThree,
  //     linkFour,
  //     linkFive,
  //   };

  //   const url = `http://localhost:5000/footer-link`;
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(footerLink),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       navigate("/admin/setting");
  //     });
  // };

  return (
    <div>
      {/* <form class="form" onSubmit={handleFooter}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <h4 className="mb-15">Update Social Account</h4>
            <div class="col-sm">
              <label className="mt-1">Enter Facebook Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Facebook Link"
                  name="facebook"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Twiiter Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Twiiter Link"
                  name="twitter"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Instragram Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Instragram Link"
                  name="instragram"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Youtube Link</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Youtube Link"
                  name="youtube"
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
      </form> */}

      {/* <form class="form mb-15" onSubmit={handleLinks}>
        <h4 className="mb-15">Update Links</h4>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Enter Link One</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link One"
                  name="linkOne"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Two</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Two"
                  name="linkTwo"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Three</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Three"
                  name="linkThree"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Four</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Four"
                  name="linkFour"
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Link Five</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Link Five"
                  name="linkFive"
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
      </form> */}

      <section className="participants payment-setting" data-aos="fade-up" data-aos-duration={3000}>
        <div className="container">
        <BackToAdminDashboard></BackToAdminDashboard>
          <div className="row mt-15">
            <div className="col-lg-4">
              <div className="block-text center">
                <div className="col">
                  <h5 className="heading">Contact Options</h5>

                  {social.map((e) => (
                    <Link
                      to={`/admin/edit-social/${e._id}`}
                      className="action-btn"
                    >
                      <span>Edit</span>
                    </Link>
                  ))}

                  <hr></hr>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-text center">
                <div className="col">
                  <h5 className="heading">Footer About Options</h5>

                  {footerLink.map((e) => (
                    <Link
                      to={`/admin/edit-footer/${e._id}`}
                      className="action-btn"
                    >
                      <span>Edit</span>
                    </Link>
                  ))}

                  <hr></hr>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterEdit;
