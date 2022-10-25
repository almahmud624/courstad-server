const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

const courses = require("./data/toturial.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Courstad Server is Running");
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.listen(port, () => {
  console.log("Courstad running on port", port);
});
