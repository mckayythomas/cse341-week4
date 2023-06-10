const router = require('express').Router();
const professorController = require('../contollers/professors');
const validate = require('../model/validation.js');

router.get('/', professorController.getProfessors);

router.get('/:id', validate.validateId, professorController.getOneProfessor);


module.exports = router;