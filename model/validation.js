const { check } = require('express-validator');

const validateId = [
    check('id')
        .isMongoId()
];

const validateStudent = [
    check('primerNombre')
        .notEmpty().withMessage('Primer Nombre is required')
        .isString().withMessage('Primer Nombre must contain letters only')
        .matches(/^[a-zA-Z]+$/).withMessage('Primer Nombre must contain letters only')
        .trim(),
    check('apellidos')
        .notEmpty().withMessage('Apellidos is required')
        .isString().withMessage('Apellidos must contain letters only')
        .matches(/^[a-zA-Z]+$/).withMessage('Primer Nombre must contain letters only')
        .trim(),
    check('grado')
        .notEmpty().withMessage('Grado is required')
        .isInt().withMessage('Grado must be a number')
        .isLength({ min: 1, max: 1}).withMessage('Grado can only be one digit in length')
        .trim(),
    check('seccion')
        .notEmpty().withMessage('Seccion is required')
        .isString().withMessage('Seccion must use a letter')
        .isLength({ min: 1, max: 1 }).withMessage('Seccion must be a single letter')
        .matches(/^[a-zA-Z]+$/).withMessage('Primer Nombre must contain letters only')
        .trim()
];

const validateClass = [
    check('grado')
        .notEmpty().withMessage('Grado is required')
        .isInt().withMessage('Grado must be a number')
        .isLength({ min: 1, max: 1}).withMessage('Grado can only be one digit in length')
        .trim(),
    check('seccion')
        .notEmpty().withMessage('Seccion is required')
        .isString().withMessage('Seccion must use a letter')
        .isLength({ min: 1, max: 1 }).withMessage('Seccion must be a single letter')
        .matches(/^[a-zA-Z]+$/).withMessage('Primer Nombre must contain letters only')
        .trim()
];

module.exports = { validateStudent, validateId, validateClass }