
# Recipebook

> Build A recipebook App Started with Node, Express and Postgres 

# Requirement

* postgres
* node (I use v7)
* pgadmin (optional)

# Install & Start

Using `npm`

```shell
cd pathtorepo/
npm install --save
```

Using `nodemon` to watch any change of js file in public/js

```shell
npm run-script mon
```
Navigate to http://localhost:3012/, and you should see **recipebook** on the main page.

# API
- **/** `GET`
List all recipes

- **/add** `POST`
add a recipe.

| attribute | type | description
| --- | --- | ---
| `name` | String | 菜單名
| `ingredients` | String | 材料
| `directions` | String | 料理方式

- **/delete/:id** `DEL`
del a recipe.

- **/edit** `PUT`
edit a recipe.

| attribute | type | description
| --- | --- | ---
| `id` | Number | 菜單id
| `name` | String | 菜單名
| `ingredients` | String | 材料
| `directions` | String | 料理方式
