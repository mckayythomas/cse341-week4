const express = require('express');
const router = express.Router();
const OAuth = require('../contollers/oauth');
const session = require('express-session');

router.get('/', (req, res) => {
  const accessToken = req.session.accessToken;
  if (accessToken) {
    user = req.session.user
    res.send(`${user.name}, bienvenidos a recuerdos de estudiantes de VGH!`);
  } else {
    res.send('Bienvenidos a recuerdos de estudiante de VGH! You need to login')
  }
});

router.use('/oauth', require('./oauth'));

router.use('/students', OAuth.requireOAuthSession, require('./students'));

module.exports = router;
