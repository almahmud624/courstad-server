const router = require("express").Router();
const Course = require("../modals/Course");

// get all course

router.get("/courses", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const courses = await Course.find()
      .skip(page * size)
      .limit(size);
    const count = await Course.countDocuments();
    res.status(200).json({ count, courses });
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

// update course
router.patch("/course/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
    });
    const message = {
      message: "Course updated successfully",
      data: course,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
