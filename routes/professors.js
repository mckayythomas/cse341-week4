const router = require('express').Router();
const professorController = require('../contollers/professors');
const validate = require('../model/validation.js');

router.get('/', professorController.getProfessors);

router.get('/:id', validate.validateId, professorController.getOneProfessor);

router.post('/', validate.validateProf, professorController.createProfessor);

router.delete('/:id', validate.validateId, professorController.deleteProfessor);

router.put('/:id', validate.validateId, validate.validateProf, professorController.updateProfessor);

router.get('/teaches/:id', validate.validateId, professorController.getClassesByProfessor);

module.exports = router;