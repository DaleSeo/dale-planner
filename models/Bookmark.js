const mongoose = require('mongoose')

module.exports = mongoose.model('Bookmark', {
  url: String,
  title: String,
  description: String,
  created: Date,
  updated: Date,
  visited: Date,
  visits: Number,
  tags: [String]
})
