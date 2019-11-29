const user = require("../controller/users.js");
const disciplina = require("../controller/disciplina.js")
const conteudo = require("../controller/conteudo.js")

module.exports = function(app){
    app.get("/api/user", controller.listausers);
    app.get("/api/users/:id", controller.obterUser);
    app.post("/api/users", controller.inserirUser);
    app.get("/preencherCampos", controller.preencherCampos);
    //app.put("/api/users/:id", controller.atualizarUser);
    app.post("/api/users/:id", controller.atualizarUser);
    app.delete("/api/users/:id", controller.removerUser);

    app.get("/api/disciplina", disciplina.showForm);
    app.get("/api/disciplina/todos", disciplina.listaDisciplina);
    app.get("/api/disciplina/:id", disciplina.obterDisciplina);
    app.post("/api/disciplina", disciplina.inserirDisciplina);
    app.put("/api/disciplina/:id", disciplina.atualizarDisciplina);
    app.delete("/api/disciplina/:id", disciplina.removerDisciplina);

    app.get("/api/conteudo", conteudo.showForm);
    app.get("/api/conteudo/todos", conteudo.listaConteudo);
    app.get("/api/conteudo/:id", conteudo.obterConteudo);
    app.post("/api/conteudo", conteudo.inserirConteudo);
    app.put("/api/conteudo/:id", conteudo.atualizarConteudo);
    app.delete("/api/conteudo/:id", conteudo.removerConteudo);
}