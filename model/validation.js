const { check } = require('express-validator');
const mongodb = require('../db/connection')

const validateId = [
    check('id')
        .isMongoId()
];

const validateStudent = [
    check('primerNombre')
        .notEmpty().withMessage('Primer Nombre is required')
        .isString().withMessage('Primer Nombre must contain letters only')
        .trim(),
    check('apellidos')
        .notEmpty().withMessage('Apellidos is required')
        .isString().withMessage('Apellidos must contain letters only')
        .trim(),
    check('grado')
        .notEmpty().withMessage('Grado is required')
        .isInt().withMessage('Grado must be a number')
        .trim(),
    check('seccion')
        .notEmpty().withMessage('Seccion is required')
        .isString().withMessage('Seccion must use a letter')
        .isLength({ min: 1, max: 1 }).withMessage('Seccion must be a single letter')
];

module.exports = { validateStudent, validateId }