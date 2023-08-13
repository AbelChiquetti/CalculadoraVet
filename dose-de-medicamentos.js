function calcularDose() {
    var peso = parseFloat(document.getElementById('peso-dose-medicamentos').value);
    var doseIndicada = parseFloat(document.getElementById('dose').value);
    var concentracaoMedicamento = parseFloat(document.getElementById('concentracao').value);
    var concentracaoUnidade = document.getElementById('concentracaoUnidade').value;

    if (isNaN(peso) || isNaN(doseIndicada) || isNaN(concentracaoMedicamento)) {
        document.getElementById('resultado-dose-medicamentos').innerText = "Preencha todos os campos corretamente.";
        document.getElementById('sugestoes').innerText = "";
    } else {
        if (concentracaoUnidade === 'mg/ml') {
            var doseCalculadaMl = (doseIndicada * peso) / concentracaoMedicamento;
            document.getElementById('resultado-dose-medicamentos').innerText = doseCalculadaMl.toFixed(2) + " mL";
            document.getElementById('sugestoes').innerText = "";
        } else if (concentracaoUnidade === '%') {
            var concentracaoMgMl = (concentracaoMedicamento * 1000) / 100;
            var doseCalculada = (peso * doseIndicada) / concentracaoMgMl;
            document.getElementById('resultado-dose-medicamentos').innerText = doseCalculada.toFixed(2) + " mL";
            document.getElementById('sugestoes').innerText = "";
        } else if (concentracaoUnidade === 'mcg/mL') {
            var concentracaoMgMl = concentracaoMedicamento / 1000;
            var doseCalculada = (peso * doseIndicada) / concentracaoMgMl;
            document.getElementById('resultado-dose-medicamentos').innerText = doseCalculada.toFixed(2) + " mL";
            document.getElementById('sugestoes').innerText = "";
        } else if (concentracaoUnidade === 'mg') {
            var doseCalculadaMg = doseIndicada * peso;
            var doseCalculadaComprimido = doseCalculadaMg / concentracaoMedicamento;

            var doseComprimidoInteiro = Math.floor(doseCalculadaComprimido);
            var doseComprimidoFracionado = doseCalculadaComprimido - doseComprimidoInteiro;
            var doseComprimidoFracionadoFormatada = formatarQuantidadeFracionada(doseComprimidoFracionado);

            document.getElementById('resultado-dose-medicamentos').innerText = doseCalculadaMg.toFixed(2) + " mg";
            document.getElementById('resultado-dose-medicamentos').innerText += " ou " + doseComprimidoInteiro + " " + doseComprimidoFracionadoFormatada + " comprimido(s)";

            sugestoesConcentracoes(doseCalculadaMg);

        } else if (concentracaoUnidade === 'g') {
            var concentracaoMgMl = concentracaoMedicamento * 1000;
            var doseCalculadaG = (peso * doseIndicada) / concentracaoMgMl;
            var doseCalculadaComprimidoG = doseCalculadaG / concentracaoMedicamento;
            document.getElementById('sugestoes').innerText = "";

            var doseComprimidoInteiroG = Math.floor(doseCalculadaComprimidoG);
            var doseComprimidoFracionadoG = doseCalculadaComprimidoG - doseComprimidoInteiroG;
            var doseComprimidoFracionadoFormatadaG = formatarQuantidadeFracionada(doseComprimidoFracionadoG);

            document.getElementById('resultado-dose-medicamentos').innerText = doseCalculadaG.toFixed(2) + " g";
            document.getElementById('resultado-dose-medicamentos').innerText += " ou " + doseComprimidoInteiroG + " " + doseComprimidoFracionadoFormatadaG + " comprimido(s)";
        } else if (concentracaoUnidade === 'suspensao') {
            var concentracaoMl = parseFloat(document.getElementById('concentracaoMl').value);
            if (isNaN(concentracaoMl)) {
                document.getElementById('resultado-dose-medicamentos').innerText = "Insira a concentração em mL.";
                document.getElementById('sugestoes').innerText = "";
            } else {
                var doseCalculadaSuspensao = (doseIndicada * peso) / (concentracaoMedicamento / concentracaoMl);
                document.getElementById('resultado-dose-medicamentos').innerText = doseCalculadaSuspensao.toFixed(2) + " mL";
                document.getElementById('sugestoes').innerText = "";
            }
        }
    }
}

