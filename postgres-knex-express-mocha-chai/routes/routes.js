import express from 'express'
const router = express.Router()

import queries from '../db/queries'

// --------------------------------
// GET all shows
// --------------------------------
router.get('/shows', (req, res, next) => {
  queries.getAll()
  .then((shows) => res.status(200).json(shows))
  .catch((error) => {
    next(error)
  })
})

// --------------------------------
// GET single show
// --------------------------------
router.get('/shows/:id', (req, res, next) => {
  queries.getSingle(req.params.id)
  .then((show) => res.status(200).json(show))
  .catch(error => next(error))
})

// --------------------------------
// POST a show
// --------------------------------
router.post('/shows', (req, res, next) => {
  queries.addSingle(req.body)
  .then((showID) => queries.getSingle(showID))
  .then((show) => res.status(200).json(show))
  .catch(error => next(error))
})

// --------------------------------
// PUT a show
// --------------------------------
router.put('/shows/:id', (req, res, next) => {
  queries.editSingle(req.params.id, req.body)
  .then((show) => queries.getSingle(req.params.id))
  .then((show) => res.status(200).json(show))
  .catch(error => next(error))
})

export default router
