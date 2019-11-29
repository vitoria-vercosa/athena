const Aluno = require("../models/aluno")
const service = require("./serviceTable")
const Campus = require("../models/campus")

module.exports = {

    async listaAlunos(req, res) {
        Aluno.find({})
            .then(alunos => {
                return alunos;
            })
            .catch(err => console.log(err));
    },

    async obterAluno(req, res) {
        var id = req.params.id;
        Aluno.findById(id)
            .then(aluno => {
                res.status(200).send(aluno)
            })
            .catch(err => {
                console.log(err);
                res.status(404).send("Aluno não encontrado obter aluno");
            });
    },

    async inserirAluno(req, res) {

        const { matricula, nome, dataNasc, email, DDD, telefone, operadora, campus, curso } = req.body;

        const campusExiste = await Campus.find()
        console.log(campusExiste)



        if (!campusExiste) {
            return res.send("fudeu")
        } else {
            const aluno = await Aluno.create({
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
            //      const aluno = new Aluno(matricula, nome, dataNasc, email, DDD, telefone, operadora, campus, curso);
            //      aluno
            //     .save()
            //     .then(
            //         res.status(200),
            //         service.tabelarAlunos()
            //     )
            //     .catch((err => {
            //         console.log(err);
            //     }));
        }
    },

    async atualizarAluno(req, res) {

        /*
        // const campus = Campus.campusByName(req.body.campus);
        // if(!campus.curso.includes(req.body.curso)){
        //     console.log("Não existe esse curso no campus "+campus.nome);
        //     console.log("Aluno não inserido");
        //     return;
        // }*/

        const { matricula } = req.params;
        const { nome, dataNasc, email, DDD, telefone, operadora, campus, curso } = req.body;

        if (await !Aluno.find({ matricula })) {
            return res.send("Esse aluno não existe");
        }

            Aluno.findByIdAndUpdate(req.params.id, {
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
                .then(old_aluno => {
                    res.send(old_aluno)
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).send("Aluno não encontrado atualizar aluno");
                });
    },

    async removerAluno(req, res) {

        const { matricula } = req.params;
        const alunoSelecionado = await Aluno.find({ matricula });

        if (!alunoSelecionado) {
            return res.err("Esse aluno não existe");
        }

        alunoSelecionado.remove();
        return res.send(alunoSelecionado);
        // Aluno.findByIdAndRemove({_id:req.params.id})
        // .then(old_aluno => {
        //     res.send(old_aluno)
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(404).send("Aluno não encontrado");
        // });
    },
    async preencherCampos(req, res) {
        var matriculaGet = req.query.matricula;
        console.log(matriculaGet);
        var alunoSelecionado
        Aluno.find({})
                .then(alunos => {
                    var dados = {
                        metodo :'PUT',
                        acao : matriculaGet
                    }
                    for(var i = 0 ; i < alunos.length ; i++){
                        if (alunos[i].matricula == matriculaGet){
                            alunoSelecionado = alunos[i];
                        }
                    }
                    res.render('index',{alunos,dados,alunoSelecionado});
                })
                .catch(err => console.log(err));
        }
}