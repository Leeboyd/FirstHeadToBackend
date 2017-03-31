import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes/routes.js'

// Set up the express app
const app = express()

// Log requests to the console.
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

// body Parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Now every single route in that file will be prefixed with ‘/api/v1’
app.use('/api/v1', routes)

// Setup a default catch-all route that sends back a welcome message in JSON format
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning.'
// }))

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler will not print stacktrace
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

export default app
