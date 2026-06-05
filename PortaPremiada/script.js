let portaPremiada = 2;

function jogar(escolha) {

    let imagemClicada = document.getElementById("p" + escolha)
    let texto = document.getElementById("mensagem")

    if (escolha === portaPremiada) {
        imagemClicada.src = "dentroNether.png"
        texto.innerText = "PARABÉNS! Você chegou ao Nether!"
        document.getElementById("p1").removeAttribute("onclick")
        document.getElementById("p3").removeAttribute("onclick")
        texto.style.color = "#2ecc71"

    } else if (escolha === 1) {
        imagemClicada.src = "aether.png"
        texto.innerText = "Esse não é o Nether! Tente novamente!"
        document.getElementById("p2").removeAttribute("onclick")
        document.getElementById("p3").removeAttribute("onclick")
        texto.style.color = "#d81600"
    }

    else {
        imagemClicada.src = "mminecraft.png"
        texto.innerText = "Esse não é o Nether! Tente novamente!"
        document.getElementById("p2").removeAttribute("onclick")
        document.getElementById("p1").removeAttribute("onclick")
        texto.style.color = "#eb1801"
    }

}