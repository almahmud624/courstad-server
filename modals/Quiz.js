const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quizSchema = new mongoose.Schema({
  question: {
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
  options: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = mongoose.model("quizzes", quizSchema);
