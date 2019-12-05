const user = require("../controller/user")
const disciplina = require("../controller/disciplina.js")
const conteudo = require("../controller/conteudo.js")

module.exports = function(app){
    
    app.get("/api/user/redefinirSenha",user.redefinirSenha);
    app.get("/api/user/cadastroUser",user.cadastroUser);
    app.post("/api/user/salvarCadastro",user.salvarCadastro)
    // app.get("/api/user", user.listausers);
    // app.get("/api/users/:id", user.obterUser);
    // app.post("/api/users", user.inserirUser);
    // app.get("/preencherCampos", user.preencherCampos);
    // //app.put("/api/users/:id", controller.atualizarUser);
    // app.post("/api/users/:id", user.atualizarUser);
    // app.delete("/api/users/:id", user.removerUser);

    // app.get("/api/disciplina", disciplina.showForm);
    // app.get("/api/disciplina/todos", disciplina.listaDisciplina);
    // app.get("/api/disciplina/:id", disciplina.obterDisciplina);
    app.post("/api/disciplina", user.salvarDisciplina);
    // app.put("/api/disciplina/:id", disciplina.atualizarDisciplina);
    // app.delete("/api/disciplina/:id", disciplina.removerDisciplina);

    // app.get("/api/conteudo", conteudo.showForm);
    // app.get("/api/conteudo/todos", conteudo.listaConteudo);
    // app.get("/api/conteudo/:id", conteudo.obterConteudo);
    // app.post("/api/conteudo", conteudo.inserirConteudo);
    // app.put("/api/conteudo/:id", conteudo.atualizarConteudo);
    // app.delete("/api/conteudo/:id", conteudo.removerConteudo);
}