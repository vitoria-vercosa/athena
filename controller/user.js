const User = require("../models/User")
const service = require("./serviceTable")
const Campus = require("../models/campus")

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

        const { matricula, nome, dataNasc, email, DDD, telefone, operadora, campus, curso } = req.body;

        const campusExiste = await Campus.find()
        console.log(campusExiste)



        if (!campusExiste) {
            return res.send("fudeu")
        } else {
            const user = await User.create({
                matricula,
                nome,
                dataNasc,
                email,
                DDD,
                telefone,
                operadora,
                campus,
                curso
            })
            res.send('index');

        }
    },

    async atualizarUser(req, res) {

        const { matricula } = req.params;
        const { nome, dataNasc, email, DDD, telefone, operadora, campus, curso } = req.body;

        if (await !User.find({ matricula })) {
            return res.send("Esse user não existe");
        }

            User.findByIdAndUpdate(req.params.id, {
                $set: {
                    matricula: req.body.matricula,
                    nome: nome,
                    dataNasc: dataNasc,
                    email: email,
                    DDD: DDD,
                    telefone: telefone,
                    operadora: operadora,
                    campus: campus,
                    curso: curso
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

        const { matricula } = req.params;
        const userSelecionado = await User.find({ matricula });

        if (!userSelecionado) {
            return res.err("Esse user não existe");
        }

        userSelecionado.remove();
        return res.send(userSelecionado);

    },
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
        }
}