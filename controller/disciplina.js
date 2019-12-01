const Disciplina = require("../models/disciplina")
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

        const disciplina = req.query;
        var filter={}

        if(disciplina){
            filter.disciplina = disciplina;
        }

        const disciplinaFilt = await Disciplina.find(filter);

        if(DisciplinaFilt.length == 0){
            return res.err("Nao há Disciplina com esse nome");
        }
    },

    async obterDisciplina(req, res){
        var id = req.params.id;    
        Disciplina.findById(id)
        .then(disciplina => {
            res.status(200).send(disciplina)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrada");
        });
    },

    async inserirDisciplina(req, res){
        const disciplina = new Disciplina(req.body);
        Disciplina
        .save()
        .then(res.status(200))
        .catch((err => {
            console.log(err);
        })); 
       
    },

    async atualizarDisciplina(req, res){

        Disciplina.findByIdAndUpdate(req.params.id, {$set:{nome:req.body.nome, 
            conteudo:req.body.curso}},{new:true})
        .then(old_disciplina => {
                res.send(old_disciplina)        
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrada");
        });
    
    },

    async removerDisciplina(req, res){
        Disciplina.findByIdAndRemove({_id:req.params.id})
        .then(old_disciplina => {
                res.send(old_disciplina)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrada");
        });
    }//, 

//    async checkDisciplinaCurso(Disciplina, curso){
//        console.log('so mais um teste');
//        console.log(Disciplina);
//        console.log(curso);
//        var filter = {};

//        if(Disciplina && curso){
//            filter.nome = Disciplina;
//            filter.curso = curso;
//        }

//        console.log(filter); 

//        const DisciplinaRetornados = /*await*/ Disciplina.find(filter);
//        console.log(DisciplinaRetornados);

//        if(DisciplinaRetornados.length == 0){
//            return false;
//            //return ("Não existe esse campus ou esse curso");
//        }
    
//    },

//    showForm(req, res){
//        res.render("../public/cadastroDisciplina.ejs");
//    }
}
