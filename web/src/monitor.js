const http = require('http')
setInterval(_ => {
  http.get('/health')
}, 5 * 60 * 1000) // 5 mins
