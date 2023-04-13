const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseId: {
    type: Number,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  courseTutor: {
    type: String,
    required: true,
  },
  courseThumb: {
    type: String,
    required: true,
  },
  coursePrice: {
    type: Number,
    required: true,
  },
  courseEnrollment: {
    type: Number,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  teacherThumb: {
    type: String,
    required: true,
  },
  teacherThumb: {
    type: String,
    required: true,
  },
  teacherSkills: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("courses", courseSchema);
