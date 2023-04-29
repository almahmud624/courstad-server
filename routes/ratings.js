const router = require("express").Router();
const Rating = require("../modals/Rating");

// get all user rating
router.get("/ratings", async (req, res) => {
  try {
    const rating = await Rating.find();
    res.status(200).json(rating);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user rating by id
router.get("/rating/:userId", async (req, res) => {
  try {
    const rating = await Rating.find({
      student_id: { $in: req.params.userId },
    });
    res.status(200).json(rating);
  } catch (err) {
    res.status(404).json("User rating not found!");
  }
});

// store user rating
router.post("/rating/new", async (req, res) => {
  try {
    const newRating = new Rating({
      ...req.body,
    });

    const rating = await newRating.save();
    res.status(200).json(rating);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update rating
router.patch("/rating/:id", async (req, res) => {
  try {
    const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
    });
    res.status(200).json(rating);
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove rating
router.delete("/rating/:id", async (req, res) => {
  try {
    const rating = await Rating.findByIdAndRemove({ _id: req.params.id });
    const message = {
      message: "Rating deleted successfully",
      ratingId: rating?._id,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
