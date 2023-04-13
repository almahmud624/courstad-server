const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema(
  {
    course_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    duration: {
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

module.exports = mongoose.model("videos", videoSchema);
