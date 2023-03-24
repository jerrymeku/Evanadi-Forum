const { addAnswer, getAnswer } = require("./answer.service");

module.exports = {
  createAnswer: (req, res) => {
    const { Qanswer, questionId, userId } = req.body;

    if (!Qanswer || !questionId || !userId) {
      console.log(Qanswer);
      console.log(questionId);
      console.log(userId);
      return res
        .status(400)
        .json({ error: "Not all fields have been provided!" });
    }

    addAnswer(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }

      return res.status(200).json({
        msg: "New Answer added successfully",
        data: results,
      });
    });
  },

  getAllAnswer: (req, res) => {
    let ques_id = req.params.id;

    getAnswer(ques_id, (err, results) => {
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
