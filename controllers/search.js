const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models')

const allowedCollections = [
    'users',
    'category',
    'products',
    'roles'
];

const usersSearch = async( term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) {
        const user = await User.findById(term);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    });
}

const categoriesSearch = async( term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) {
        const category = await Category.findById(term);
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const categories = await User.find({ name: regex, state: true });

    res.json({
        results: categories
    });
}

const productsSearch = async( term = '', res = response) => {

    const isMongoID = ObjectId.isValid( term );

    if ( isMongoID ) {
        const product = await Product.findById(term)
                                    .populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const products = await Product.find({ name: regex, state: true })
                                .populate('category', 'name');

    res.json({
        results: products
    });
}

const search = (req, res = response) => {

    const { colection, term } = req.params;

    if ( !allowedCollections.includes( colection )) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ allowedCollections }`
        });
    }

    switch (colection) {
        case 'users':
            usersSearch(term, res);
        break;
        case 'category':
            categoriesSearch(term, res);
        break;
        case 'products':
            productsSearch(term, res);
        break;

        default: 
            res.status(500).json({
                msg: `Se le olvido hacer esta busqueda`
            })
    }

}

module.exports = {
    search
}