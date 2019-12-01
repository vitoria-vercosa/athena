const User = require("../models/User")
const service = require("./serviceTable")

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

    async inserirUser(req, res) {

        const { nome, dataNasc, email, DDD, telefone, operadora, disciplinas } = req.body;

        const campusExiste = await Campus.find()
        console.log(campusExiste)



        if (!campusExiste) {
            return res.send("fudeu")
        } else {
            const user = await User.create({
                nome,
                dataNasc,
                email,
                DDD,
                telefone,
                operadora,
                disciplinas
            })
            res.send('index');

        }
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

    }/*,
    async preencherCampos(req, res) {
        var matriculaGet = req.query.matricula;
        console.log(matriculaGet);
        var userSelecionado
        User.find({})
                .then(user => {
                    var dados = {
                        metodo :'PUT',
                        acao : matriculaGet
                    }
                    for(var i = 0 ; i < user.length ; i++){
                        if (user[i].matricula == matriculaGet){
                            userSelecionado = user[i];
                        }
                    }
                    res.render('index',{user,dados,userSelecionado});
                })
                .catch(err => console.log(err));
        }*/
}