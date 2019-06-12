var express = require('express');
var router = express.Router();

const Product = require('../schema/product')

router.get('/cadastroProdutos', (req, res, next) =>{
    res.render('cadastroProdutos')
})

router.get('/cadastroJogos', (req, res, next) =>{
    res.render('cadastroJogos')
})

router.post('/cadastroJogos', (req, res)=>{
    const {titulo, codigo, preço, genero, audio, conteudo, plataforma, imagem} = req.body;
    const newProd = new Product({
        titulo, codigo, preço, genero, audio, conteudo, plataforma, imagem
    });
    newProd.save()
    .then(prod=>{
        res.redirect('/logProd/cadastroJogos');
    }).catch(err => console.log(err));
})

router.post('/cadastroLivros', (req, res)=>{
    const {titulo, codigo, preço, genero, paginas, autor, imagem} = req.body;
    const newProd = new Product({
        titulo, codigo, preço, genero, paginas, autor, imagem
    });
    newProd.save()
    .then(prod=>{
        res.redirect('/logProd/cadastroLivros');
    }).catch(err => console.log(err));
})

router.post('/cadastroDeco', (req, res)=>{
    const {titulo, codigo, preço, conteudo, imagem} = req.body;
    const newProd = new Product({
        titulo, codigo, preço, conteudo, imagem
    });
    newProd.save()
    .then(prod=>{
        res.redirect('/logProd/cadastroDeco');
    }).catch(err => console.log(err));
})

router.get('/cadastroDeco', (req, res, next) =>{
    res.render('cadastroDeco')
})

router.get('/cadastroLivros', (req, res, next) =>{
    res.render('cadastroLivros')
})
module.exports = router;