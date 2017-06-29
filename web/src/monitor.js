const http = require('http')
setInterval(_ => {
  console.log('#monitor')
  http.get('/health')
}, 60 * 1000) // 1 mins
