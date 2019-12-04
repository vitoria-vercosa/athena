const express = require('express');
const controller = require('../controller/user.js');
const Aluno = require("../models/user")
const alunosRouter = require('../route/rotas.js');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const path = require('path');

module.exports = function() {
    var app = express();
    app.set("port", 3000);
    app.set("views", "views");
    app.set("view engine", "ejs");
    app.use(bodyParser.json());       
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static('./view'));
    app.use(methodOverride('_method'));
    alunosRouter(app);
    app.get('*', (req, res) => {
        Aluno.find({})
            .then(users => {
                var dados = {
                    metodo :'POST',
                    acao : '',
                }
                const userSelecionado = {
                    matricula : '',
                    nome : '',
                    dataNasc : '',
                    email : '',
                    DDD : '',
                    telefone : '',
                    operadora : '',
                    campus : '',
                    curso : ''
                }
                res.render('login',{users,dados,userSelecionado});
            })
            .catch(err => console.log(err));
    });
    return app;
};