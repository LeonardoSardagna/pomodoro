const meuhtml = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const baner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const comecarEpausar = document.querySelector('#start-pause span');
const imgcomecarEpausar = document.querySelector('#start-pause img');
const startPause = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');
const somPause = new Audio('/sons/pause.mp3');
const somPlay = new Audio('/sons/play.wav');
const somFim = new Audio('/sons/beep.mp3');
const musicaBt = document.querySelector('#alternar-musica');
const innerbloom = new Audio('/sons/innerbloom.mp3');
innerbloom.loop = true;
let contagemEmSegundos = 1500;
let intervaloId = null;


// função clique
focoBt.addEventListener('click', function(){
    contagemEmSegundos = 1500
    alterandoContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', function(){
    contagemEmSegundos = 300
    alterandoContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', function(){
    contagemEmSegundos = 900
    alterandoContexto('descanso-longo');
    longoBt.classList.add('active');
})

// função para adicionar musica no botão
musicaBt.addEventListener('click', ()=>{
    if(innerbloom.paused){
        innerbloom.play();
        innerbloom.volume = 0.5;
        innerbloom.currentTime = 10;
    }else{
        innerbloom.pause()
    }
})

// função para alterar tema, titulo, baner, fundo do botao, play/pause musica
function alterandoContexto(contexto){
    mostraTempo()
    meuhtml.setAttribute('data-contexto', contexto);
    baner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `<h1 class="app__title">
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            </h1>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `<h1 class="app__title">
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            </h1>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `<h1 class="app__title">
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            </h1>`;
        default:
            break;
    }

    botoes.forEach(function(alterarFundo){
        alterarFundo.classList.remove('active');
    })
}

function contagemregressiva(){

    if(contagemEmSegundos <= 0){
        somFim.play();
        const focoAtivo = meuhtml.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }

    contagemEmSegundos -= 1;
    mostraTempo();
}

startPause.addEventListener('click', iniciarEPausar);

function iniciarEPausar(){
    if(intervaloId){
        zerar()
        somPause.play();
        comecarEpausar.textContent = "Pausar";
        imgcomecarEpausar.setAttribute('src', '/imagens/pause.png')
        return
    }else{
        somPlay.play();
        comecarEpausar.textContent = "Começar";
        imgcomecarEpausar.setAttribute('src', '/imagens/play_arrow.png')
    }
    intervaloId = setInterval(contagemregressiva, 1000);
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}
//teste02
function mostraTempo(){
    const minutos = new Date(contagemEmSegundos * 1000);
    const minutosFormatado = minutos.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${minutosFormatado}`;
}

mostraTempo();


