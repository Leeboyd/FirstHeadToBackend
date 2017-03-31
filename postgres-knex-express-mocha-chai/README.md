# postgres-knex-express-mocha-chai

> Developing a RESTful API with Node, Express, Knex - a SQL query builder - and PostgreSQL using test driven development (TDD). 

### Project Setup

1. Install Dependencies

```shell
npm install --save
```

2. Create two local Postgres databases - `mocha_chai_tv_shows` and `mocha_chai_tv_shows_test`

```shell

# This will simply create a database for your login user

$ createdb

# then you can log in with

$ psql -h localhost

# then create two db

CREATE DATABASE mocha_chai_tv_shows;

CREATE DATABASE mocha_chai_tv_shows_test;
```

3. Migrate

```shell

$ knex migrate:latest --env development

# or

$ NODE_ENV=production knex migrate:latest
```

4. Seed - knex seed:run --env development

```shell
$ knex seed:run --env development

# I write a script to compile ES6 style 
$ npm run-script testknex seed:run

# the underlying script

$ NODE_ENV=test babel-node node_modules/.bin/knex seed:run
```

5. Run the development server - `npm run dev`

6. testing - `npm run test`