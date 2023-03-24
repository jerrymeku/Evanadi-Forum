import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../Questions/Questions";
import { UserContext } from "../../context/UserContext";
import "./home.css"

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  return (
    <div className="m-1 mt-5 mb-5 ">
      {/* <h2 className="welcome">WelCome {userData.user?.display_name}</h2> */}
     
      <Questions />
    </div>
  );
};

export default Home;
