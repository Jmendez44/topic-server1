const app = require("express");
const router = app.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// router.get("/", (req, res) => {
//   res.json({ msg: "We are on topics" });
// });

router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10)
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
