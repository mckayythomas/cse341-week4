const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const db = require('./db/connection.js');
const port = process.env.port || 3000;
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDoc));

app.get('/github-oauth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/github-oauth-callback', ({ query: { code } }, res) => {
  const body = new URLSearchParams();
  body.append('client_id', process.env.GITHUB_CLIENT_ID);
  body.append('client_secret', process.env.GITHUB_SECRET);
  body.append('code', code);
  
  const headers = {
    'Accept': 'application/json',
  };

  const config = {
    headers,
  };

  axios
  .post('https://github.com/login/oauth/access_token', body, config)
  .then(response => {
    console.log(response)
    const token = response.data.access_token;

    console.log('My token:', token);

    res.redirect(`/?token=${token}`);
  })
  .catch(error => {
    res.status(500).json({
      err: error.message,
    });
  });
});

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
