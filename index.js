const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

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
    const courseCollection = client.db("courstad").collection("allCourses");

    // get data from server
    app.get("/courses", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const query = {};
      const cursor = courseCollection.find(query);
      const courses = await cursor
        .skip(page * size)
        .limit(size)
        .toArray();
      const count = await courseCollection.estimatedDocumentCount();
      res.send({ count, courses });
    });
    // get single data from server
    app.get("/courses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const selectedCourse = await courseCollection.findOne(query);
      res.send(selectedCourse);
    });
  } catch {
    // client.close()
  }
}

run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Courstad running on port", port);
});
