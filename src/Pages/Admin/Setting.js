import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const Setting = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/meta-infomations`)
      .then((res) => res.json())
      .then((info) => setMeta(info));
  }, [id]);
  return (
    <>
      <section
        className="project s2 payment-setting"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        <div className="shape right" />
        <div className="container">
          <BackToAdminDashboard></BackToAdminDashboard>
          <div className="row mt-15">
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/setting-general/" className="h5 title">
                    General Setting
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/setting-footer" className="h5 title">
                    Footer Setting
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/setting-payment" className="h5 title">
                    Payment Setting
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/setting-homepage" className="h5 title">
                    HomePage Setting
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  {contact.map((e) => (
                    <Link
                      to={`/admin/edit-contact-page/${e._id}`}
                      className="h5 title"
                    >
                      Contact Page Setting
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  {contact.map((e) => (
                    <Link to="/admin/feature-page" className="h5 title">
                      Features Page Setting
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  {meta.map((e) => (
                    <Link to={`/admin/edit-meta/${e._id}`} className="h5 title">
                      Update Meta Info
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/services-list" className="h5 title">
                    Services List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Setting;
