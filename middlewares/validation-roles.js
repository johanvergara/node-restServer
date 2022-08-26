const { response } = require('express');


const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });    
    }

    const { rol, name } = req.user;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ name } no es administrador para ejecutar esta accion`
        });
    }

    next();
}

const hasRol = (...roles ) => {
    return ( req, res = response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            });    
        }

        if ( !roles.includes( req.user.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRol
}