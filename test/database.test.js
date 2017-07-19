const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://user:pass@ds147821.mlab.com:47821/dale-test'

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI)
