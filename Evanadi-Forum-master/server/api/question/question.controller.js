const { v4: uuidv4 } = require("uuid");
const {
  addQuestion,
  getQuestions,
  questionById,
} = require("./question.service");

//exporting all methods
module.exports = {
  createQuestion: (req, res) => {
    const { question, questionDescription, userId } = req.body;

    req.body.postId = uuidv4();

    //validation
    if (!question || !questionDescription || !userId) {
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    }

    addQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }

      return res.status(200).json({
        msg: "New question added successfully",
        data: results,
      });
    });
  },

  getAllQuestions: (req, res) => {
    getQuestions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }

      return res.status(200).json({
        data: results,
      });
    });
  },

  getQuestionById: (req, res) => {
    let id = req.params.id;

    questionById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }

      return res.status(200).json({
        data: results,
      });
    });
  },
};
