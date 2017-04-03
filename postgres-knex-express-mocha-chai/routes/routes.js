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
  if (req.body.hasOwnProperty('id') && !Number.isInteger(req.body.id)) {
    const err = {
      status: 422,
      message: 'id 必須為 number'
    }
    return next(err)
  }
  queries.addSingle(req.body)
  .then((showID) => queries.getSingle(showID))
  .then((show) => res.status(200).json(show))
  .catch(error => next(error))
})

// --------------------------------
// PUT a show
// --------------------------------
router.put('/shows/:id', (req, res, next) => {
  if (req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You shall not update the id field'
    })
  }
  queries.editSingle(req.params.id, req.body)
  .then(() => queries.getSingle(req.params.id))
  .then((show) => res.status(200).json(show))
  .catch(error => next(error))
})

// --------------------------------
// DEL a show
// --------------------------------
router.delete('/shows/:id', (req, res, next) => {
  queries.getSingle(req.params.id)
  .then((show) => {
    queries.deleteSingle(req.params.id)
    .then(() => res.status(200).json(show))
    .catch(error => next(error))
  })
  .catch(error => next(error))
})

export default router
