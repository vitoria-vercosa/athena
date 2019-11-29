const Campus = require("../models/disciplina")
//const service = require("./serviceTable")

module.exports={

    async listaDisciplina(req, res){
        Disciplina.find({})
        .then(Disciplina => {
            res.json(Disciplina);
        })
        .catch(err => console.log(err));
    },

    async DisciplinaByName(req, res){

        const Disciplina = req.query;
        var filter={}

        if(Disciplina){
            filter.Disciplina = Disciplina;
        }

        const DisciplinaFilt = await Disciplina.find(filter);

        if(DisciplinaFilt.length == 0){
            return res.err("Nao há Disciplina com esse nome");
        }
    },

    async obterDisciplina(req, res){
        var id = req.params.id;    
        Disciplina.findById(id)
        .then(Disciplina => {
            res.status(200).send(Disciplina)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrado");
        });
    },

    async inserirDisciplina(req, res){
        const Disciplina = new Disciplina(req.body);
        Disciplina
        .save()
        .then(res.status(200))
        .catch((err => {
            console.log(err);
        })); 
       
    },

    async atualizarDisciplina(req, res){

        Disciplina.findByIdAndUpdate(req.params.id, {$set:{nome:req.body.nome, 
            curso:req.body.curso}},{new:true})
        .then(old_Disciplina => {
                res.send(old_Disciplina)        
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrado");
        });
    
    },

    async removerDisciplina(req, res){
        Disciplina.findByIdAndRemove({_id:req.params.id})
        .then(old_Disciplina => {
                res.send(old_Disciplina)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrado");
        });
    }, 

    async checkDisciplinaCurso(Disciplina, curso){
        console.log('so mais um teste');
        console.log(Disciplina);
        console.log(curso);
        var filter = {};

        if(Disciplina && curso){
            filter.nome = Disciplina;
            filter.curso = curso;
        }

        console.log(filter); 

        const DisciplinaRetornados = /*await*/ Disciplina.find(filter);
        console.log(DisciplinaRetornados);

        if(DisciplinaRetornados.length == 0){
            return false;
            //return ("Não existe esse campus ou esse curso");
        }
    
    },

    showForm(req, res){
        res.render("../public/cadastroDisciplina.ejs");
    }
}
