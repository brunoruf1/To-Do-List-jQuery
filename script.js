$(document).ready(function(){
    let $textoTarefa = $("#texto-tarefa"); 
    $("#adicionar-tarefa").click(function(){
         
        if ($textoTarefa.val() == 0){
            alert("Você não pode adicionar uma tarefa vazia!");
        }else{
            let novaTarefa = {nomeTarefa: $textoTarefa, id: gerarId(), idEdicao: gerarIdEdicao()};
            adicionarTarefa(novaTarefa);
            $("#texto-tarefa").val("");           
        }     
    });

    $("#texto-tarefa").keypress(function(e){ 
        if (e.which == 13 && $textoTarefa.val() == 0){
            alert("Você não pode adicionar uma tarefa vazia!");
        }else if (e.which == 13 && $textoTarefa.val() != 0){
            let novaTarefa = {nomeTarefa: $textoTarefa, id: gerarId(), idEdicao: gerarIdEdicao()};
            adicionarTarefa(novaTarefa);
            $("#texto-tarefa").val("");
        }
    });

function gerarId(){
    return Number(Math.floor(Math.random() * 3000));
}
function gerarIdEdicao(){
    return Number(Math.floor(Math.random() * -3000));
}

function adicionarTarefa(novaTarefa){
    let botaoEditar = `<button class = 'botao-acao' onclick = 'editarTarefa(${novaTarefa.idEdicao})'>Renomear</button>`;
    let botaoExcluir = `<button class = 'botao-acao' onclick = 'excluirTarefa(${novaTarefa.id})'>Excluir</button>`;
    $("#mostrar").append(`<li id = '${novaTarefa.id}'></li>`);
    $(`li#${novaTarefa.id}`).append(`<span class = '${novaTarefa.idEdicao}'>${novaTarefa.nomeTarefa.val()}</span>`);   
    $(`li#${novaTarefa.id}`).append(`<div>${botaoEditar + botaoExcluir}</div>`);  
}
});

function editarTarefa(idEdicao){
    let confirmacao = window.confirm("Tem certeza que deseja renomear a tarefa?");
    if (confirmacao){
        $(`.${idEdicao}`).replaceWith(`<div><input id = 'texto-edicao' placeholder = Renomear></input></div>`);
        $("#texto-edicao").keypress(function(e){
            let textoEdicao = $("#texto-edicao");
            if (e.which == 13 && textoEdicao.val() == 0){
                alert("Você não pode salvar uma tarefa vazia!");
            }else if (e.which == 13 && textoEdicao.val() != 0){
                $("#texto-edicao").replaceWith(`<span class = '${idEdicao}'>${textoEdicao.val()}</span>`) 
            } 
        });
    }       
}

function excluirTarefa(idTarefa){
    let exclusao = window.confirm("Deseja realmente remover sua tarefa?");
    if (exclusao){
        $(`li#${idTarefa}`).remove();
    }    
}
