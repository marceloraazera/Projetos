let perguntas = document.querySelector(".pergunta")

perguntas.forEach(function(pergunta) {
    pergunta.addEventListener("click", function() {
        let resposta = pergunta.nextElementSibiling

        if(resposta.style.display == "block") {
            resposta.display.block = "none"
        } else [
            resposta.display.block = "block"
        ]
    })
})