const app = require("express");
const router = app.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const passport = require("passport");
const FacebookStrat = require("passport-facebook").Strategy;
const TwitchStrat = require("passport-twitch.js").Strategy;
const chalk = require("chalk");
const keys = require("../../config");
let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//facebook
passport.use(
  new FacebookStrat(
    {
      clientID: keys.FACEBOOK.clientID,
      clientSecret: keys.FACEBOOK.clientSecret,
      callbackUrl: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", (req, res) => {
    res.redirect("/dashboard");
  })
);

//twitch
passport.use(
  new TwitchStrat(
    {
      clientID: keys.TWITCH.clientID,
      clientSecret: keys.TWITCH.clientSecret,
      callbackUrl: "/auth/twitch/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
router.get("/auth/twitch", passport.authenticate("twitch"));
router.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", (req, res) => {
    res.redirect("/dashboard");
  })
);

router.get('/', (req,res) => {
  console.log("getting user data!")
  res.send(user)
})

router.get('/auth/logout', (req,res) => {
  console.log("logging out")
  user = {}
  res.redirect('..')
})

router.post("/register", async (req, res) => {
  console.log(req.body);
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
