const router = require("express").Router();

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} = require("./question.controller");

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

module.exports = router;

