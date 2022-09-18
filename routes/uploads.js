const { Router } = require('express');
const { check } = require('express-validator'); 
const { uploadFiles, 
    // updateImage, 
    // showImage, 
    updateImageCloudinary, 
    showImageCloudinary
} = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const { validationField, validationFileUpload } = require('../middlewares');


const router = Router();

router.post('/', validationFileUpload, uploadFiles);

router.put('/:colection/:id', [
    validationFileUpload,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('colection').custom( c => allowedCollections( c, ['users','products'] )),
    validationField
], updateImageCloudinary);
// ], updateImage);

router.get('/:colection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('colection').custom( c => allowedCollections( c, ['users','products'] )),
    validationField
], showImageCloudinary);
// ], showImage);

module.exports = router;