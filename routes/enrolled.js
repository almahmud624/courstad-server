const router = require("express").Router();
const Enroll = require("../modals/Enroll");

// get enrolled course course id
router.get("/enrolled/:courseId", async (req, res) => {
  try {
    const enrolledCourses = await Enroll.find({
      course_id: { $in: req.params.courseId },
    });
    res.status(200).json(enrolledCourses);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get enrolled course by user id
router.get("/user-enrolled/:userId", async (req, res) => {
  try {
    const userEnrolled = await Enroll.find({
      student_id: { $in: req.params.userId },
    });
    res.status(200).json(userEnrolled);
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
