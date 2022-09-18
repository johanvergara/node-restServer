
const validationField  = require('../middlewares/validation-field');
const validationJWT  = require('../middlewares/validation-jwt');
const validarionRoles = require('../middlewares/validation-roles');
const validationFileUpload = require('../middlewares/validation-file');

module.exports = {
    ...validationField,
    ...validationJWT,
    ...validarionRoles,
    ...validationFileUpload
}