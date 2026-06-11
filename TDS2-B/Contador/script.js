let numero = 0

function intervalo() {
    numero += 100
    document.getElementById("contador").innerText = numero
    if(numero >= 10000) {
        clearInterval(intervalo)
    }
}
setInterval(intervalo, 100)