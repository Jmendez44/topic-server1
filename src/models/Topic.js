const mongoose = require("mongoose");
const SingleTopic = require("../models/SingleTopic");

const Schema = mongoose.Schema

const TopicSchema = new Schema({
  topics: {
    type: Array,
    default: []
  },
  admin: String,
  moderators: Array,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Topics', TopicSchema)