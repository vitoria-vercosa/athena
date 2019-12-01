const Estudo = require("../models/estudo")
//const service = require("./serviceTable")

module.exports={

    async listaEstudo(req, res){
        Estudo.find({})
        .then(estudo => {
            res.json(estudo);
        })
        .catch(err => console.log(err));
    },

    async EstudoByName(req, res){

        const nome = req.query;
        var filter={}

        if(estudo){
            filter.estudo = nome;
        }

        const estudoFilt = await Estudo.find(filter);

        if(estudoFilt.length == 0){
            return res.err("Nao há Disciplina com esse nome");
        }
    },

    async obterEstudo(req, res){
        var id = req.params.id;    
        Estudo.findById(id)
        .then(estudo => {
            res.status(200).send(estudo)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrada");
        });
    },

    async inserirEstudo(req, res){
        const estudo = new Estudo(req.body);
        Estudo
        .save()
        .then(res.status(200))
        .catch((err => {
            console.log(err);
        })); 
       
    },

    async atualizarEstudo(req, res){

        Estudo.findByIdAndUpdate(req.params.id, {$set:{nome:req.body.nome}},{new:true})
        .then(old_estudo => {
                res.send(old_estudo)        
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Disciplina não encontrada");
        });
    
    },

    async removerEstudo(req, res){
        Estudo.findByIdAndRemove({_id:req.params.id})
        .then(old_estudo => {
                res.send(old_estudo)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Estudo não encontrada");
        });
    }//, 

}
