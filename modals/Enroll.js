const mongoose = require("mongoose");
const enrollSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("enrolled", enrollSchema);
