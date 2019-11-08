const app = require("express");
const router = app.Router();
const Topic = require("../models/Topic");
const SingleTopic = require("../models/SingleTopic");

// router.get("/", (req, res) => {
//   res.json({ msg: "We are on topics" });
// });

router.post("/add", async (req, res) => {
  const topic = new Topic({
    topics: req.body.topics,
    admin: req.body.admin
  });

  try {
    const savedTopic = await topic.save();
    res.json(savedTopic);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get("/", async (req, res) => {
  const found = await Topic.find();
  res.json(found);
});

router.get("/:id", async (req, res) => {
  try {
    const found = await Topic.findById(req.params.id);
    res.json(found);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async (req, res) => {
  const newTopic = new SingleTopic({
    topic: req.body.topic,
    username: req.body.username
  });
  try {
    const addedTopic = await Topic.updateOne(
      { _id: req.params.id },
      { $push: {topics: newTopic}}
    );
    res.json(addedTopic);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
