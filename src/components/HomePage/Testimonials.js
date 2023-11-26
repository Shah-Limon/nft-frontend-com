import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Testimonials = () => {
  const { id } = useParams();
  const [title, setTitle] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials/`)
      .then((res) => res.json())
      .then((info) => setTestimonials(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials-title/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  return (
    <>
      <section
        className="testimonials s2"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="testimonials__main">
                <div className="block-text center">
                  {title.map((e, i) => (
                    <React.Fragment key={i}>
                      <h6 className="sub-heading">
                        <span>{e.titleTopText}</span>
                      </h6>
                      <h3 className="heading">
                        {e.titleOne} <br />
                        {e.titleTwo}
                      </h3>
                    </React.Fragment>
                  ))}
                </div>
                <div className="swiper testimonials-swiper s2">
                  <div className="swiper-wrapper">
                    {testimonials.map((e) => (
                      <div className="col-lg-4 col-md-6 col-12 margin__mobile">
                        <div>
                          <div className="box-testimonial center">
                            <div className="image">
                              <img src={e.personImg} alt="" />
                            </div>
                            <div className="info">
                              <h5 className="name">{e.personName}</h5>
                              <p>{e.personTitle}</p>
                              <img
                                src="https://themesflat.co/html/cyfoniihtml/assets/images/icon/quote-2.png"
                                alt=""
                              />
                            </div>
                            <p className="text">{e.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Testimonials;
