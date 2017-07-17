const router = require('express').Router()
const Task = require('../models/Task')

router.get('/', (req, res) => {
  Task.find()
    .sort({createdAt: -1})
    .then(tasks => res.send(tasks))
})

router.post('/', (req, res) => {
  Task.create(req.body)
    .then(_ => res.sendStatus(201))
})

router.delete('/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(_ => res.sendStatus(204))
})

module.exports = router
