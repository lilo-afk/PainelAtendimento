$(document).ready(function() {
    
    $("#gerarSenha").click(function() {
        var proximaSenha = localStorage.getItem('proximaSenha') || 1;
        var senhasEspera = localStorage.getItem('senhasEspera') || '';

        senhasEspera += '<div class="senha">' + proximaSenha + '</div>';
        localStorage.setItem('senhasEspera', senhasEspera);
        localStorage.setItem('proximaSenha', parseInt(proximaSenha) + 1);

        window.parent.postMessage('Senha ' + proximaSenha, '*');

        $('#mensagem').html('Senha ' + proximaSenha + ' gerada com sucesso').fadeIn();

        
    });
});