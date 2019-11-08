const mongoose = require("mongoose");

const Schema = mongoose.Schema

const SingleTopicSchema = new Schema({
  topic: {
    type: String,
    minlength: 10,
    maxlength: 240,
    trim: true, 
    required: true
  },
  username: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('SingleTopic', SingleTopicSchema)