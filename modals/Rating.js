const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_title: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  student_name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("rating", ratingSchema);
