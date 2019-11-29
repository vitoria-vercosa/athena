const Conteudo = require("../models/conteudo")
//const service = require("./serviceTable")

module.exports={

    async listaConteudo(req, res){
        Conteudo.find({})
        .then(conteudo => {
            res.json(conteudo);
        })
        .catch(err => console.log(err));
    },

    async conteudoByName(req, res){

        const conteudo = req.query;
        var filter={}

        if(conteudo){
            filter.conteudo = conteudo;
        }

        const conteudoFilt = await Conteudo.find(filter);

        if(conteudoFilt.length == 0){
            return res.err("Nao há conteudo com esse nome");
        }
    },

    async obterConteudo(req, res){
        var id = req.params.id;    
        Conteudo.findById(id)
        .then(conteudo => {
            res.status(200).send(conteudo)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Conteudo não encontrado");
        });
    },

    async inserirConteudo(req, res){
        const conteudo = new Conteudo(req.body);
        Conteudo
        .save()
        .then(res.status(200))
        .catch((err => {
            console.log(err);
        })); 
       
    },

    async atualizarConteudo(req, res){

        Conteudo.findByIdAndUpdate(req.params.id, {$set:{nome:req.body.nome, 
            curso:req.body.curso}},{new:true})
        .then(old_conteudo => {
                res.send(old_conteudo)        
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Conteudo não encontrado");
        });
    
    },

    async removerConteudo(req, res){
        Conteudo.findByIdAndRemove({_id:req.params.id})
        .then(old_conteudo => {
                res.send(old_conteudo)
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Conteudo não encontrado");
        });
    }, 

    async checkConteudoCurso(conteudo, curso){
        console.log('so mais um teste');
        console.log(conteudo);
        console.log(curso);
        var filter = {};

        if(conteudo && curso){
            filter.nome = conteudo;
            filter.curso = curso;
        }

        console.log(filter); 

        const conteudoRetornados = /*await*/ Conteudo.find(filter);
        console.log(conteudoRetornados);

        if(conteudoRetornados.length == 0){
            return false;
            //return ("Não existe esse Conteudo ou esse curso");
        }
        return true;
    
    },

    showForm(req, res){
        res.render("../public/cadastroConteudo.ejs");
    }
}
