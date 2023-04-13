const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assignmentMarkSchema = new mongoose.Schema(
  {
    student_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    assignment_id: {
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
    repo_link: {
      type: String,
      required: true,
    },
    status: {
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

module.exports = mongoose.model("assignmentMarks", assignmentMarkSchema);
