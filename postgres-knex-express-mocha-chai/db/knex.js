// In this file we specify the environment (test, development, or production)
const environment = process.env.NODE_ENV || 'development'
// const config = require('../knexfile.js')[environment]
// module.exports = require('knex')(config)

import config from '../knexfile.js'
import knex from 'knex'

export default knex(config[environment])
