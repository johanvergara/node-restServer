const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

// Funcion para remover campos a la hora de enviar la data
CategorySchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema );