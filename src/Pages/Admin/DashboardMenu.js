import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import BackToAdminDashboard from "./BackToAdminDashboard";

const DashboardMenu = () => {
  const [user] = useAuthState(auth);
  const handleSignout = () => {
    signOut(auth);
  };

  return (
    <>
      <section className="project s2">
        <div className="shape right" />
        <div className="container">
          <div className="row">
            <div className="row mb-15">
              <div
                className="col"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div>
                  {user ? (
                    <Link className="action-btn" onClick={handleSignout}>
                      <span>Signout</span>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/packages/" className="h5 title">
                    Packages (edit)
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/orders/" className="h5 title">
                    Total Orders
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/setting" className="h5 title">
                    Setting Option
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/help-desk/" className="h5 title">
                    Help Desk
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/subscription-email/" className="h5 title">
                    Subscription Email
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/contact-messages/" className="h5 title">
                    Contact Messages
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/manage-users/" className="h5 title">
                    Manage Users
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="project-box">
                <div className="image"></div>
                <div className="content">
                  <Link to="/admin/audit-request/" className="h5 title">
                    Audit Request
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

export default DashboardMenu;
