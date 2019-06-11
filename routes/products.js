var express = require('express');
var router = express.Router();

const Product = require('../schema/product')

router.get('/cadastroProdutos', (req, res, next) =>{
    res.render('cadastroProdutos')
})

router.get('/cadastroJogos', (req, res, next) =>{
    res.render('cadastroJogos')
})

router.post('/cadastroJogos' )

router.get('/cadastroDeco', (req, res, next) =>{
    res.render('cadastroDeco')
})

router.get('/cadastroLivros', (req, res, next) =>{
    res.render('cadastroLivros')
})
module.exports = router;