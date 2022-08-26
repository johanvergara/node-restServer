
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    },
    email: {
        type: String,
        require: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'The password is required']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Function para remover campos a la hora de enviar la data
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user
}

module.exports = model( 'User', UserSchema );