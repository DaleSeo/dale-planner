const mongoose = require('mongoose')

module.exports = mongoose.model('Task', {
  title: {
    type: String,
    required: true
  },
  description: String,
  priority: {
    type: String,
    enum: ['HIGH', 'MID', 'LOW'],
    default: 'MID'
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  completedAt: Date,
  dueAt: Date
})
