// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import Swiper from "swiper";
// import auth from "../firebase.init";
// import { TypeAnimation } from "react-type-animation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Banner = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user] = useAuthState(auth);

//   const [banner, setBanner] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/banner/`)
//       .then((res) => res.json())
//       .then((info) => setBanner(info));
//   }, [id]);

//   useEffect(() => {
//     new Swiper(".bannerSwiper", {
//       slidesPerView: 1,
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//     });
//   }, []);

//   const handleAddWebsite = (event) => {
//     event.preventDefault();
//     const email = event.target.email.value;
//     const website = event.target.website.value;
//     const userMail = event.target.userMail.value;

//     const websiteCheck = {
//       email,
//       website,
//       userMail,
//     };

//     const url = `http://localhost:5000/add-website`;
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(websiteCheck),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         navigate("/report-sent ");
//       });
//   };

//   return (
//     <>
//       <section className="banner s2">
//         <div className="shape" />
//         <div className="shape right" />
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               {banner.map((e) => (
//                 <div className="block-text center">
//                   <h6 className="sub-heading">
//                     <span>{e.bannerToptext}</span>
//                   </h6>
//                   <h2 className="heading">
//                     {e.bannerHeadingText1} <br /> {e.bannerHeadingText2} {}
//                     <span className="arlo_tm_animation_text_word">
//                       <TypeAnimation
//                         sequence={[
//                           e.typingHeading1,
//                           1000,
//                           e.typingHeading2,
//                           1000,
//                           e.typingHeading3,
//                           1000,
//                         ]}
//                         wrapper="span"
//                         speed={50}
//                         repeat={Infinity}
//                       />
//                     </span>
//                     <br />
//                   </h2>
//                   <p className="mb-34">{e.bannertext}</p>
//                   <form
//                     onSubmit={handleAddWebsite}
//                     class="form card-box"
//                     style={{ width: "100%" }}
//                   >
//                     <div class="container">
//                       <div class="row justify-content-center align-items-baseline">
//                         <div class="col-sm">
//                           <div class="form-group mb-3">
//                             <input
//                               required
//                               type="email"
//                               class="form-control"
//                               placeholder="Your Email"
//                               name="email"
//                             />
//                           </div>
//                         </div>
//                         <div class="col-sm">
//                           <div class="form-group">
//                             <input
//                               required
//                               type="text"
//                               class="form-control"
//                               placeholder="Your Website"
//                               name="website"
//                             />
//                           </div>
//                         </div>
//                         <input
//                           hidden
//                           type="email"
//                           class="form-control"
//                           name="userMail"
//                           value={user?.email}
//                         />
//                         <div class="col-sm">
//                           <button type="submit" class="action-btn">
//                             <span>Submit</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               ))}
//               <div className="swiper bannerSwiper">
//                 <div className="swiper-wrapper" style={{ gap: "20px" }}>
//                   <div className="swiper-slide">
//                     <div className="card-box card-custom">
//                       <div className="top d-flex">
//                         <span className="icon-logo-01" />
//                         <div>
//                           <h6>Website Audit & Suggestions</h6>
//                         </div>
//                       </div>
//                       <div className="content">
//                         <div className="image">
//                           <img
//                             src="https://img.freepik.com/free-vector/seo-specialist-concept-idea-search-engine-optimization-website-as-marketing-strategy-web-page-promotion-internet-development-audit-vector-illustration-cartoon-style_613284-2877.jpg"
//                             alt=""
//                           />
//                         </div>
//                         <div className="info d-flex">
//                           <div>
//                             <p>
//                               Optimize Your Online Presence: Unlock
//                               Opportunities and Enhance Performance with a
//                               Website Audit and Expert Suggestions.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="swiper-slide">
//                     <div className="card-box card-custom">
//                       <div className="top d-flex">
//                         <span className="icon-logo-01" />
//                         <div>
//                           <h6>Website Audit & Suggestions</h6>
//                         </div>
//                       </div>
//                       <div className="content">
//                         <div className="image">
//                           <img
//                             src="https://img.freepik.com/free-vector/seo-specialist-concept-idea-search-engine-optimization-website-as-marketing-strategy-web-page-promotion-internet-development-audit-vector-illustration-cartoon-style_613284-2877.jpg"
//                             alt=""
//                           />
//                         </div>
//                         <div className="info d-flex">
//                           <div>
//                             <p>
//                               Optimize Your Online Presence: Unlock
//                               Opportunities and Enhance Performance with a
//                               Website Audit and Expert Suggestions.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="swiper-slide">
//                     <div className="card-box card-custom">
//                       <div className="top d-flex">
//                         <span className="icon-logo-01" />
//                         <div>
//                           <h6>Website Audit & Suggestions</h6>
//                         </div>
//                       </div>
//                       <div className="content">
//                         <div className="image">
//                           <img
//                             src="https://img.freepik.com/free-vector/seo-specialist-concept-idea-search-engine-optimization-website-as-marketing-strategy-web-page-promotion-internet-development-audit-vector-illustration-cartoon-style_613284-2877.jpg"
//                             alt=""
//                           />
//                         </div>
//                         <div className="info d-flex">
//                           <div>
//                             <p>
//                               Optimize Your Online Presence: Unlock
//                               Opportunities and Enhance Performance with a
//                               Website Audit and Expert Suggestions.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="swiper-button-prev">
//                   <FontAwesomeIcon icon="chevron-left" /> {/* Use your icon */}
//                 </div>
//                 <div className="swiper-button-next">
//                   <FontAwesomeIcon icon="chevron-right" /> {/* Use your icon */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Banner;
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";
import { TypeAnimation } from "react-type-animation";
import Swiper from "swiper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import your icon library

const Banner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [swiper, setSwiper] = useState(null);

  const [banner, setBanner] = useState([]);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, [id]);
  useEffect(() => {
    fetch(`http://localhost:5000/sliders/`)
      .then((res) => res.json())
      .then((info) => setSliders(info));
  }, [id]);

  useEffect(() => {
    const swiperInstance = new Swiper(".bannerSwiper", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    setSwiper(swiperInstance);
  }, []);

  const handleAddWebsite = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const website = event.target.website.value;
    const userMail = event.target.userMail.value;
    const auditStatus = event.target.auditStatus.value;

    const websiteCheck = {
      email,
      website,
      userMail,
      auditStatus
    };

    const url = `http://localhost:5000/add-website`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(websiteCheck),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/submitted-website");
      });
  };

  const handleNextSlide = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  return (
    <>
      <section
        className="banner s2"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        <div className="shape" />
        <div className="shape right" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              {banner.map((e,i) => (
                <div className="block-text center" key={i}>
                  <h6 className="sub-heading">
                    <span>{e.bannerToptext}</span>
                  </h6>
                  <h2 className="heading headling__slider">
                    {e.bannerHeadingText1} <br /> {e.bannerHeadingText2} {}
                    <span className="arlo_tm_animation_text_word">
                      <TypeAnimation
                        sequence={[
                          e.typingHeading1,
                          1000,
                          e.typingHeading2,
                          1000,
                          e.typingHeading3,
                          1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                      />
                    </span>
                    <br />
                  </h2>
                  <p className="mb-34 fs-4">{e.bannertext}</p>
                  <form
                    onSubmit={handleAddWebsite}
                    class="form card-box"
                    style={{ width: "100%" }}
                  >
                    <input required type="text" hidden name="auditStatus" value="Incomplete"/>
                    <div class="container">
                      <div class="row justify-content-center align-items-baseline">
                        <div class="col-sm">
                          <div class="form-group mb-3">
                            <input
                              required
                              type="email"
                              class="form-control"
                              placeholder="Your Email"
                              name="email"
                            />
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="form-group">
                            <input
                              required
                              type="text"
                              class="form-control"
                              placeholder="Your Website"
                              name="website"
                            />
                          </div>
                        </div>
                        <input
                          hidden
                          type="email"
                          class="form-control"
                          name="userMail"
                          value={user?.email}
                        />
                        <div class="col-sm">
                          <button type="submit" class="action-btn">
                            <span>Submit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ))}
              <div className="swiper bannerSwiper">
                <div className="swiper-wrapper" style={{ gap: "20px" }}>
                  {sliders.map((e,i ) => (
                    <div className="swiper-slide" key={i}>
                      <div className="card-box card-custom">
                        <div className="top d-flex">
                          <span className="icon-logo-01" />
                          <div>
                            <h6>{e.sliderTitle}</h6>
                          </div>
                        </div>
                        <div className="content">
                          <div className="image">
                            <img src={e.sliderImg} alt="" />
                          </div>
                          <div className="info d-flex">
                            <div>
                              <p>
                                {e.sliderDesc.length > 160
                                  ? `${e.sliderDesc.slice(0, 160)}...`
                                  : e.sliderDesc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="swiper-button-prev " onClick={handlePrevSlide}>
                <img
                  className="white-arrow"
                  src="https://i.ibb.co/y6Ck0z5/left-arrow.png"
                  alt="banner"
                ></img>
                <FontAwesomeIcon icon="chevron-left" />
              </div>
              <div className="swiper-button-next " onClick={handleNextSlide}>
                <img
                  className="white-arrow"
                  src="https://i.ibb.co/JK9Bd4H/right-arrow.png"
                  alt="banner"
                ></img>
                <FontAwesomeIcon icon="chevron-right" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
