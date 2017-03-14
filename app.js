import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cons from 'consolidate'
import dust from 'dustjs-helpers'
import pg from 'pg'

const config = {
  user: 'Leeboy', //env var: PGUSER
  database: 'recipebookdb', //env var: PGDATABASE
  password: 'postgresql', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

const app = express()
const client = new pg.Client()
const pool = new pg.Pool(config)

// Assign Dust template engin to .dust file
app.engine('dust', cons.dust)

// Set Default Ext .dust
app.set('view engine', 'dust')
app.set('views', __dirname + '/public/views')

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// body Parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {

  pool.connect((err, client, done) => {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM recipes', (err, result) => {
      // call `done(err)` to release the client back to the pool (or destroy it if there is an error)
      if (err) {
        return console.error('error running query.', err)
      }
      done(err)
      console.log(result.rows)
      res.render('layout', {recipies: result.rows})
    })
  })

  pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
  })
})

// Server
app.listen(3012, () => {
  console.log('Server Start On port 3012')
})