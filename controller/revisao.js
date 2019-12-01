const Revisao = require("../models/revisao")
//const service = require("./serviceTable")

module.exports={

    async listaRevisao(req, res){
        Revisao.find({})
        .then(revisao => {
            res.json(revisao);
        })
        .catch(err => console.log(err));
    },

    async RevisaoByName(req, res){

        const nome = req.query;
        var filter={}

        if(revisao){
            filter.revisao = nome;
        }

        const revisaoFilt = await Revisao.find(filter);

        if(revisaoFilt.length == 0){
            return res.err("Nao há Disciplina com esse nome");
        }
    },

    async obterRevisao(req, res){
        var id = req.params.id;    
        Revisao.findById(id)
        .then(revisao => {
            res.status(200).send(revisao)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Revisão não encontrada");
        });
    },

    async inserirRevisao(req, res){
        const revisao = new Revisao(req.body);
        Revisao
        .save()
        .then(res.status(200))
        .catch((err => {
            console.log(err);
        })); 
       
    },

    async atualizarRevisao(req, res){

        Revisao.findByIdAndUpdate(req.params.id, {$set:{nome:req.body.nome}},{new:true})
        .then(old_estudo => {
                res.send(old_revisao)        
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Revisao não encontrada");
        });
    
    },

    async removerRevisao(req, res){
        Revisao.findByIdAndRemove({_id:req.params.id})
        .then(old_revisao => {
                res.send(old_revisao)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Revisao não encontrada");
        });
    }//, 

}
