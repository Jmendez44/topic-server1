const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
