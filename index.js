const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.h1ahmwn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const db = client.db("habit-db");
    const habitCollection = db.collection("habits");

    app.get("/habits", async (req, res) => {
      try {
        const result = await habitCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.get("/habits/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await habitCollection.findOne({ _id: new ObjectId(id) });
        if (!result)
          return res.status(404).send({ success: false, message: "Not found" });
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.post("/habits", async (req, res) => {
      try {
        const data = req.body;
        data.createdAt = new Date();
        data.completionHistory = [];
        data.streak = 0;
        const result = await habitCollection.insertOne(data);
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.put("/habits/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const data = req.body;
        const filter = { _id: new ObjectId(id) };
        const update = { $set: data };
        const result = await habitCollection.updateOne(filter, update);
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.delete("/habits/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const filter = { _id: new ObjectId(id) };
        const result = await habitCollection.deleteOne(filter);
        res.send({ success: true, result });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.get("/my-habit", async (req, res) => {
      try {
        const email = req.query.email;
        const result = await habitCollection
          .find({ creatorEmail: email })
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.get("/latest-habits", async (req, res) => {
      try {
        const result = await habitCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(6)
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    app.post("/habits/:id/complete", async (req, res) => {
      try {
        const { id } = req.params;
        const filter = { _id: new ObjectId(id) };
        const habit = await habitCollection.findOne(filter);

        if (!habit)
          return res
            .status(404)
            .send({ success: false, message: "Habit not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastCompletion = habit.completionHistory?.length
          ? new Date(
              habit.completionHistory[habit.completionHistory.length - 1]
            )
          : null;

        if (lastCompletion) lastCompletion.setHours(0, 0, 0, 0);

        if (lastCompletion && lastCompletion.getTime() === today.getTime()) {
          return res.send({
            success: false,
            message: "Already completed today!",
          });
        }

        await habitCollection.updateOne(filter, {
          $push: { completionHistory: new Date() },
        });

        const updatedHabit = await habitCollection.findOne(filter);
        const history = updatedHabit.completionHistory || [];
        history.sort((a, b) => new Date(a) - new Date(b));

        let streak = 0;
        let lastDate = null;

        for (let i = history.length - 1; i >= 0; i--) {
          const date = new Date(history[i]);
          const diff =
            lastDate === null
              ? (today - date) / (1000 * 60 * 60 * 24)
              : (lastDate - date) / (1000 * 60 * 60 * 24);

          if (diff <= 1.5) {
            streak++;
            lastDate = date;
          } else break;
        }

        await habitCollection.updateOne(filter, { $set: { streak } });
        res.send({ success: true, streak });
      } catch (error) {
        res.status(500).send({ success: false, message: error.message });
      }
    });

    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => res.send("Hello what!"));

module.exports = app;

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}
