const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (rol = '') => {
    const existsRol = await Role.findOne({ rol });
    if ( !existsRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const isEmailValid = async ( email = '') => {
    const existsEmail = await User.findOne({ email });
    if ( existsEmail ) {
        throw new Error(`The Email address ${email} is already registered`);
    }
}

const isUserIdValid = async ( id ) => {
    const existsUser = await User.findById(id);
    if ( !existsUser ) {
        throw new Error(`The id ${id} no existe`);
    }
}

module.exports = {
    isRoleValid,
    isEmailValid,
    isUserIdValid
}