const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const port = process.env.PORT || 4000;

// router
const coursesRoute = require("./routes/courses");
const videosRoute = require("./routes/videos");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Courstad Server is Running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4ieih.mongodb.net/courstad?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })
  .then(console.log("Database conncted!"))
  .catch((err) => console.log(err));

app.use("/api/v1", coursesRoute);
app.use("/api/v1", videosRoute);

app.listen(port, () => {
  console.log("Courstad running on port", port);
});
