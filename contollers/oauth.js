const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const oauthRequest = (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  };
  
oauthCallback = ({ query: { code } }, res) => {
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
  };
  
module.exports = { oauthCallback, oauthRequest }

