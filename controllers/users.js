const { response, request } = require('express');

const getUsers = (req = request, res = response) => {

    const { q, name = 'no name', apikey } = req.query;

    res.json({
        msg: "Get API - controller",
        q,
        name,
        apikey
    });
}

const putUser = (req, res = response) => {

    const id = req.params.id;

    res.status(500).json({
        msg: "put API - controller",
        id
    });
}

const postUser = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: "post API - controller",
        nombre,
        edad
    });
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: "delete API - controller"
    });
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