import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AboutUs = () => {
  const { id } = useParams();
  const [about, setAbout] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/about/${id}`)
      .then((res) => res.json())
      .then((info) => setAbout(info));
  }, [id]);

  return (
    <>
      <section className="about" data-aos="fade-up" data-aos-duration={3000}>
        <div className="shape" />
        <div className="container">
          {about.map((AboutData) => (
            <div className="row rev">
              <div className="col-xl-6 col-md-12">
                <div className="about__right">
                  <div className="images">
                    <img className="img1" src={AboutData.img} alt="" />
                    <img
                      className="img2"
                      src="https://img.freepik.com/free-vector/search-engine-optimization-online-promotion-smm-manager-cartoon-character-mobile-settings-tools-adjustment-business-platform-website-analysis-vector-isolated-concept-metaphor-illustration_335657-2715.jpg"
                      alt=""
                    />
                    <img
                      className="img3"
                      src="https://img.freepik.com/free-vector/seo-analytics-team-concept-illustration_114360-9205.jpg"
                      alt=""
                    />
                    <img
                      className="img4"
                      src="https://img.freepik.com/free-vector/browsing-online-concept-illustration_114360-4510.jpg"
                      alt=""
                    />
                    <img
                      className="img5"
                      src="https://img.freepik.com/free-vector/browser-stats-concept-illustration_114360-4963.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12">
                <div className="block-text">
                  <h6 className="sub-heading">
                    <span>About us</span>
                  </h6>
                  <h3 className="heading wow" data-splitting="">
                    {AboutData.title}
                  </h3>
                  <p className="mb-17">
                    {about.map((AboutData, index) => (
                      <div key={index}>
                        {AboutData.subText
                          .split(". ")
                          .map((sentence, sentenceIndex, sentencesArray) => (
                            <React.Fragment key={sentenceIndex}>
                              {sentenceIndex > 0 && sentenceIndex % 2 === 0 && (
                                <br />
                              )}{" "}
                              <p>{sentence}</p>
                            </React.Fragment>
                          ))}
                      </div>
                    ))}
                  </p>

                  <Link to={AboutData.btnUrl} className="action-btn">
                    <span>{AboutData.btnText}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
