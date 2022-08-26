const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validationJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde al UID
        const user = await User.findById( uid );

        // Si el usuario no existe
        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }

        // Verificar si el uid tiene estado en 'true'
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }
        
        // Establece la informacion del usuario logueado
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validationJWT
}