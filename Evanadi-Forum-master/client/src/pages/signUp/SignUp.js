import About from "../../components/About/About";
import "./signup.css";

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState("");
  const [userData, setUserData] = useContext(UserContext);

  //importing global state from context

  const [passwordType, setPasswordType] = useState("password");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("http://localhost:4000/api/users", form);

      //once registered the login automatically send the new user info to be logged in
      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
    }
  };

   console.log(form);

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="signup_page">
      <div className="signup">
        <h5>join the network</h5>
        <>
          Already have an account?{" "}
          <Link className="link" to="/login">
            log in
          </Link>
          <form onSubmit={handleSubmit} className="sign">
            <input
              type="text"
              className="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            ></input>
            <br></br>
            <div className="flex">
              <input
                className="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
              ></input>
              <input
                className="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
              ></input>
            </div>
            <input
              className="userName"
              name="userName"
              placeholder="User Name"
              onChange={handleChange}
            ></input>
            <br></br>
            <div className="password">
              <input
                type={passwordType}
                onChange={(event) => {
                  handleChange(event);
                  handlePasswordChange(event);
                }}
                value={passwordInput}
                name="password"
                className="password"
                placeholder="Password"
              />
            </div>

            <span className="eye" onClick={togglePassword}>
              {passwordType === "password" ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </span>

            <button className="button" type="submit">
              Agree and Join
            </button>
          </form>
          <br></br>
          <div className="agree">
            <span>
              I agree to the{" "}
              <Link className="link" to="#">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link className="link" to="#">
                terms of service
              </Link>
            </span>
          </div>
          <br></br>
          <Link className="link" to="/login">
            Already have an account? Sign in
          </Link>
        </>
      </div>

      <div className="about">
        <About />
      </div>
    </div>
  );
};

export default Signup;
