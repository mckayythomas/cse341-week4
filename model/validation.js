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

const validateProf = [
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
    check('classes')
        .notEmpty().withMessage('Classes required')
        .isArray().withMessage('Classes must be an array'),
    check('tutor')
        .notEmpty().withMessage('tutor is required')
        .isInt().withMessage('Must be a number')
        .matches(/^[0-1]+$/).withMessage('Tutor must be a boolean value')
        .trim(),
    check('tutorGrado')
        .notEmpty().withMessage('Grado is required')
        .isInt().withMessage('Grado must be a number')
        .isLength({ min: 1, max: 1}).withMessage('Grado can only be one digit in length')
        .trim(),
    check('tutorSeccion')
        .notEmpty().withMessage('Seccion is required')
        .isString().withMessage('Seccion must use a letter')
        .isLength({ min: 1, max: 1 }).withMessage('Seccion must be a single letter')
        .matches(/^[a-zA-Z]+$/).withMessage('Primer Nombre must contain letters only')
        .trim(),
    check('pay')
        .notEmpty().withMessage('Pay is required')
        .isInt().withMessage('Pay must be a number')
        .trim(),    
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

module.exports = { validateStudent, validateId, validateClass, validateProf }