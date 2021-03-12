const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const swaggerDocument = require('./swaggerDefinition')
const swaggerUi = require('swagger-ui-express')

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

app.listen(port, () => {
  console.log(`Listening at localhost:${port}`)
})
