const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true
    },
    titulo: {
        type: String,
        required: true
    }, 
    imagem: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true,
    },
    plataforma: {
        type: String
    },
    cor :{
        type: String
    },
    price: {
        type: Number,
        required: true
    },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;