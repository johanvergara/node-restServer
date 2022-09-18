const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            search:     '/api/search',
            categories: '/api/categories',
            products:   '/api/products',
            users:      '/api/users',
            uploads:      '/api/uploads',
        }

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la App
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use( express.static('public') );

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    // Routes
    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.search, require('../routes/search'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.products, require('../routes/products'));
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }

}

module.exports = Server;