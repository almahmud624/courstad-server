const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuizMarkSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: true,
  },
  video_title: {
    type: String,
    required: true,
  },
  video_id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  student_id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  totalMark: {
    type: Number,
    required: true,
  },
  totalQuiz: {
    type: Number,
    required: true,
  },
  totalWrong: {
    type: Number,
    required: true,
  },
  totalCorrect: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("quizMarks", QuizMarkSchema);
