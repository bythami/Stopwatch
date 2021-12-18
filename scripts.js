const cronometroTela = document.getElementById("cronometro")
const cronometroBorder = document.getElementById("cronometro-border")
const cronometroOpcoes = document.getElementById("cronometro-opcoes")
const cronometroScore = document.getElementById("cronometro-score")

let min = 0
let miliseg = 0
let seg = 0
let contador = null
let cantPoints = 0

const getContador = () => {
    return setInterval(function () {
        miliseg++
        if (min >= 60 && seg >= 60 && miliseg >= 100) {
            clearInterval(contador)
        } else if (miliseg === 100) {
            seg++
            miliseg = 0
            if (seg === 60) {
                min++
                seg = 0
                cronometroTela.children[0].innerHTML = min
                cronometroTela.children[2].innerHTML = 0
            } else {
                cronometroTela.children[2].innerHTML = seg
            }
        }
        cronometroTela.children[3].innerHTML = miliseg
    }, 10)
}
const startCronometro = () => {
    contador = getContador()
    cronometroOpcoes.children[1].innerHTML = "||"
    cronometroBorder.classList.add('rotar')
    cronometroBorder.classList.add('rotacao')

}
const stopCronometro = () => {
    clearInterval(contador)
    contador = null
    cronometroOpcoes.children[1].innerHTML = "►"
    cronometroBorder.classList.remove('rotar')
    cronometroBorder.classList.remove('rotacao')

}
const resetCronometro = () => {
    stopCronometro()
    min = 0
    miliseg = 0
    seg = 0
    cantPoints = 0
    cronometroTela.children[0].innerHTML = 0
    cronometroTela.children[2].innerHTML = 0
    cronometroTela.children[3].innerHTML = 0
    cronometroScore.innerHTML = ''
}
const addPoint = (time = '0:00') => {
    cantPoints++
    min = 0
    miliseg = 0
    seg = 0
    cronometroTela.children[0].innerHTML = 0
    cronometroTela.children[2].innerHTML = 0
    cronometroTela.children[3].innerHTML = 0
    if (cantPoints <= 3) {
        cronometroScore.innerHTML += `<p>${time}</p>`
    } else {
        resetCronometro()
    }
}
cronometroOpcoes.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'cronometro-iniciar':
            if (contador === null) {
                startCronometro()
            } else {
                stopCronometro()
            }
            break;

        case 'cronometro-reiniciar':
            resetCronometro()
            break;

        case 'cronometro-anotar':
            addPoint(`${min === 0 ? '' : min + ':'} ${seg} : ${miliseg}`)
            break;
    }
})