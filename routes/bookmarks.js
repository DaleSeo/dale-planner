const router = require('express').Router()
const Bookmark = require('../models/Bookmark')

router.get('/', (req, res) => {
  let query = {}
  if (req.query.tag) query.tags = req.query.tag

  let regex = new RegExp(req.query.keyword || '', 'i')
  let limit = +req.query.size || 20

  Bookmark.find(query)
    .or([
      {title: regex},
      {url: regex},
      {description: regex}
    ])
    .sort('-visited -visits')
    .limit(limit)
    .then(bookmarks => res.send(bookmarks))
})

router.post('/', (req, res) => {
  let now = new Date()
  req.body.created = now
  req.body.visited = now
  req.body.visits = 1
  Bookmark.create(req.body)
    .then(_ => res.sendStatus(201))
})

router.put('/:id', (req, res) => {
  req.body.updated = new Date()
  Bookmark.findByIdAndUpdate(req.params.id, req.body)
    .then(_ => res.sendStatus(204))
})

router.patch('/:id/visit', (req, res) => {
  Bookmark.findByIdAndUpdate(req.params.id, {
    $inc: {visits: 1},
    $set: {visited: new Date()}
  }).then(_ => res.sendStatus(204))
})

router.get('/tags', (req, res) => {
  Bookmark.distinct('tags')
    .then(tags => {
      tags.sort()
      res.send(tags)
    })
})

module.exports = router
