import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OurSpeciality = () => {
  const { id } = useParams();

  const [speciality, SetSpeciality] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/speciality/${id}`)
      .then((res) => res.json())
      .then((info) => SetSpeciality(info));
  }, [id]);





  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);




  
  return (
    <>
      <section className="speciality" data-aos="fade-up" data-aos-duration={3000}>
        <div className="shape right" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              {speciality.map((e) => (
                <div className="block-text center">
                  <h6 className="sub-heading">
                    <span>Our Speciality</span>
                  </h6>
                  <h3 className="heading wow" data-splitting="">
                    {e.headingTitleOne} <br />
                    {e.headingTitleTwo}
                  </h3>
                  <p className="">{e.subText}</p>
                </div>
              ))}
            </div>
            <div className="col-xl-3 col-md-6">
              <div
                className="speciality-box"
                data-aos="fade-up"
                data-aos-duration={2000}
              >
                <div className="icon">
                <img src="https://i.ibb.co/nRNRKsb/browser-4298091.png" alt="browser-4298091" border="0"/>
                </div>
                {speciality.map((e) => (
                  <>
                    <h5 className="title">{e.cardTitleOne}</h5>
                    <p>{e.cardDescriptionOne}</p>
                  </>
                ))}
                <h3 className="number">01</h3>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div
                className="speciality-box"
                data-aos="fade-up"
                data-aos-duration={2400}
              >
                <div className="icon">
                <img src="https://i.ibb.co/XYpQTxB/social-media-4336400.png" alt="social-media-4336400" border="0"/>
                </div>
                {speciality.map((e) => (
                  <>
                    <h5 className="title">{e.cardTitleTwo}</h5>
                    <p>{e.cardDescriptionTwo}</p>
                  </>
                ))}
                <h3 className="number">02</h3>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div
                className="speciality-box"
                data-aos="fade-up"
                data-aos-duration={2800}
              >
                <div className="icon">
                <img src="https://i.ibb.co/kyx3RRn/online-movie-4723554.png" alt="online" border="0"/>
                </div>
                {speciality.map((e) => (
                  <>
                    <h5 className="title">{e.cardTitleThree}</h5>
                    <p>{e.cardDescriptionThree}</p>
                  </>
                ))}
                <h3 className="number">03</h3>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div
                className="speciality-box"
                data-aos="fade-up"
                data-aos-duration={3000}
              >
                <div className="icon">
                  <img src="https://i.ibb.co/5cJhdfH/instagram-post-5692184.png" class="img-fluid rounded-top" alt=""/>
                 
                </div>
                {speciality.map((e) => (
                  <>
                    <h5 className="title">{e.cardTitleFour}</h5>
                    <p>{e.cardDescriptionFour}</p>
                  </>
                ))}
                <h3 className="number">04</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurSpeciality;
