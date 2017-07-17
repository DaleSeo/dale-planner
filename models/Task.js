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
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  completedAt: Date,
  due: Date
})
