const router = require("express").Router();
const Assignment = require("../modals/Assignment");

// get all assignments

router.get("/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get assignments by id

router.get("/assignment/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById({ _id: req.params.id });
    res.status(200).json(assignment);
  } catch (err) {
    res.status(404).json("assignment not found!");
  }
});

// create new assignment
router.post("/assignment/new", async (req, res) => {
  try {
    const newAssignment = new Assignment({
      ...req.body,
    });
    const assignment = await newAssignment.save();
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update assignment
router.patch("/assignment/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        upsert: true,
      }
    );
    const message = {
      message: "Assignment updated successfully",
      data: assignment,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete assignment
router.delete("/assignment/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndRemove({
      _id: req.params.id,
    });
    const message = {
      message: "Assignment deleted successfully",
      assignmentId: assignment?._id,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
