const router = require("express").Router();
const Course = require("../modals/Course");

// get all course

router.get("/courses", async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get course by id

router.get("/course/:id", async (req, res) => {
  try {
    const course = await Course.findById({ _id: req.params.id });
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json("Course not found!");
  }
});

// create new course
router.post("/course/new", async (req, res) => {
  try {
    const newCourse = new Course({
      ...req.body,
    });
    const course = await newCourse.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
