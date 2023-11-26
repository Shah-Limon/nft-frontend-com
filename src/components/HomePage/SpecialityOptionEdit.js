import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const SpecialityOptionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [speciality, SetSpeciality] = useState([]);

  const handleEditSpeciality = (event) => {
    event.preventDefault();
    const headingTitleOne = event.target.headingTitleOne.value;
    const headingTitleTwo = event.target.headingTitleTwo.value;
    const subText = event.target.subText.value;
    const cardTitleOne = event.target.cardTitleOne.value;
    const cardDescriptionOne = event.target.cardDescriptionOne.value;
    const cardTitleTwo = event.target.cardTitleTwo.value;
    const cardDescriptionTwo = event.target.cardDescriptionTwo.value;
    const cardTitleThree = event.target.cardTitleThree.value;
    const cardDescriptionThree = event.target.cardDescriptionThree.value;
    const cardTitleFour = event.target.cardTitleFour.value;
    const cardDescriptionFour = event.target.cardDescriptionFour.value;

    const updateSpeciality = {
      headingTitleOne,
      headingTitleTwo,
      subText,
      cardTitleOne,
      cardDescriptionOne,
      cardTitleTwo,
      cardDescriptionTwo,
      cardTitleThree,
      cardDescriptionThree,
      cardTitleFour,
      cardDescriptionFour,
    };

    const url = `http://localhost:5000/edit-speciality/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateSpeciality),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage");
      });
  }

  useEffect(() => {
    fetch(`http://localhost:5000/speciality/${id}`)
      .then((res) => res.json())
      .then((info) => SetSpeciality(info));
  }, [id]);

  return (
   
    <div className="payment-setting" data-aos="fade-up" data-aos-duration={2000}>
       <BackToAdminDashboard></BackToAdminDashboard>
      {speciality.map((e) => (
        <form onSubmit={handleEditSpeciality}>
          <div class="container">
            <div class="justify-content-center align-items-baseline">
              <div class="col-sm">
                <label className="mt-1">Heading Title One</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Heading Title One"
                    name="headingTitleOne"
                    defaultValue={e.headingTitleOne}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Heading Title Two</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Heading Title Two"
                    name="headingTitleTwo"
                    defaultValue={e.headingTitleTwo}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">About Text</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Your Sub Text"
                    name="subText"
                    defaultValue={e.subText}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Card Title One</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Title One"
                    name="cardTitleOne"
                    defaultValue={e.cardTitleOne}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Card Description One</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Description One"
                    name="cardDescriptionOne"
                    defaultValue={e.cardDescriptionOne}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Card Title Two</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Title Two"
                    name="cardTitleTwo"
                    defaultValue={e.cardTitleTwo}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Card Description Two</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Description Two"
                    name="cardDescriptionTwo"
                    defaultValue={e.cardDescriptionTwo}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Card Title Three</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Title Three"
                    name="cardTitleThree"
                    defaultValue={e.cardTitleThree}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Card Description Three</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Description Three"
                    name="cardDescriptionThree"
                    defaultValue={e.cardDescriptionThree}
                  />
                </div>
              </div>

              <div class="col-sm">
                <label className="mt-1">Card Title Four</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Title Four"
                    name="cardTitleFour"
                    defaultValue={e.cardTitleFour}
                  />
                </div>
              </div>
              <div class="col-sm">
                <label className="mt-1">Card Description Four</label>
                <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Card Description Four"
                    name="cardDescriptionFour"
                    defaultValue={e.cardDescriptionFour}
                  />
                </div>
              </div>

              <div class="col-sm">
                <button type="submit" class="action-btn">
                  <span>Update Card</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};

export default SpecialityOptionEdit;
