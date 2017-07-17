require('./config.js')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

console.log('# MONGODB_URI:', MONGODB_URI)

mongoose.Promise = global.Promise
mongoose.set('debug', true)
mongoose.connect(MONGODB_URI)
