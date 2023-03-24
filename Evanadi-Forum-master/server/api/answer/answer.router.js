const router = require("express").Router();

const { createAnswer, getAllAnswer } = require("./answer.controller");

router.post("/", createAnswer);
router.get("/:id", getAllAnswer);

module.exports = router;