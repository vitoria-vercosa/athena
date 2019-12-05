const User = require("../models/user_model.js")

module.exports = {

    async listaUser(req, res) {
        User.find({})
            .then(user => {
                return user;
            })
            .catch(err => console.log(err));
    },

    async obterUser(req, res) {
        var id = req.params.id;
        User.findById(id)
            .then(user => {
                res.status(200).send(user)
            })
            .catch(err => {
                console.log(err);
                res.status(404).send("Usuário não encontrado obter user");
            });
    },

    async atualizarUser(req, res) {

        const { _id } = req.params;
        const { nome, dataNasc, email, DDD, telefone, operadora } = req.body;

        if (await !User.find({ _id })) {
            return res.send("Esse user não existe");
        }

        User.findByIdAndUpdate(req.params.id, {
            $set: {
                nome: nome,
                dataNasc: dataNasc,
                email: email,
                DDD: DDD,
                telefone: telefone,
                operadora: operadora
            }
        }, { new: true })
            .then(old_user => {
                res.send(old_user)
            })
            .catch(err => {
                console.log(err);
                res.status(404).send("Usuário não encontrado atualizar user");
            });
    },

    async removerUser(req, res) {

        const { _id } = req.params;
        const userSelecionado = await User.find({ _id });

        if (!userSelecionado) {
            return res.err("Esse user não existe");
        }

        userSelecionado.remove();
        return res.send(userSelecionado);

    },
    async redefinirSenha(req, res) {
        res.render('redefinirSenha.ejs')
    },
    async cadastroUser(req, res) {
        res.render('cadastroUser1.ejs')
    },
    async salvarDisciplina(req,res){
        const {} = req.body;
        
        var disciplina = [{
            "nome" : req.body.nomeDisci
        }]

        var conteudo = [
            {
                nome : req.body.nomeCont1,
                dificuldade : req.body.dific1
            },
            {
                nome : req.body.nomeCont2,
                dificuldade: req.body.dific2
            },
            {
                nome : req.body.nomeCont3,
                dificuldade: req.body.dific3
            }
        ]

    },
    async salvarCadastro(req, res) {
    
        const { nome, nickname, dataNasc, email, DDD, telefone, operadora, segunda,terca,quarta,quinta,sexta,sabado,domingo } = req.body;
        horarios = {
            "segunda" : segunda,
            "terca" : terca,
            "quarta" : quarta,
            "quinta" : quinta,
            "sexta" : sexta,
            "sabado" : sabado,
            "domingo" : domingo
        }
        var disciplinas = []
        if(await !User.find({ nickname })){
            res.send('<h2> Ja existe um aluno com esse nickname'
                    +'<p><a href="/api/user/cadastroUser">voltar para o cadastro</a></p>');
            
                    return "ja tem essa matricula"
        }
        const aluno = await User.create({
            nome,
            nickname,
            dataNasc,
            email,
            DDD,
            telefone,
            operadora,
            horarios,
            disciplinas
        })
        dados = {
            'nick' : nickname 
        }
        res.render('cadastroDisciplina',{dados});    }
    
    

}