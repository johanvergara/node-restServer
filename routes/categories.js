const { Router } = require('express');
const { check } = require('express-validator'); 
const { validationField, validationJWT, isAdminRole } = require('../middlewares');
const { createCategory, 
        getCategories, 
        getCategory, 
        updateCategory, 
        deleteCategory 
} = require('../controllers/categories');
const { isCategoryIdValid } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categories
**/

// Obtener todas las categorias - public
router.get('/', getCategories);

// Obtener una categoria por id - public
router.get('/category/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        // check('id').custom( isCategoryIdValid ),
        validationField,
    ], getCategory
);

// Crear categoria - private
router.post('/create',[ 
        validationJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        validationField
    ], createCategory 
);

// Actualizar categoria por ID - private
router.put('/:id',[
        validationJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('id', 'No es un ID valido').isMongoId(),
        validationField
    ], updateCategory 
);

// Delete una categoria por ID - admin
router.delete('/:id',[
        validationJWT,
        isAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        validationField
    ], deleteCategory
);

module.exports = router;