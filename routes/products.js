var express = require('express');
var router = express.Router();
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234'));
var session = driver.session();

const Product = require('../schema/product');


router.get('/cadastroProdutos', (req, res, next) =>{
    res.render('cadastroProdutos')
})

router.get('/cadastroJogos', (req, res, next) =>{
    res.render('cadastroJogos')
})

router.post('/cadastroJogos', (req, res)=>{
    const {titulo, codigo, preço, genero, audio, conteudo, plataforma, imagem
    ,tag1, tag2, tag3 } = req.body;
    const newProd = new Product({
        titulo, codigo, preço, genero, audio, conteudo, plataforma, imagem
    });
    newProd.save()
    .then(prod=>{
        res.redirect('/logProd/cadastroJogos');
    }).catch(err => console.log(err));

    session
    .run('MERGE(n:Jogo {titulo:{titulo},codigo:{codigo} } ) MERGE(m:Tag { name:{tag1} } ) MERGE(o:Tag {name:{tag2} } ) MERGE ( p:Tag {name:{tag3} } ) MERGE (n)-[r:PERTENCE]->(m) MERGE (n)-[t:PERTENCE]->(o) MERGE (n)-[y:PERTENCE]->(p)', {titulo:titulo, codigo:codigo, tag1: tag1, tag2:tag2, tag3: tag3})
    .then(function(){
        console.log("ADDED TO NEO4J");
        session.close();
    })
    .catch(function(err){
        console.log(err);
    })

})

router.post('/cadastroLivros', (req, res)=>{
    const {titulo, codigo, preço, genero, paginas, autor, imagem, tag1, tag2, tag3} = req.body;
    const newProd = new Product({
        titulo, codigo, preço, genero, paginas, autor, imagem
    });
    newProd.save()
    .then(prod=>{
        res.redirect('/logProd/cadastroLivros');
    }).catch(err => console.log(err));

    session
    .run('MERGE(n:Jogo {titulo:{titulo},codigo:{codigo} } ) MERGE(m:Tag { name:{tag1} } ) MERGE(o:Tag {name:{tag2} } ) MERGE ( p:Tag {name:{tag3} } ) MERGE (n)-[r:PERTENCE]->(m) MERGE (n)-[t:PERTENCE]->(o) MERGE (n)-[y:PERTENCE]->(p)', {titulo:titulo, codigo:codigo, tag1: tag1, tag2:tag2, tag3: tag3})
    .then(function(){
        console.log("ADDED TO NEO4J");
        session.close();
    })
    .catch(function(err){
        console.log(err);
    })
})

router.post('/cadastroDeco', (req, res)=>{
    const {titulo, codigo, preço, conteudo, imagem, tag1, tag2, tag3 } = req.body;
    const newProd = new Product({
        titulo, codigo, preço, conteudo, imagem
    });
    newProd.save()
    .then(prod=>{
        res.redirect('/logProd/cadastroDeco');
    }).catch(err => console.log(err));

    session
    .run('MERGE(n:Jogo {titulo:{titulo},codigo:{codigo} } ) MERGE(m:Tag { name:{tag1} } ) MERGE(o:Tag {name:{tag2} } ) MERGE ( p:Tag {name:{tag3} } ) MERGE (n)-[r:PERTENCE]->(m) MERGE (n)-[t:PERTENCE]->(o) MERGE (n)-[y:PERTENCE]->(p)', {titulo:titulo, codigo:codigo, tag1: tag1, tag2:tag2, tag3: tag3})
    .then(function(){
        console.log("ADDED TO NEO4J");
        session.close();
    })
    .catch(function(err){
        console.log(err);
    })
})

router.get('/cadastroDeco', (req, res, next) =>{
    res.render('cadastroDeco')
})

router.get('/cadastroLivros', (req, res, next) =>{
    res.render('cadastroLivros')
})
module.exports = router;