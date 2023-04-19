const router = require("express").Router();
const Course = require("../modals/Course");
const Enroll = require("../modals/Enroll");

// get all course

router.get("/courses", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const enrolledUserId = req.query.enrolled;
    const findEnrollUser = await Enroll.find({
      student_id: { $in: enrolledUserId },
    });
    const enrolledCourseId = findEnrollUser.map((user) => user?.course_id);
    const query =
      enrolledCourseId.length > 0 ? { _id: { $in: enrolledCourseId } } : {};

    const courses = await Course.find(query)
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

// remove specific rating from course using PATCH
router.patch("/course/:courseId/rating/:ratingId", async (req, res) => {
  const { courseId, ratingId } = req.params;
  const { type, userRating } = req.body;
  try {
    // find the targeted course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // find the targeted rating by its id
    const ratingIndex = course.rating.findIndex((rate) => rate._id == ratingId);
    if (ratingIndex === -1) {
      return res.status(404).json({ message: "Rating not found" });
    }
    if (type === "update") {
      // update the targeted rating
      course.rating[ratingIndex].userRating = userRating;
    } else if (type === "remove") {
      // remove the targeted rating
      course.rating.splice(ratingIndex, 1);
    } else {
      return res.status(400).json({ msg: "Invalid request type" });
    }
    // save the updated course
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
