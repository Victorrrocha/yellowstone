const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    }, 
    codigo:{
        type:String,
        required: true
    }, preço:{
        type: Number,
        required: true
    }, genero:{
        type: String,
    }, audio:{
        type: String
    }, conteudo:{
        type: String
    }, plataforma:{
        type: String
    }, paginas:{
        type: Number
    }, autor:{
        type: String
    },
    imagem:{
        type: String
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;