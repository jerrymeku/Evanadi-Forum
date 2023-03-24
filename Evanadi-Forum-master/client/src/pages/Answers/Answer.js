import "./Answer.css";
import axios from "axios";
import AnswerDetail from "../AnswerDetail/AnswerDetail";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams,Link} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Question from "../Questions/Question";

const Answer = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [question, setQuestion] = useState();
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4000/api/answer`, {
        Qanswer: form.Qanswer,
        questionId: question[0].question_id,
        userId: userData.user.id,
      });

      window.location.reload(false);
    } catch (err) {
      console.log("This Problem", err);
      alert(err);
    }
  };

  useEffect(() => {
    questionById();
  }, [question?.question_id]);


  return (
    <div className="fixWidth">
      <div className="container">
        <Question />
        <h5 className="community_answer my-3 pt-2 pb-4">
          Answer From The Community
        </h5>

        <div className="container">
          <AnswerDetail />
        </div>

        <h5 className="text-center my-4">Answer The Top Question</h5>
        
        <div className="text-center  my-4">
          <Link
            to="/"
            className="text-primary-emphasis fw-bold text-center text-decoration-none my-4"
          >
            Go to Question Page
          </Link>
        </div>

        <form className="mx-5" onSubmit={handleSubmit}>
          <div>
            <textarea
              type="text"
              name="Qanswer"
              placeholder="Your Answer ..."
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-lg btn-primary my-3 fs-5"
            type="submit"
            onSubmit={handleSubmit}
          >
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Answer;
