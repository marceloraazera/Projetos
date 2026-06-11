let perguntas = document.querySelectorAll(".pergunta")

perguntas.forEach(function(pergunta) {
    pergunta.addEventListener("click", function() {
        let resposta = pergunta.nextElementSibling

        if(resposta.style.display == "block") {
            resposta.style.display = "none"
        } else {
            resposta.style.display = "block"
        }
    })
})