function formatarQuantidadeFracionada(valor) {
    if (valor === 0.5) {
        return "e 1/2";
    } else if (valor === 0.25) {
        return "e 1/4";
    } else if (valor === 0.75) {
        return "e 3/4";
    } else {
        return "";
    }
}

function sugestoesConcentracoes(doseMg) {
    var sugestoesDiv = document.getElementById('sugestoes');
    sugestoesDiv.innerHTML = "";

    var concentracoesSugeridas = [25, 50, 100, 200, 500, 1000];
    var comprimidosSugeridos = [];
    for (var i = 0; i < concentracoesSugeridas.length; i++) {
        var concentracaoSugerida = concentracoesSugeridas[i];
        var comprimidosSugeridosInteiro = Math.floor(doseMg / concentracaoSugerida);
        var comprimidosSugeridosFracionado = doseMg % concentracaoSugerida;
        var comprimidosSugeridosFracionadoFormatado = formatarQuantidadeFracionada(comprimidosSugeridosFracionado);

        // Exibir apenas sugestões com resultados maiores que 0
        if (comprimidosSugeridosInteiro > 0) {
            sugestoesDiv.innerHTML += "<p>" + comprimidosSugeridosInteiro + " " + comprimidosSugeridosFracionadoFormatado + " comprimido(s) de " + concentracaoSugerida + " mg</p>";
        }
    }
}

function limparCamposMedicamentos() {
    document.getElementById('peso-dose-medicamentos').value = '';
    document.getElementById('dose').value = '';
    document.getElementById('concentracao').value = '';
    document.getElementById('concentracaoMl').value = '';
    document.getElementById('resultado-dose-medicamentos').innerText = '';
    document.getElementById('sugestoes').innerText = '';
    var concentracaoUnidade = document.getElementById('concentracaoUnidade').value;
    if (concentracaoUnidade === 'suspensao') {
        document.getElementById('concentracaoMlContainer').style.display = 'flex';
    } else {
        document.getElementById('concentracaoMlContainer').style.display = 'none';
        document.getElementById('concentracaoMl').value = ''; // Limpa o valor do campo se a opção não for "Suspensão"
    }
}

// Exibir o campo de concentração em mL somente quando Suspensão estiver selecionado
document.getElementById('concentracaoUnidade').addEventListener('change', function () {
    if (this.value === 'suspensao') {
        document.getElementById('concentracaoMlContainer').style.display = 'flex';
    } else {
        document.getElementById('concentracaoMlContainer').style.display = 'none';
        document.getElementById('concentracaoMl').value = ''; // Limpa o valor do campo se a opção não for "Suspensão"
    }

    // Alterar o placeholder com base na opção selecionada
    var concentracaoInput = document.getElementById('concentracao');
    if (this.value === '%') {
        concentracaoInput.placeholder = "Insira a concentração em %";
    } else if (this.value === 'mcg/mL') {
        concentracaoInput.placeholder = "Insira a concentração em mcg/mL";
    } else if (this.value === 'g') {
        concentracaoInput.placeholder = "Insira a concentração em g";
    } else if (this.value === 'mg') {
        concentracaoInput.placeholder = "Insira a concentração em mg";
    } else if (this.value === 'suspensao') {
        concentracaoInput.placeholder = "Insira a concentração em mg";
    } else {
        concentracaoInput.placeholder = "Insira a concentração em mg/mL";
    }
});
