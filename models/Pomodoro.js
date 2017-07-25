const mongoose = require('mongoose')

const pomodoroSchema = new mongoose.Schema({
  startedAt: {
    type: Date,
    required: true
  },
  endedAt: Date,
  remaining:
})
