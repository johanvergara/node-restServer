const { Router } = require('express');
const { check } = require('express-validator'); 
const { login } = require('../controllers/auth');
const { validationField } = require('../middlewares');


const router = Router();

router.post('/login',[
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La password es obligatorio').not().isEmpty(),
        validationField
    ], login
);

module.exports = router;