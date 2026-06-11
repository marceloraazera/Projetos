// Roda toda vez que a página carrega
window.onload = function() {
    var nome = localStorage.getItem("nomeDoUsuario");
    var temConta = localStorage.getItem("contaCriada");
    
    var botaoLogin = document.getElementById("btn-autenticacao");
    
    // IF/ELSE que você pediu para mudar o texto do botão
    if (botaoLogin != null) {
        if (nome != null) {
            // Se o usuário está logado
            botaoLogin.innerHTML = "Minha Conta";
            botaoLogin.onclick = function() { window.location.href = "usuario.html"; };
        } else {
            // Se NÃO está logado, verificamos se ele já criou conta alguma vez
            if (temConta == "sim") {
                botaoLogin.innerHTML = "Login";
                botaoLogin.onclick = function() { window.location.href = "login.html"; };
            } else {
                botaoLogin.innerHTML = "Cadastrar";
                botaoLogin.onclick = function() { window.location.href = "cadastro.html"; };
            }
        }
    }
    
    // Mostra o nome na tela de usuário
    var textoNome = document.getElementById("nome-usuario");
    if (textoNome != null && nome != null) {
        textoNome.innerHTML = nome;
    }
    
    // Mostra a faixa de promoção na página inicial
    var banner = document.getElementById("banner-promocao");
    if (banner != null && nome != null) {
        banner.style.display = "block";
    }
};

function fazerLogin() {
    var nome = document.getElementById("nome-login").value;
    
    // Salva o nome no navegador
    localStorage.setItem("nomeDoUsuario", nome);
    
    window.location.href = "usuario.html";
}

function fazerCadastro() {
    var nome = document.getElementById("nome-cadastro").value;
    
    // Salva o nome no navegador
    localStorage.setItem("nomeDoUsuario", nome);
    
    // Marca que esse navegador já tem um cadastro registrado
    localStorage.setItem("contaCriada", "sim");
    
    window.location.href = "usuario.html";
}

function sair() {
    // Apaga apenas o nome (o usuário desloga, mas a marca de que "temConta" continua lá)
    localStorage.removeItem("nomeDoUsuario");
    
    window.location.href = "index.html";
}

// Carrossel Simples
function irParaSlide(indice) {
    document.getElementById("slide0").style.display = "none";
    document.getElementById("slide1").style.display = "none";
    document.getElementById("slide2").style.display = "none";
    
    document.getElementById("bolinha0").className = "bolinha";
    document.getElementById("bolinha1").className = "bolinha";
    document.getElementById("bolinha2").className = "bolinha";
    
    if (indice == 0) {
        document.getElementById("slide0").style.display = "block";
        document.getElementById("bolinha0").className = "bolinha ativa";
    }
    if (indice == 1) {
        document.getElementById("slide1").style.display = "block";
        document.getElementById("bolinha1").className = "bolinha ativa";
    }
    if (indice == 2) {
        document.getElementById("slide2").style.display = "block";
        document.getElementById("bolinha2").className = "bolinha ativa";
    }
}

// FAQ
function alternarFaq(idDaResposta) {
    var resposta = document.getElementById(idDaResposta);
    if (resposta.style.display == "block") {
        resposta.style.display = "none";
    } else {
        resposta.style.display = "block";
    }
}
