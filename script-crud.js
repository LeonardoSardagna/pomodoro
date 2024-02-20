const btAdicionarTarefa = document.querySelector('.app__button--add-task');
const listaDeTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ultarefas = document.querySelector('.app__section-task-list');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');
const botaoDeletar = document.querySelector('.app__form-footer__button--delete');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const limparTarefasConcluidas = document.querySelector('#btn-remover-concluidas');
const removerTodasTarefas = document.querySelector('#btn-remover-todas');
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function criandoNovaTarefa(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criandoElementoTarefa (tarefa){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    const img = document.createElement('img');
    img.setAttribute('src', '/imagens/edit.png');

   botao.onclick = ()=>{
    const alterartarefa = prompt('O que você deseja alterar?');
    if(alterartarefa){
        paragrafo.textContent = alterartarefa;
        tarefa.descricao = alterartarefa;
        criandoNovaTarefa();
    }
   }

    botao.append(img);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    }else{
        li.onclick = ()=>{
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento =>{
                    elemento.classList.toggle('app__section-task-list-item-active')
                })
            if(tarefaSelecionada == tarefa){
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
            li.classList.add('app__section-task-list-item-active')
        }   
    }
    
    return li
}

btAdicionarTarefa.addEventListener('click', ()=>{
    listaDeTarefa.classList.toggle('hidden')
})

listaDeTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criandoElementoTarefa(tarefa);
    ultarefas.prepend(elementoTarefa);
    criandoNovaTarefa();
    textArea.value = '';
    listaDeTarefa.classList.add('hidden');
})

botaoDeletar.addEventListener('click', ()=>{
    textArea.value = '';
})

botaoCancelar.addEventListener('click', ()=>{
    textArea.value = '';
    listaDeTarefa.classList.toggle('hidden');
})

tarefas.forEach(tarefa => { 
    const elementoTarefa = criandoElementoTarefa(tarefa);
    ultarefas.prepend(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        criandoNovaTarefa();
    }
})

limparTarefasConcluidas.onclick = ()=>{
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach(elemento =>{
        elemento.remove()
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
    criandoNovaTarefa()
}

removerTodasTarefas.onclick = ()=>{
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach(elemento =>{
        elemento.remove()
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
    criandoNovaTarefa()
}
