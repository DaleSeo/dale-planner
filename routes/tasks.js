const router = require('express').Router()
const Task = require('../models/Task')

router.get('/', (req, res) => {
  Task.find()
    .then(tasks => res.send(tasks))
})

router.post('/', (req, res) => {
  let task = req.body
  task.created = new Date()
  Task.create(task)
    .then(_ => res.sendStatus(201))
})

router.delete('/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(_ => res.sendStatus(204))
})

module.exports = router
