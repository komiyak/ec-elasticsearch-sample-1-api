const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const swaggerDocument = require('./swaggerDefinition')
const swaggerUi = require('swagger-ui-express')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: process.env.ELASTICSEARCH_HOST || 'http://localhost:9200' })

/** Serve a swagger ui */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/**
 * @openapi
 * /:
 *  get:
 *    description: Welcome to swagger-jsdoc
 *    responses:
 *      200:
 *        description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * @openapi
 * /search:
 *  get:
 *    description: Full-text search of products.
 *    parameters:
 *      - in: query
 *        name: q
 *        schema:
 *          type: string
 *          minLength: 1
 *          maxLength: 64
 *        required: true
 *    responses:
 *      200:
 *        description: Returns searching results.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: UNIQUEID
 *                      name:
 *                        type: string
 *                        description: A product's name
 *                        example: 笹だんご
 *                      price:
 *                        type: integer
 *                        description: A product's price
 *                        example: 120
 *                      thumbnailUrl:
 *                        type: string
 *                        description: A product's thumbnail url
 *                        example: https://example.com/image/xxx.png
 */
app.get('/search', (req, res) => {
  client.search({
    index: 'product_search',
    body: {
      query: {
        multi_match: {
          query: req.query.q,
          fields: ["name", "description"]
        }
      }
    }
  }, (err, result) => {
    if (err) {
      console.error(err)
      res.send('raised an error.')
    } else {
      if (result.body.hits.hits && result.body.hits.hits.length > 0) {
        let responseData = []
        for (let hit of result.body.hits.hits) {
          responseData.push({
            id: hit._id,
            name: hit._source.name,
            price: hit._source.price,
            thumbnailUrl: hit._source.thumbnail_url
          })
        }
        res.json({ 'data': responseData })
      } else {
        res.json({ 'data': [] })
      }
    }
  })
})

app.listen(port, () => {
  console.log(`Listening at localhost:${port}`)
})
