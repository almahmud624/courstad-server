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
router.get("/rating/:id", async (req, res) => {
  try {
    const rating = await Rating.findById({
      _id: req.params.id,
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

module.exports = router;
