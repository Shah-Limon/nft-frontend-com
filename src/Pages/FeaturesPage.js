import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const FeaturesPage = () => {
  const { id } = useParams();
  const [feature, setFeature] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/features`)
      .then((res) => res.json())
      .then((info) => setFeature(info));
  }, [id]);

  return (
    <div className="card-box__features_card">
      <section
        className="about payment-setting card-box__features features__center"
        data-aos="fade-up"
        data-aos-duration={2000}
      >
        <div className="shape" />

        <div className="container">
          {feature.map((e,i ) => (
            <>
              <div className="row  justify-content-center" key={i}>
                <div className="col-lg-5 col-md-12">
                  <div className="about__right">
                    <div className="images">
                      <img className="img1" src={e.featureImg} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12">
                  <div className="block-text">
                    <h3 className="heading wow" data-splitting="">
                      {e.featureTitle}
                    </h3>
                    <p className="mb-17 feature__text-left">
                      {e.featureDesc
                        .split(". ")
                        .map((sentence, sentenceIndex, sentencesArray) => (
                          <React.Fragment key={sentenceIndex}>
                            {sentenceIndex > 0 && sentenceIndex % 2 === 0 && (
                              <br />
                            )}{" "}
                            <p>{sentence}</p>
                          </React.Fragment>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
