const { Router } = require('express');
const { check } = require('express-validator'); 
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { validationField, validationJWT, isAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/products
**/

// Obteher todos los productos - public
router.get('/', getProducts);

// Obtener un producto por ID - public
router.get('/product/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        validationField,
    ], getProduct
);

// Crear un producto - private
router.post('/create',[
        validationJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('category','La categoria es obligatorio').not().isEmpty(),
        check('category','No es un ID de mongo').isMongoId(),
        validationField
    ],
    createProduct
);

// Actualizar un producto por ID - private
router.put('/product/:id',[
        validationJWT,
        check('id', 'No es un ID valido').isMongoId(),
        validationField,
    ], updateProduct
);

// Eliminar un productor por ID - ADMIN
router.delete('/product/:id',[
        validationJWT,
        isAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        validationField,
    ], deleteProduct
);

module.exports = router;