const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Courstad Server is Running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4ieih.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const courseCollection = client.db("courstad").collection("courses");

    // get data from server
    app.get("/courses", async (req, res) => {
      const query = {};
      const cursor = courseCollection.find(query);
      const courses = await cursor.toArray();
      res.send(courses);
    });
  } catch {
    // client.close()
  }
}

run().catch((error) => console.log(error));

app.get("/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const selectedCourse = courses.find((course) => course._id === courseId);
  res.send(selectedCourse);
});

app.listen(port, () => {
  console.log("Courstad running on port", port);
});

// courstad // b1JKkyGvt3pjo9LP
