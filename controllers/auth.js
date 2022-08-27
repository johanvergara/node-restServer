const { response, json } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) =>{

    const { email, password } = req.body;

    try {
        // Verificar si el Email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password no son correctos'
            });
        }

        // Si el usuario esta activo
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'User / Password no son correctos'
            });
        }

        // Verificar la contrasena
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password no son correctos'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    
    const { id_token } = req.body;

    try {

        const { name, email, picture } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            
            // Crear el usuario
            const data = {
                name,
                email,
                password: ':P',
                picture,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        // Si el usuario en BD
        if ( !user.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        });
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }


}

module.exports = {
    login,
    googleSignIn
}