const app = require("express");
const router = app.Router();
const Topic = require("../models/Topic");

// router.get("/", (req, res) => {
//   res.json({ msg: "We are on topics" });
// });

router.post("/add", async (req, res) => {
  const topic = new Topic({
    topic: req.body.topic,
    username: req.body.username
  });

  try {
    const savedTopic = await topic.save();
    res.json(savedTopic);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
