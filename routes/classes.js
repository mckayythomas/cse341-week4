const router = require('express').Router();
const classesController = require('../contollers/classes');
const validate = require('../model/validation.js');

router.get('/', classesController.getClasses);

router.get('/:id', validate.validateId, classesController.getOneClass);

module.exports = router;