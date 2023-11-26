import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
const TestimonialTitle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonial-title/${id}`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  const handleTitle = (event) => {
    event.preventDefault();
    const titleTopText = event.target.titleTopText.value;
    const titleOne = event.target.titleOne.value;
    const titleTwo = event.target.titleTwo.value;

    const testimonialTitle = {
      titleTopText,
      titleOne,
      titleTwo,
    };

    const url = `http://localhost:5000/testimonial-title/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testimonialTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div className="payment-setting" data-aos="fade-up" data-aos-duration={2000}>
      <form class="form" onSubmit={handleTitle}>
        <div class="container">
          <div class="justify-content-center align-items-baseline">
            <div class="col-sm">
              <label className="mt-1">Title Top Text</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type Title Top Text"
                  name="titleTopText"
                  defaultValue={title.titleTopText}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Title (1st part)</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title (1st part)"
                  name="titleOne"
                  defaultValue={title.titleOne}
                />
              </div>
            </div>
            <div class="col-sm">
              <label className="mt-1">Enter Title (2st part)</label>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Title (2st part)"
                  name="titleTwo"
                  defaultValue={title.titleTwo}
                />
              </div>
            </div>

            <div class="col-sm">
              <button type="submit" class="action-btn">
                <span>Update Title</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestimonialTitle;
