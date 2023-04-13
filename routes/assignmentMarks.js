const router = require("express").Router();
const AssignmentMark = require("../modals/AssignmentMark");

// get all assignmentMarks
router.get("/assignmentMarks", async (req, res) => {
  try {
    const assignmentMarks = await AssignmentMark.find();
    res.status(200).json(assignmentMarks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get assignmentMark by id
router.get("/assignmentMark/:id", async (req, res) => {
  try {
    const assignmentMark = await AssignmentMark.findById({
      _id: req.params.id,
    });
    res.status(200).json(assignmentMark);
  } catch (err) {
    res.status(404).json("AssignmentMark not found!");
  }
});

// create new assignmentMark
router.post("/assignmentMark/new", async (req, res) => {
  try {
    const newAssignmentMark = new AssignmentMark({
      ...req.body,
    });
    const assignmentMark = await newAssignmentMark.save();
    res.status(200).json(assignmentMark);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
