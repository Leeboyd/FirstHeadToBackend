process.env.NODE_ENV = 'test'

// Mocha (test runner)
// Chai (assertion)
// ChaiHTTP (HTTP request module for integration testing)
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../app'
import knex from '../db/knex'

chai.should()

chai.use(chaiHttp)

describe('API Routes', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => knex.seed.run())
      .then(() => done())
    })
  })

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => done())
  })  

  describe('GET /api/v1/shows', () => {
    it('should return all shows', (done) => {
      chai.request(server)
      .get('/api/v1/shows')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        res.body.length.should.equal(4)
        res.body[0].should.have.property('name')
        res.body[0].name.should.equal('Suits')
        res.body[0].should.have.property('channel')
        res.body[0].channel.should.equal('USA Network')
        res.body[0].should.have.property('genre')
        res.body[0].genre.should.equal('Drama')
        res.body[0].should.have.property('rating')
        res.body[0].rating.should.equal(3)
        res.body[0].should.have.property('explicit')
        res.body[0].explicit.should.equal(false)
        done()
      })
    })
  })

  describe('GET /api/v1/shows/:id', () => {
    it('should return a single show', (done) => {
      chai.request(server)
      .get('/api/v1/shows/1')
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('name')
        res.body.name.should.equal('Suits')
        res.body.should.have.property('channel')
        res.body.channel.should.equal('USA Network')
        res.body.should.have.property('genre')
        res.body.genre.should.equal('Drama')
        res.body.should.have.property('rating')
        res.body.rating.should.equal(3)
        res.body.should.include.keys('explicit')
        res.body.explicit.should.not.be.true
        done()
      })
    })
  })

  describe('POST /api/v1/shows', () => {
    it('should add a show', (done) => {
      chai.request(server)
      .post('/api/v1/shows')
      .send({
        name: 'Family Guy',
        channel: 'Fox',
        genre: 'Comedy',
        rating: 4,
        explicit: true
      })
      .end(function (err, res) {
        // err.should.be.null
        res.should.have.status(200)
        res.should.be.a('object')
        res.body.should.have.property('name')
        res.body.name.should.equal('Family Guy')
        res.body.should.have.property('channel')
        res.body.channel.should.equal('Fox')
        res.body.should.include.keys('genre')
        res.body.genre.should.equal('Comedy')
        res.body.should.have.property('rating')
        res.body.rating.should.be.below(5)
        res.body.rating.should.equal(4)
        res.body.should.include.keys('explicit')
        res.body.explicit.should.be.true
        done()
      })
    })
  })

  describe('PUT /api/v1/show/:id', () => {
    it('should update a show', (done) => {
      chai.request(server)
      .put('/api/v1/shows/2')
      .send({
        rating: 2,
        genre: 'Adventure'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.should.be.a('object')
        res.body.should.have.property('name')
        res.body.name.should.equal('Game of Thrones')
        res.body.should.have.property('channel')
        res.body.channel.should.equal('HBO')
        res.body.should.include.keys('genre')
        res.body.genre.should.equal('Adventure')
        res.body.should.have.property('rating')
        res.body.rating.should.be.below(5)
        res.body.rating.should.equal(2)
        res.body.should.include.keys('explicit')
        res.body.explicit.should.be.true 
        done()       
      })
    })
  })
})
