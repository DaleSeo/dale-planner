const router = require('express').Router()

router.get('/health', (req, res) => {
  res.send(true)
})

module.exports = router
