const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost:27017/test'

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI)
