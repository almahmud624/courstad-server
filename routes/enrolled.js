const router = require("express").Router();
const Enroll = require("../modals/Enroll");

// get all enrolled course
router.get("/enrolled", async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const userId = req.query.userId;
    let criteria = {};
    if (courseId) {
      criteria.course_id = { $in: courseId };
    } else if (userId) {
      criteria.student_id = { $in: userId };
    }
    const enroll = await Enroll.find(criteria);
    res.status(200).json(enroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get enrolled course by id
router.get("/enroll/:id", async (req, res) => {
  try {
    const enroll = await Enroll.findById({
      _id: req.params.id,
    });
    res.status(200).json(enroll);
  } catch (err) {
    res.status(404).json("Enrolled course not found!");
  }
});

// store enrolled course
router.post("/enroll/new", async (req, res) => {
  try {
    const newEnrollCourse = new Enroll({
      ...req.body,
    });

    const enroll = await newEnrollCourse.save();
    res.status(200).json(enroll);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
