const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('Base de Datos Online');

    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de iniciar la Base de Datos')
    }

}

module.exports = {
    dbConnection
}