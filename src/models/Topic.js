const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TopicSchema = new Schema({
  topics: [],
  username: String,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Topics', TopicSchema)