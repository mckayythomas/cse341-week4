const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const db = require('./db/connection.js');
const port = process.env.port || 3000;

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDoc));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

db.initDb((err, mongodb) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log('Web Server is Listening at port ' + port);
  }
});
