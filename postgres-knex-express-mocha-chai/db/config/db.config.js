import path from 'path'
export default {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/mocha_chai_tv_shows_test',
    migrations: {
      // directory: __dirname + '/db/migrations'
      directory: path.resolve('./db/migrations')
    },
    seeds: {
      // directory: __dirname + '/db/seeds/test'
      directory: path.resolve('./db/seeds/test')
    }
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mocha_chai_tv_shows',
    migrations: {
      // directory: __dirname + '/db/migrations'
      directory: path.resolve('./db/migrations')
    },
    seeds: {
      // directory: __dirname + '/db/seeds/development'
      directory: path.resolve('./db/seeds/development')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      // directory: __dirname + '/db/migrations'
      directory: path.resolve('./db/migrations')
    },
    seeds: {
      // directory: __dirname + '/db/seeds/production'
      directory: path.resolve('./db/seeds/production')
    }
  }
}