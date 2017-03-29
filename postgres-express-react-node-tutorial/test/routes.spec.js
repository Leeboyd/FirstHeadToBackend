import express from 'express'
const router = express.Router()

router.get('/shows', (req, res, next) => {
  res.send('send shows back')
})

export default router
