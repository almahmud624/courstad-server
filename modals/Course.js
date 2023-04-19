const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  courseId: {
    type: Number,
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
  rating: {
    type: [{ student_id: Schema.Types.Mixed, userRating: String }],
  },
});

module.exports = mongoose.model("courses", courseSchema);
