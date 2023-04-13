const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assignmentSchema = new mongoose.Schema({
  title: {
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
  totalMark: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("assignments", assignmentSchema);
