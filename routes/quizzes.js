const router = require("express").Router();
const Quiz = require("../modals/Quiz");

// get all quizzes
router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get quiz by id
router.get("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById({ _id: req.params.id });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(404).json("Quiz not found!");
  }
});

// create new quiz
router.post("/quiz/new", async (req, res) => {
  try {
    const newQuiz = new Quiz({
      ...req.body,
    });
    const quiz = await newQuiz.save();
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update quiz
router.patch("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
    });
    const message = {
      message: "Quiz updated successfully",
      data: quiz,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete quiz
router.delete("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndRemove({
      _id: req.params.id,
    });
    const message = {
      message: "Quiz deleted successfully",
      quizId: quiz?._id,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
