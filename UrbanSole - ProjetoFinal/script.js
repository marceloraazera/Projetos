// Roda toda vez que a página carrega
window.onload = function() {
    let nome = localStorage.getItem("nomeDoUsuario");
    
    let botaoLogin = document.getElementById("btn-autenticacao");
    
    if (botaoLogin !== null) {
        if (nome !== null) {
            // Se o usuário está logado
            botaoLogin.innerHTML = "Logado";
            botaoLogin.onclick = function() { window.location.href = "usuario.html"; };
        } else {
            // Se NÃO está logado
            botaoLogin.innerHTML = "Cadastro / Login";
            botaoLogin.onclick = function() { window.location.href = "login.html"; };
        }
    }
    
    // Mostra o nome na tela de usuário
    let textoNome = document.getElementById("nome-usuario");
    if (textoNome !== null && nome !== null) {
        textoNome.innerHTML = nome;
    }
    
    // Mostra a faixa de promoção na página inicial
    let banner = document.getElementById("banner-promocao");
    if (banner !== null && nome !== null) {
        banner.style.display = "block";
    }
};

function fazerLogin() {
    let elementoNome = document.getElementById("nome-login");
    let nome = "";
    
    if (elementoNome !== null) {
        nome = elementoNome.value;
    }
    
    if (nome.trim() === "") {
        nome = "Visitante";
    }
    
    // Salva o nome no navegador
    localStorage.setItem("nomeDoUsuario", nome);
    
    window.location.href = "usuario.html";
}

function fazerCadastro() {
    let elementoNome = document.getElementById("nome-cadastro");
    let nome = "";
    
    if (elementoNome !== null) {
        nome = elementoNome.value;
    }
    
    if (nome.trim() === "") {
        nome = "Visitante";
    }
    
    // Salva o nome no navegador
    localStorage.setItem("nomeDoUsuario", nome);
    
    window.location.href = "usuario.html";
}

function sair() {
    // Apaga apenas o nome
    localStorage.removeItem("nomeDoUsuario");
    
    window.location.href = "index.html";
}

// Carrossel Simples
function irParaSlide(indice) {
    let slide0 = document.getElementById("slide0");
    let slide1 = document.getElementById("slide1");
    let slide2 = document.getElementById("slide2");
    
    if (slide0 !== null) slide0.style.display = "none";
    if (slide1 !== null) slide1.style.display = "none";
    if (slide2 !== null) slide2.style.display = "none";
    
    let bolinha0 = document.getElementById("bolinha0");
    let bolinha1 = document.getElementById("bolinha1");
    let bolinha2 = document.getElementById("bolinha2");
    
    if (bolinha0 !== null) bolinha0.className = "bolinha";
    if (bolinha1 !== null) bolinha1.className = "bolinha";
    if (bolinha2 !== null) bolinha2.className = "bolinha";
    
    if (indice === 0) {
        if (slide0 !== null) slide0.style.display = "block";
        if (bolinha0 !== null) bolinha0.className = "bolinha ativa";
    }
    if (indice === 1) {
        if (slide1 !== null) slide1.style.display = "block";
        if (bolinha1 !== null) bolinha1.className = "bolinha ativa";
    }
    if (indice === 2) {
        if (slide2 !== null) slide2.style.display = "block";
        if (bolinha2 !== null) bolinha2.className = "bolinha ativa";
    }
}

// FAQ
function alternarFaq(idDaResposta) {
    let resposta = document.getElementById(idDaResposta);
    if (resposta !== null) {
        if (resposta.style.display === "block") {
            resposta.style.display = "none";
        } else {
            resposta.style.display = "block";
        }
    }
}
