import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessageRead = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/contact-message/${id}`)
      .then((res) => res.json())
      .then((info) => setContact(info));
  }, [id]);

  const UserContactMessage = (event) => {
    event.preventDefault();
    const messageStatus = event.target.messageStatus.value;

    const contact = {
      messageStatus,
    };

    const url = `http://localhost:5000/contact-message/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/contact-messages/");
      });
  };

  return (
    <>
    
      <section className="touch hight-full" data-aos="fade-up" data-aos-duration={2000}>
      <div className="mb-15"><BackToAdminDashboard></BackToAdminDashboard></div>
        <div className="container ">
          <div className="row">
            <div className="col-12">
              
              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Contact Message</span>
                </h6>
                <h3 className="heading">
                  Contact Message
                  <br />
                  Details
                </h3>
              </div>
              <div className="touch__main">
                <div className="info">
                  <h5>Sender information</h5>
                  <ul className="list">
                    <li>
                      <p>Name: {contact.name}</p>
                    </li>

                    <li>
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 4.5V11.5C14.5 11.8978 14.342 12.2794 14.0607 12.5607C13.7794 12.842 13.3978 13 13 13H3C2.60218 13 2.22064 12.842 1.93934 12.5607C1.65804 12.2794 1.5 11.8978 1.5 11.5V4.5M14.5 4.5C14.5 4.10218 14.342 3.72064 14.0607 3.43934C13.7794 3.15804 13.3978 3 13 3H3C2.60218 3 2.22064 3.15804 1.93934 3.43934C1.65804 3.72064 1.5 4.10218 1.5 4.5M14.5 4.5V4.662C14.5 4.9181 14.4345 5.16994 14.3096 5.39353C14.1848 5.61712 14.0047 5.80502 13.7867 5.93933L8.78667 9.016C8.55014 9.16169 8.2778 9.23883 8 9.23883C7.7222 9.23883 7.44986 9.16169 7.21333 9.016L2.21333 5.94C1.99528 5.80569 1.81525 5.61779 1.69038 5.3942C1.56551 5.1706 1.49997 4.91876 1.5 4.66267V4.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p>{contact.email}</p>
                    </li>
                  </ul>
                </div>
                <form onSubmit={UserContactMessage} className="form-box">
                  <input
                    hidden
                    type="text"
                    className="form-control"
                    name="messageStatus"
                    value="Read"
                  />

                  <div className="row">
                    <div className="row mb-0">
                      <div
                        className="col"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button type="submit" className="action-btn">
                          <span>
                            <img
                              src="https://i.ibb.co/0p5VPN9/message.png"
                              alt="message"
                              border="0"
                            />
                            Mark as Read
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="col">
                      <label>Message</label>
                      <textarea
                        defaultValue={contact.message}
                        readOnly
                        required
                        name="message"
                        cols={30}
                        rows={10}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsMessageRead;
