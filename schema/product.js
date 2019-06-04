const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true
    },
    name: {
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


});

const Product = mongoose.model('Product', productSchema);

module.exports = Products;