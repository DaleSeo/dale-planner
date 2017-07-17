console.log('# NODE_ENV:', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  console.log('# loading environment variables')
  require('dotenv').config()
}
