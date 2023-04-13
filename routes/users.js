const router = require("express").Router();
const User = require("../modals/User");

// get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user by id
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.params.id,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json("User not found!");
  }
});

// create new user
router.post("/user/new", async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
    });
    const findStoredUser = await User.find({ email: req.body.email });
    if (findStoredUser.length) {
      return res.status(200).json(findStoredUser[0]);
    }
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
