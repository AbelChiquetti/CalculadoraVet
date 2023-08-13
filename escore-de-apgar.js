function calcularApgar() {
    var pontos = 0;

    var frequenciaCardiaca = parseInt(document.getElementById('frequenciaCardiaca').value);
    var esforcoRespiratorio = parseInt(document.getElementById('esforcoRespiratorio').value);
    var motilidade = parseInt(document.getElementById('motilidade').value);
    var irritabilidadeReflexa = parseInt(document.getElementById('irritabilidadeReflexa').value);
    var coloracaoMucosas = parseInt(document.getElementById('coloracaoMucosas').value);

    if (isNaN(frequenciaCardiaca) || isNaN(esforcoRespiratorio) || isNaN(motilidade) || isNaN(irritabilidadeReflexa) || isNaN(coloracaoMucosas)) {
        document.getElementById('resultado-apgar').innerText = "Preencha todos os campos corretamente.";
    } else {
        pontos += frequenciaCardiaca === 0 ? 0 : frequenciaCardiaca;
        pontos += esforcoRespiratorio === 0 ? 0 : esforcoRespiratorio;
        pontos += motilidade === 0 ? 0 : motilidade;
        pontos += irritabilidadeReflexa === 0 ? 0 : irritabilidadeReflexa;
        pontos += coloracaoMucosas === 0 ? 0 : coloracaoMucosas;

        var resultado;

        if (pontos >= 0 && pontos <= 3) {
            resultado = "Risco de Morte";
        } else if (pontos >= 4 && pontos <= 6) {
            resultado = "Angústia Moderada";
        } else if (pontos >= 7 && pontos <= 10) {
            resultado = "Ausência de Angústia";
        } else {
            resultado = "Pontuação inválida.";
        }

        document.getElementById('resultado-apgar').innerHTML = "<strong>Pontuação Apgar:</strong> " + pontos + " - " + resultado;
    }
}

function limparCamposApgar() {
    document.getElementById('frequenciaCardiaca').selectedIndex = 0;
    document.getElementById('esforcoRespiratorio').selectedIndex = 0;
    document.getElementById('motilidade').selectedIndex = 0;
    document.getElementById('irritabilidadeReflexa').selectedIndex = 0;
    document.getElementById('coloracaoMucosas').selectedIndex = 0;
    document.getElementById('resultado-apgar').innerText = '';
}

(function () {
    // Código para Escore de Apgar Neonatal aqui
    console.log("Página de Escore de Apgar Neonatal");
})();
