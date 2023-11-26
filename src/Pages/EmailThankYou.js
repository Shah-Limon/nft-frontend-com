import React from "react";
import { Link } from "react-router-dom";

const EmailThankYou = () => {
  return (
    <>
      <section className="watch-video">
        <div className="shape" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                
              </div>
              <div className="watch-video__main">
                <div className="main mt-15">
                  <h5>Congratulations! 🚀 Your SEO report is on its way</h5>
                  <p>
                    We've received your website and email, and our SEO wizards
                    are already hard at work, analyzing your online presence.{" "}
                  </p>
                  <img
                  className="mt-15"
                    style={{ borderRadius: "15px" }}
                    src="https://i.ibb.co/Qc7FKJ7/Seo-Report.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailThankYou;
