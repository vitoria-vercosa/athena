function exclui(id){
    var campo = $("#"+id.id);
    campo.hide(200);
}

(function ($) {

    "use strict";
    var idContador = 0;

    $("#btnAdicionaConteudo").click(function(e){
        e.preventDefault();
        var tipoCampo = "conteudo";
        adicionaCampo(tipoCampo);
    });


    $("#btnAdicionaDisciplina").click(function(e){
        e.preventDefault();
        var tipoCampo = "disciplina";
        AdicionaDisciplina(tipoCampo);
    });

    function AdicionaDisciplina(tipo){
        idContador++;
        var idCampo = "disciplina"+idContador;
        var idForm = "formExtra"+idContador;
        var html = "";
        html += "<label class='label-input100' for='name'>Informe o nome da disciplina</label><div class='wrap-input100 validate-input' data-validate = 'Digite o nome da disciplina'>"
        html += "<input id='disciplina' class='input100 contact100-form validate-form' type='text' name='disciplina' placeholder='Disciplina'><span class='focus-input100'></span></div>"
        html += "<label class='label-input100' for='name'>Informe o nome do conteúdo desta disciplina</label><div class='wrap-input100 validate-input' data-validate = 'Digite o nome do conteúdo'>"
        html += "<input id='conteudo' class='input100 contact100-form validate-form' type='text' name='conteudo' placeholder='Conteúdo'><span class='focus-input100'></span>"
        html += "</div><div id='imendaHTMLconteudo'></div><a href='#' id='btnAdicionaConteudo' ><i class='fa fa-plus'></i> Adicionar mais um conteúdo</a>"
        $("#imendaHTML"+tipo).append(html);
    }

    function adicionaCampo(tipo){
        idContador++;
        var idCampo = "conteudo"+idContador;
        var idForm = "formExtra"+idContador;
        var html = "";
        html += "<div class='wrap-input100 validate-input input-group' id='"+idForm+"'> <input id='"+idCampo+"' class='input100' type='text' name='conteudo' placeholder='Conteúdo'>";
        html += "<span class='focus-input100'></span>";
        html += "<div class='input-group-append'> <button class='btn' onclick='exclui("+idForm+")' type='button'><span class='fa fa-trash'></span></button></div>";
        html += "</div>";
        $("#imendaHTML"+tipo).append(html);
    }

    $('.column100').on('mouseover',function(){
        var table1 = $(this).parent().parent().parent();
        var table2 = $(this).parent().parent();
        var verTable = $(table1).data('vertable')+"";
        var column = $(this).data('column') + ""; 

        $(table2).find("."+column).addClass('hov-column-'+ verTable);
        $(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
    });

    $('.column100').on('mouseout',function(){
        var table1 = $(this).parent().parent().parent();
        var table2 = $(this).parent().parent();
        var verTable = $(table1).data('vertable')+"";
        var column = $(this).data('column') + ""; 

        $(table2).find("."+column).removeClass('hov-column-'+ verTable);
        $(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
    });  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);