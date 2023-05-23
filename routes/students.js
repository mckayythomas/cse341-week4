const router = require('express').Router();
const studentsController = require('../contollers/students');

router.get('/', studentsController.getStudents);

router.get('/:id', studentsController.getOneStudent);

router.get('/:grado/:seccion', studentsController.getClass);

router.post('/', studentsController.createStudent);

router.delete('/:id', studentsController.deleteStudent);

router.put('/:id', studentsController.updateStudent);

module.exports = router;