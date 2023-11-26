import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const [logo, setLogo] = useState([]);
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState([]);


  const handleSignout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setAdmin(info));
  }, []);

 

  return (
    <>
      <header id="header_main" className="header">
        <div className="container big">
          <div className="row">
            <div className="col-12">
              <div className="header__body">
                <div className="header__logo">
                  {logo.map((showLogo , index) => (
                    <Link to="/" key={index}>
                      <img
                        id="site-logo"
                        src={showLogo.logo}
                        alt="Logo"
                        width={160}
                        height={38}
                        data-width={160}
                        data-height={38}
                      />
                    </Link>
                  ))}
                </div>
                <div className="header__right">
                  <nav id="main-nav" className="main-nav">
                    <ul id="menu-primary-menu" className="menu">
                      <li className="menu-item">
                        <Link to="/">Home</Link>
                      </li>

                      <li className="menu-item">
                        <Link to="/pricing">Pricing</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                      <li className="menu-item menu-item__dashlink">
                        <Link to="/user-dashboard">Dashboard</Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="mobile-button">
                    <span />
                  </div>
                </div>
                <div className="header__action">
                  {user ? (
                    <Link className="action-btn" to="/user-dashboard">
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="action-btn">
                      <span>Login Now</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
