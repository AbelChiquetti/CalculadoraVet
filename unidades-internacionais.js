function aplicarMascara(input) {
    var valor = input.value.replace(/[^\d,.]/g, '');
    input.value = formatarNumero(valor);
}

function formatarNumero(numero) {
    numero = numero.replace(/[.]/g, '');
    var partes = numero.split(',');
    if (partes.length > 1) {
        var parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parteInteira + ',' + partes[1];
    } else {
        return partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

function obterValorNumerico(inputId) {
    var input = document.getElementById(inputId);
    var valorFormatado = input.value.replace(/[^\d,.]/g, '');
    return parseFloat(valorFormatado.replace(',', '.'));
}

function calcUI_calcularDose() {
    var peso = obterValorNumerico('calcUI_peso');
    var doseIndicada = obterValorNumerico('calcUI_dose');
    var concentracaoMedicamento = obterValorNumerico('calcUI_concentracao');
    var concentracaoUnidade = document.getElementById('calcUI_concentracaoUnidade').value;

    if (isNaN(peso) || isNaN(doseIndicada) || isNaN(concentracaoMedicamento)) {
        document.getElementById('calcUI_resultado').innerText = "Preencha todos os campos corretamente.";
        document.getElementById('calcUI_sugestoes').innerText = "";
    } else {
        if (concentracaoUnidade === 'UI/mL') {
            var concentracaoMl = parseFloat(document.getElementById('calcUI_concentracaoMl').value);

            if (isNaN(concentracaoMl)) {
                var doseCalculadaUi = (doseIndicada * peso) / concentracaoMedicamento;
                document.getElementById('calcUI_resultado').innerText = doseCalculadaUi.toFixed(2) + " UI";
                document.getElementById('calcUI_sugestoes').innerText = "";
            } else {
                var doseCalculadaUi = (doseIndicada * peso) / concentracaoMedicamento;
                var doseCalculadaMl = (doseIndicada * peso) / (concentracaoMedicamento / concentracaoMl);
                document.getElementById('calcUI_resultado').innerText = doseCalculadaMl.toFixed(2) + " mL (" + doseCalculadaUi.toFixed(2) + " UI)";
                document.getElementById('calcUI_sugestoes').innerText = "";
            }
        } else if (concentracaoUnidade === 'UI/mg') {
            var concentracaoMg = parseFloat(document.getElementById('calcUI_concentracaoMg').value);
            if (isNaN(concentracaoMg)) {
                var doseCalculadaMg = (doseIndicada * peso) / concentracaoMedicamento;
                document.getElementById('calcUI_resultado').innerText = doseCalculadaMg.toFixed(2) + " mg";
                document.getElementById('calcUI_sugestoes').innerText = "";
            } else {
                var doseCalculadaMg = (doseIndicada * peso) / concentracaoMedicamento;
                var doseCalculadaMl = doseCalculadaMg / concentracaoMg;
                document.getElementById('calcUI_resultado').innerText = doseCalculadaMl.toFixed(2) + " mL (" + doseCalculadaMg.toFixed(2) + " mg)";
                document.getElementById('calcUI_sugestoes').innerText = "";
            }
        } else if (concentracaoUnidade === 'UI/mcg') {
            var concentracaoMcg = parseFloat(document.getElementById('calcUI_concentracaoMcg').value);
            if (isNaN(concentracaoMcg)) {
                var doseCalculadaMcg = (doseIndicada * peso) / concentracaoMedicamento;
                document.getElementById('calcUI_resultado').innerText = doseCalculadaMcg.toFixed(2) + " mcg";
                document.getElementById('calcUI_sugestoes').innerText = "";
            } else {
                var doseCalculadaMcg = (doseIndicada * peso) / concentracaoMedicamento;
                var doseCalculadaMl = doseCalculadaMcg / concentracaoMcg;
                document.getElementById('calcUI_resultado').innerText = doseCalculadaMl.toFixed(2) + " mL (" + doseCalculadaMcg.toFixed(2) + " mcg)";
                document.getElementById('calcUI_sugestoes').innerText = "";
            }
        }
    }
}

function calcUI_limparCampos() {
    document.getElementById('calcUI_peso').value = '';
    document.getElementById('calcUI_dose').value = '';
    document.getElementById('calcUI_concentracao').value = '';
    document.getElementById('calcUI_concentracaoMl').value = '';
    document.getElementById('calcUI_concentracaoMg').value = '';
    document.getElementById('calcUI_concentracaoMcg').value = '';
    document.getElementById('calcUI_resultado').innerText = '';
    document.getElementById('calcUI_sugestoes').innerText = '';

    var concentracaoUnidade = document.getElementById('calcUI_concentracaoUnidade').value;
    if (concentracaoUnidade === 'UI/mg') {
        document.getElementById('calcUI_concentracaoMgContainer').style.display = 'flex';
    } else {
        document.getElementById('calcUI_concentracaoMgContainer').style.display = 'none';
    }

    if (concentracaoUnidade === 'UI/mcg') {
        document.getElementById('calcUI_concentracaoMcgContainer').style.display = 'flex';
    } else {
        document.getElementById('calcUI_concentracaoMcgContainer').style.display = 'none';
    }
}

// Faz com que a caixa de concentração em mL (UI/mL) seja visível no carregamento da página
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calcUI_concentracaoUnidade').value = 'UI/mL';
    document.getElementById('calcUI_concentracaoMlContainer').style.display = 'flex';
});

document.getElementById('calcUI_concentracaoUnidade').addEventListener('change', function () {
    const concentracaoUnidade = this.value;
    const concentracaoInput = document.getElementById('calcUI_concentracao');
    const concentracaoMgContainer = document.getElementById('calcUI_concentracaoMgContainer');
    const concentracaoMcgContainer = document.getElementById('calcUI_concentracaoMcgContainer');
    const concentracaoMlContainer = document.getElementById('calcUI_concentracaoMlContainer'); // Nova linha

    if (concentracaoUnidade === 'UI/mL') {
        concentracaoInput.placeholder = 'Insira a concentração em UI';
        concentracaoMgContainer.style.display = 'none';
        concentracaoMcgContainer.style.display = 'none';
        concentracaoMlContainer.style.display = 'flex'; // Nova linha
        document.getElementById('calcUI_concentracaoMg').value = '';
        document.getElementById('calcUI_concentracaoMcg').value = '';
    } else if (concentracaoUnidade === 'UI/mg') {
        concentracaoInput.placeholder = 'Insira a concentração em UI/mg';
        concentracaoMgContainer.style.display = 'flex';
        concentracaoMcgContainer.style.display = 'none';
        concentracaoMlContainer.style.display = 'none'; // Nova linha
        document.getElementById('calcUI_concentracaoMcg').value = '';
    } else if (concentracaoUnidade === 'UI/mcg') {
        concentracaoInput.placeholder = 'Insira a concentração em UI/mcg';
        concentracaoMgContainer.style.display = 'none';
        concentracaoMcgContainer.style.display = 'flex';
        concentracaoMlContainer.style.display = 'none'; // Nova linha
        document.getElementById('calcUI_concentracaoMg').value = '';
    }
});
