const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUser, postUser, deleteUser, patchUsers } = require('../controllers/users');
const { isRoleValid, isEmailValid, isUserIdValid } = require('../helpers/db-validators');
const { validationField } = require('../middlewares/validation-field');


const router = Router();

router.get('/', getUsers);

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email address').isEmail(),
        check('email').custom( isEmailValid ),
        check('password', 'The password must be longer than 6 characters.').isLength({ min: 6 }),
        // check('rol', 'Role is not allowed').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( isRoleValid ),
        validationField,
    ], postUser
);

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( isUserIdValid ),
        check('rol').custom( isRoleValid ),
        validationField
    ], putUser
);


router.delete('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( isUserIdValid ),
        validationField
    ], deleteUser
);

router.patch('/', patchUsers);

module.exports = router;