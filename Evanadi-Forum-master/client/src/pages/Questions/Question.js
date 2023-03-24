import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Question.css";

function Question() {
  const [singleQuestion, setsingleQuestion] = useState([]);

  let params = useParams();

  const questionById = async () => {
    try {
      const resQues = await axios.get(
        `http://localhost:4000/api/questions/${params.id}`
      );
      setsingleQuestion(resQues.data.data);
    } catch (err) {
      console.log("This Problem", err);
    }
  };

  // console.log(singleQuestion);

  useEffect(() => {
    questionById();
  }, []);

  return (
    <div>
      <h2>Question</h2>
      {singleQuestion.map((data) => {
        let singleQuestion = (
          <div key={data.post_id}>
            <h4>{data.question}</h4>
            <h5>{data.question_description}</h5>
          </div>
        );
        return singleQuestion;
      })}
    </div>
  );
}

export default Question;
