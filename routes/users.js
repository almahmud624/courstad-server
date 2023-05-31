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

// check user role
router.post("/user/verify", async (req, res) => {
  try {
    // find stored user
    const foundUser = await User.find({ email: req.body.email });
    const { name, email, photoURL, _id } = foundUser?.[0];
    const user = { _id, name, email, photoURL };
    if (foundUser.length && email === "admin@gmail.com") {
      user.role = "admin";
      return res.status(200).json(user);
    } else {
      user.role = "student";
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json("User not found!");
  }
});

module.exports = router;
