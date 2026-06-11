let pesquisa = document.getElementById("pesquisa")

pesquisa.addEventListener("keyup", function() {
    let texto = pesquisa.value.toLowerCase()
    let cards = document.querySelectorAll(".card")

    let encontrados = 0

    cards.forEach(function(card) {
        let titulo = card.querySelector("h2").textContent.toLowerCase()

        if(titulo.includes(texto)) {
            card.style.display = "block"
            encontrados++
        } else {
            card.style.display = "none"
        }
    })
    document.getElementById("resultado").innerText = encontrados + " resultados encontrados"
})