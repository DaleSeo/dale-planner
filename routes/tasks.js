const router = require('express').Router()
const Task = require('../models/Task')

router.get('/', (req, res) => {
  console.log('req.query.completed:', req.query.completed)
  let query = {}
  if (req.query.completed) {
    query.completedAt = {$exists: req.query.completed === 'true'}
  }
  console.log('query:', query)
  Task.find(query)
    .sort({status: 1, createdAt: -1})
    .then(tasks => res.send(tasks))
})

router.post('/', (req, res) => {
  Task.create(req.body)
    .then(_ => res.sendStatus(201))
})

router.patch('/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(_ => res.sendStatus(204))
})

router.delete('/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(_ => res.sendStatus(204))
})

module.exports = router
