const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://Habit-admin:p56QGw3URE4nkLDv@cluster0.h1ahmwn.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("habit-db");
    const habitCollection = db.collection("habits");

    // all habit data
    app.get("/habits", async (req, res) => {
      const result = await habitCollection.find().toArray();

      res.send(result);
    });

    // add habit
    app.post("/habits", async (req, res) => {
      const data = req.body;
      const result = await habitCollection.insertOne(data);

      res.send({
        success: true,
      });
    });

    // my models
    app.get("/my-habit", async (req, res) => {
      const email = req.query.email;
      const result = await habitCollection
        .find({
          creatorEmail: email,
        })
        .toArray();
      res.send(result);
    });
    // habitCollection;
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello what!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Habit-admin
// p56QGw3URE4nkLDv
