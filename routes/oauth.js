const express = require('express');
const router = express.Router();
const oauth = require('../contollers/oauth');

router.use('/github', oauth.oauthRequest);

router.use('/github-authorized', oauth.oauthCallback);

module.exports = router;
