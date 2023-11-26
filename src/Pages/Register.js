import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const Register = () => {
  const [gUser, gLoading] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [logo, setLogo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info));
  }, []);
  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

  if (loading || gLoading) {
    return <loading></loading>;
  }

  if (user || gUser) {
    console.log(user || gUser);
  }

  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(data.email, data.password);
    navigate("/");
  };

 
  return (
    <>
      <div className="main-content payment-setting" data-aos="fade-up" data-aos-duration={2000}>
        <div className="page-content">
          <section className="bg-auth">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12">
                  <div
                    className="card auth-box mb-15"
                    style={{ background: "#0c0f2d" }}
                  >
                    <div className="row g-0">
                      <div className="col-lg-6 text-center">
                        <div className="card-body p-4">
                        {
                            logo.map(e =>
                              <Link to="/">
                            <img
                              src={e.logo}
                              alt="logo"
                            />
                          </Link>)
                          }
                          <div className="mt-5">
                            <img
                              src="https://themesdesign.in/jobcy/layout/assets/images/auth/sign-up.png"
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-6">
                        <div className="auth-content card-body p-5 h-100 text-white">
                          <div className="w-100">
                            <div className="text-center mb-4">
                              <h4>Welcome!</h4>
                              <p className="text-white-70">
                                Register to continue
                              </p>
                            </div>
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="auth-form"
                            >
                              <div className="mb-3">
                                <label
                                  htmlFor="usernameInput"
                                  className="form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="usernameInput"
                                  placeholder="Enter your Email"
                                  {...register("email", {
                                    required: {
                                      value: true,
                                      message: "Email is Required",
                                    },
                                    pattern: {
                                      value: /[A-Za-z]{3}/,
                                      message: "Provide a Valid Email",
                                    },
                                  })}
                                />
                                <label class="label">
                                  {errors.email?.type === "required" &&
                                    "Email is Required"}
                                </label>
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="passwordInput"
                                  className="form-label"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="passwordInput"
                                  placeholder="Enter your password"
                                  {...register("password", {
                                    required: {
                                      value: true,
                                      message: "Password is Required",
                                    },
                                    minLength: {
                                      value: 6,
                                      message: "Minimum 6 Characters",
                                    },
                                  })}
                                />
                                <label class="label">
                                  {errors.password?.type === "required" &&
                                    "Password is Required"}
                                </label>
                              </div>

                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="action-btn w-full text-center"
                                >
                                  <span> Register</span>
                                </button>
                              </div>
                            </form>
                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                Have an account ?{" "}
                                <Link
                                  to="/login"
                                  className="fw-medium text-white text-decoration-underline"
                                >
                                  {" "}
                                  Login Now{" "}
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                  {/*end auth-box*/}
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            {/*end container*/}
          </section>
          {/* END SIGN-IN */}
        </div>
        {/* End Page-content */}
      </div>
    </>
  );
};

export default Register;
