const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenidos a recuerdos de estudiantes de VGH!');
});

router.use('/students', require('./students'));

module.exports = router;
