import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";

const AnswerDetail = (questionID) => {
  const [userData, setUserData] = useContext(UserContext);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState([]);

  let params = useParams();

  const questionById = async () => {
    try {
      const resQues = await axios.get(
        `http://localhost:4000/api/questions/${params.id}`
      );
      setQuestion(resQues.data.data);
    } catch (err) {
      console.log("This Problem", err);
    }
  };

  const answers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/answer/${question[0]?.question_id}`
      );
      setAnswer(response.data.data);
    } catch (err) {
      console.log("This Problem", err);
      alert(err);
    }
  };

  console.log(answer);
  console.log(question[0]?.question_id);

  useEffect(() => {
    answers();
    questionById();
  }, [question[0]?.question_id]);

  return (
    <>
      {answer.map((answers) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column align-items-center">
            <i className="bi2 bi-person-circle"></i>
            <p className="text-center">{answers?.user_name}</p>
          </div>
          <p className="mx-5 my-3">{answers?.answer}</p>
        </div>
      ))}
    </>
  );
};

export default AnswerDetail;
