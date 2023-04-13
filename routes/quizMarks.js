const router = require("express").Router();
const QuizMark = require("../modals/QuizMark");

// get all quizMarks
router.get("/quizMarks", async (req, res) => {
  try {
    const quizMarks = await QuizMark.find();
    res.status(200).json(quizMarks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get quizMark by id
router.get("/quizMark/:id", async (req, res) => {
  try {
    const quizMark = await QuizMark.findById({
      _id: req.params.id,
    });
    res.status(200).json(quizMark);
  } catch (err) {
    res.status(404).json("quizMark not found!");
  }
});

// create new quizMark
router.post("/quizMark/new", async (req, res) => {
  try {
    const newQuizMark = new QuizMark({
      ...req.body,
    });
    const quizMark = await newQuizMark.save();
    res.status(200).json(quizMark);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
