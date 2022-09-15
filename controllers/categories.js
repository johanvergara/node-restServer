const { response, request } = require('express');
const { Category } = require('../models');
const User = require('../models/user');

// Listar categorias
const getCategories = async( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
                .populate('user', 'name')
                .skip(desde)
                .limit(limite)    
    ]); 

    res.json({
        total,
        categories
    });
}

// Listar categoria por UID
const getCategory = async( req = request, res = response ) => {

    const { id } = req.params
    const category = await Category.findById( id ).populate('user', 'name');

    res.json(category);
}


// Crear categoria
const createCategory = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();
    const categoryBD = await Category.findOne({ name });

    if ( categoryBD ) {
        return res.status(400).json({
            msg: `La categoria ${ categoryBD.name }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    // Preparar data
    const category = new Category( data );

    // Guardar DB
    await category.save();

    res.status(202).json(category);
}

// Actualizar una categoria
const updateCategory = async( req, res = response ) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body; 
    
    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true } );

    res.json( category );
}

// Eliminar una categoria
const deleteCategory = async( req, res = response ) => {

    const { id } = req.params;
    const category = await Category.findByIdAndUpdate( id, { state: false }, { new: true });

    res.json( category );
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}