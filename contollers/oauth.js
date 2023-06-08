const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const session = require('express-session');

const oauthRequest = (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
};

const oauthCallback = (req, res) => {
  try {
    const { query: { code } } = req;
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
        const token = response.data.access_token;

        req.session.accessToken = token;

        return axios.get('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(userResponse => {
        const { login, name } = userResponse.data;
        req.session.user = { login, name };

        res.redirect('/');
      })
      .catch(error => {
        res.status(500).json({
          err: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

const requireOAuthSession = (req, res, next) => {
  try {
    const accessToken = req.session.accessToken;
    if (accessToken) {
      next();
    } else {
      res.redirect('/');
    }
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

module.exports = { oauthCallback, oauthRequest, requireOAuthSession };