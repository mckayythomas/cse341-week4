const router = require('express').Router();
const studentsController = require('../contollers/students');
const validate = require('../model/validation.js');

router.get('/', studentsController.getStudents);

router.get('/grado', studentsController.getClass);

router.get('/:id', validate.validateId, studentsController.getOneStudent);

router.post('/', validate.validateStudent, studentsController.createStudent);

router.delete('/:id', validate.validateId, studentsController.deleteStudent);

router.put('/:id', validate.validateId, validate.validateStudent, studentsController.updateStudent);

module.exports = router;