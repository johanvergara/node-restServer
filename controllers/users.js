const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip(desde)
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        users
    });
}

const postUser = async(req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });

    // Encriptar la password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.status(201).json({
        user
    });
}

const putUser = async(req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    // TODO: validar contra base de datos.
    if ( password ) {
        // Encriptar la password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json(user);
}

const deleteUser = async(req, res = response) => {

    const { id } = req.params;

    // Borrar fisicamente
    // const user = await User.findByIdAndDelete( id );

    // Borrar por estado
    const user = await User.findByIdAndUpdate( id, { state: false });

    res.json(user);
}

const patchUsers = (req, res = response) => {
    res.json({
        msg: "patch API - controller"
    });
}


module.exports = {
    getUsers,
    putUser,
    postUser,
    deleteUser,
    patchUsers,
}