
const validationField  = require('../middlewares/validation-field');
const validationJWT  = require('../middlewares/validation-jwt');
const validarionRoles = require('../middlewares/validation-roles');

module.exports = {
    ...validationField,
    ...validationJWT,
    ...validarionRoles
}