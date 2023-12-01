import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/service/${slug}`)
      .then((res) => res.json())
      .then((info) => setServiceData(info))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [slug]);

  const margin0 = {
    marginBottom: "0",
    marginRight: "10px",
  };

  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);
  const [ServicePackage, setServicesPackages] = useState([]);
  useEffect(() => {
    fetch(` http://localhost:5000/service-packages`)
      .then((res) => res.json())
      .then((info) => setServicesPackages(info));
  }, []);

  return (
    <>
      <section
        className="touch"
        data-aos="fade-up"
        data-aos-duration={2000}
        style={{ padding: "104px 0 25px", marginBottom: "20px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Service Details</span>
                </h6>
                <h4 className="heading wow" data-splitting="">
                  {serviceData.title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="card-box__features_card">
        <section
          className="about payment-setting card-box__features features__center"
          data-aos="fade-up"
          data-aos-duration={2000}
        >
          <div className="shape" />

          <div className="container">
            <>
              <div className="row  justify-content-center">
                <div className="col-lg-5 col-md-12">
                  <div className="about__right">
                    <div className="images">
                      <img className="img1" src={serviceData.img} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12">
                  <div className="block-text">
                    {/* <h4 className="heading wow" data-splitting="">
                      {serviceData.title}
                    </h4> */}
                    <p className="mb-17 feature__text-left">
                      {serviceData.description &&
                        serviceData.description
                          .split("\n")
                          .map((sentence, sentenceIndex) => (
                            <p key={sentenceIndex}>{sentence}</p>
                          ))}
                    </p>
                  </div>
                </div>
              </div>
            </>
          </div>
        </section>
      </div>
      <section
        style={{ marginTop: "50px" }}
        className="testimonials s2"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="testimonials__main">
                {title.map((e) => (
                  <div className="block-text center">
                    <h3 className="heading">
                      {e.titleOne} <br />
                      {e.titleTwo}
                    </h3>
                    <p className="mt-15"> {e.description}</p>
                  </div>
                ))}
                <div className="swiper testimonials-swiper s2">
                  <div className="container">
                    <div className="row">
                      {ServicePackage.map(
                        (e) =>
                          serviceData._id === e.serviceID && (
                            <div className="col-lg-4 col-md-6 col-12 margin__mobile">
                              <div className="swiper-slide service_card z-3">
                                <div className="box-testimonial center">
                                  <div className="image">
                                    <img src={e.img} alt="" />
                                  </div>
                                  <div className="info">
                                    <h5 className="name">${e.price} USD</h5>

                                    <p>{e.packageName}</p>
                                    <img
                                      src="https://themesflat.co/html/cyfoniihtml/assets/images/icon/quote-2.png"
                                      alt=""
                                    />
                                  </div>
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureOne}</span>
                                  </li>
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureTwo}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureThree}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureFour}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureFive}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureSix}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureSeven}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureEight}</span>
                                  </li>{" "}
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureNine}</span>
                                  </li>
                                  <li className="text1">
                                    <img
                                      style={margin0}
                                      src="https://i.ibb.co/HnrpzH6/icons8-tick-16.png"
                                      alt="images"
                                    ></img>
                                    <span>{e.featureTen}</span>
                                  </li>
                                  <Link
                                    class="action-btn"
                                    to={`/service-package/${e._id}`}
                                  >
                                    {" "}
                                    <span>Buy Now</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetails;
