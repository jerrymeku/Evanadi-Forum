import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Question.css";

import { UserContext } from "../../context/UserContext";

const Questions = () => {
  const [question, setQuestion] = useState([]);
  // const [singleQuestion, setsingleQuestion] = useState([])
  ;

  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  console.log(userData);
  let params = useParams();

  const Question = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/questions`);
      
      setQuestion(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(question);

  useEffect(() => {
    if (!userData.user) navigate("/login");
    Question();
  }, [userData.user, navigate]);

  return (
    <>
      <div className="home">
        <section className="home_top">
          <Link to="/AskQuestion" className="question_btn">
            Ask Question
          </Link>

          <div className="user_class">
            <h3>WelCome {userData.user?.display_name}</h3>
          </div>
        </section>
        <div className="question_wrapper">
          <b>Questions</b>
        </div>
        <hr />
        {question.map((datas) => (
          <div className="all_user" key={datas.post_id}>
            <div className="userName1">
              <i className="bi2 bi-person-circle"></i>
              <div className="user_name">
                <div>{datas.user_name}</div>
              </div>
            </div>

            <div className="user_question">
              <span
                onClick={() => {
                  navigate(`./questions/${datas.post_id}`);
                }}
              >
                {datas.question}
              </span>
              <span
                onClick={() => {
                  navigate(`./questions/${datas.post_id}`);
                }}
              >
                <i className="bi1 bi-chevron-right"></i>{" "}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Questions;
