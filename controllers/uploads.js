const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

const uploadFiles = async(req, res = response) => {

    try {
        // txt, md
        // const name = await uploadFile( req.files, ['txt','md'], 'texts' );
        const name = await uploadFile( req.files, undefined, 'images' );
        res.json({ name });

    } catch (msg) {
        res.status(400).json({msg});
    }
}

const updateImage = async(req, res = response) => {

    const { id, colection } = req.params;

    let model;
    
    switch (colection) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    // Limpiar imagenes previas
    if ( model.img ) {
        // Hay que borrar la imagen del servidor
        const pathImage = path.join( __dirname, '../uploads', colection, model.img);
        if ( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
    }

    const name = await uploadFile( req.files, undefined, colection );
    model.img = name;

    await model.save();

    res.json(model);
}

const showImage = async( req, res = response) => {

    const { id, colection } = req.params;

    let model;
    
    switch (colection) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    // Mostrar imagen
    if ( model.img ) {
        const pathImage = path.join( __dirname, '../uploads', colection, model.img);
        if ( fs.existsSync( pathImage ) ) {
            return res.sendFile(pathImage)
        }
    }

    const pathImage = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile(pathImage);
}

const updateImageCloudinary = async(req, res = response) => {

    const { id, colection } = req.params;

    let model;
    
    switch (colection) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    // Limpiar imagenes previas
    if ( model.img ) {
        // Hay que borrar la imagen del servidor
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;

    await model.save();

    res.json(model);
}

const showImageCloudinary = async( req, res = response) => {

    const { id, colection } = req.params;

    let model;
    
    switch (colection) {
        case 'users':
            model = await User.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    // Mostrar imagen
    if ( model.img ) {
        const pathImage = model.img;
        return res.redirect(pathImage)
    }

    const pathImage = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile(pathImage);
}

module.exports = {
    uploadFiles,
    updateImage,
    showImage,
    updateImageCloudinary,
    showImageCloudinary
}