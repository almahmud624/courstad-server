const router = require("express").Router();
const Video = require("../modals/Video");

// get all videos

router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get videos by id

router.get("/video/:id", async (req, res) => {
  try {
    const video = await Video.findById({ _id: req.params.id });
    res.status(200).json(video);
  } catch (err) {
    res.status(404).json("Video not found!");
  }
});

// create new video
router.post("/video/new", async (req, res) => {
  try {
    const newVideo = new Video({
      ...req.body,
    });
    const video = await newVideo.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update video
router.patch("/video/:id", async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      upsert: true,
    });
    const message = {
      message: "Video updated successfully",
      data: video,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete video
router.delete("/video/:id", async (req, res) => {
  try {
    const video = await Video.findByIdAndRemove({ _id: req.params.id });
    console.log(video);
    const message = {
      message: "Video deleted successfully",
      videoId: video?._id,
    };
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
