require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const cors = require("cors");

console.log(process.env.DB_CONNECTION)

app.use(cors());
app.use(express.json());

const topicsRoute = require("./routes/topics");
app.use("/topics", topicsRoute);
const userRoute = require("./routes/users");
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("We are Home");
});

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("connected to db");
});
// io.on('connection', socket => {
//   console.log('a user connected');
// });

app.listen(4000, () => {
  console.log("listening on *:4000");
});
