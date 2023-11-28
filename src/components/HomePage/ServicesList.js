import React, { useEffect, useState } from "react";
import "./ServicesList.css";
import { Link } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/services-list/`)
      .then((res) => res.json())
      .then((info) => setServices(info));
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <section
        className="speciality"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        <div className="" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Our Speciality</span>
                </h6>
                <h3 className="heading wow" data-splitting="">
                  Our Speciality Title One <br />
                  Our Speciality Title Two
                </h3>
                <p className="">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            </div>

            <div className="col">
              <div className="speciality-box">
                <div className="row">
                  {services.map((e) => (
                    <div className="col-lg-4 col-md-6 mb-4">
                      <Link to={`/service/${e.postSlug}`}>
                        <div className="card-box w-100 service_card">
                          <div className="top d-flex"></div>
                          <div className="content">
                            <div className="image" style={{ height: "200px" }}>
                              <img src={e.img} alt="id" />
                            </div>
                            <div>
                              <h5 className="m-3">{e.title}</h5>
                            </div>
                            <div>
                              <p className="service__text">
                                {truncateText(e.description, 200)}
                              </p>
                            </div>
                            <Link
                              class="action-btn"
                              to={`/service/${e.postSlug}`}
                            >
                              <span>Click</span>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesList;
