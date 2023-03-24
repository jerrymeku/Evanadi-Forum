import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import About from "../../components/About/About";
import { Link,useNavigate} from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
   const [userData, setUserData] = useContext(UserContext);
   const navigate = useNavigate();
   const [form, setForm] = useState({});
   const handleChange = (e) => {
     setForm({ ...form, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       //sending user data to database to be logged in
       const loginRes = await axios.post(
         "http://localhost:4000/api/users/login",
         {
           email: form.email,
           password: form.password,
         }
       );

       //update global state with response from backend(user-info)
       setUserData({
         token: loginRes.data.token,
         user: loginRes.data.user,
       });

       //set localStorage with the token
       localStorage.setItem("auth-token", loginRes.data.token);

       //navigate user to homepage
       navigate("/");
     } catch (err) {
       console.log("problem", err.response.data.msg);
       alert(err.response.data.msg);
     }
   };

   useEffect(() => {
     if (userData.user) navigate("/");
   }, [userData.user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let passwordInputType;
  let passwordToggleIconClass;

  if (showPassword) {
    passwordInputType = "text";
    passwordToggleIconClass = "bi bi-eye password-toggle-icon";
  } else {
    passwordInputType = "password";
    passwordToggleIconClass = "bi bi-eye-slash password-toggle-icon";
  }

  return (
    <div className="login_page">
      <div className="main">
        <h3>Login to your account</h3>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="create-account-link">
            Create new account
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="password-input-container">
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
            />
            <div className="password-input-wrapper">
              <input
                type={passwordInputType}
                placeholder="Your Password"
                name="password"
                onChange={handleChange}
              />
              <span
                className={passwordToggleIconClass}
                onClick={togglePasswordVisibility}
              ></span>
            </div>
          </div>
          <button className="submit mt-4">Submit</button>
          <Link to="/signup" className="create-account-link mt-2">
            Create new account
          </Link>
        </form>
      </div>

      <div className="login_pageAbout">
        <About />
      </div>
    </div>
  );
};

export default Login;
