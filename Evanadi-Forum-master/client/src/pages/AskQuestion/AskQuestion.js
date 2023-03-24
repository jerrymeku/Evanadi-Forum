import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function AskQuestion() {
  
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  console.log(userData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/questions", {
        userId: userData.user.id,
        question: form.question,
        questionDescription: form.questionDescription,
      });
      navigate("/");
    } catch (err) {
      console.log("This Problem", err);
    }
  };

  return (
    <div className="AskQuestion">
      <div className="container my-5">
        <div className="d-flex flex-column ms-5 mt-5 mb-2">
          <h1>Steps to write a good question</h1>
          <ul className="question_steps">
            <li>Summerize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        <div className="container">
          <form
            className="d-flex flex-column p-5 question_form  justify-content-between"
            onSubmit={handleSubmit}
          >
            <div className="linkDiv">
              <h3>Ask a Public Question</h3>

              <Link to="/" className="linkQuestion text-reset">
                Go to Question Page
              </Link>
            </div>

            <input
              className="question-title"
              type="text"
              name="question"
              onChange={handleChange}
              Placeholder="Title"
            />

            <textarea
              className="question-input"
              placeholder="Question Description..."
              name="questionDescription"
              onChange={handleChange}
            ></textarea>

            <button className="question-btn btn-lg" type="submit">
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
