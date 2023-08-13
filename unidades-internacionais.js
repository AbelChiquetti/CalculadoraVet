function calcUI_calcularDose() {
    var peso = parseFloat(document.getElementById('calcUI_peso').value);
    var doseIndicada = parseFloat(document.getElementById('calcUI_dose').value);
    var concentracaoMedicamento = parseFloat(document.getElementById('calcUI_concentracao').value);
    var concentracaoUnidade = document.getElementById('calcUI_concentracaoUnidade').value;

    if (isNaN(peso) || isNaN(doseIndicada) || isNaN(concentracaoMedicamento)) {
        document.getElementById('calcUI_resultado').innerText = "Preencha todos os campos corretamente.";
        document.getElementById('calcUI_sugestoes').innerText = "";
    } else {
        if (concentracaoUnidade === 'UI/mL') {
            var doseCalculadaMl = (doseIndicada * peso) / concentracaoMedicamento;
            document.getElementById('calcUI_resultado').innerText = doseCalculadaMl.toFixed(2) + " mL";
            document.getElementById('calcUI_sugestoes').innerText = "";
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

document.getElementById('calcUI_concentracaoUnidade').addEventListener('change', function() {
    const concentracaoUnidade = this.value;
    const concentracaoInput = document.getElementById('calcUI_concentracao');
    const concentracaoMgContainer = document.getElementById('calcUI_concentracaoMgContainer');
    const concentracaoMcgContainer = document.getElementById('calcUI_concentracaoMcgContainer');

    if (concentracaoUnidade === 'UI/mL') {
        concentracaoInput.placeholder = 'Insira a concentração em UI/mL';
        concentracaoMgContainer.style.display = 'none';
        concentracaoMcgContainer.style.display = 'none';
        document.getElementById('calcUI_concentracaoMg').value = '';
        document.getElementById('calcUI_concentracaoMcg').value = '';
    } else if (concentracaoUnidade === 'UI/mg') {
        concentracaoInput.placeholder = 'Insira a concentração em UI/mg';
        concentracaoMgContainer.style.display = 'flex';
        concentracaoMcgContainer.style.display = 'none';
        document.getElementById('calcUI_concentracaoMcg').value = '';
    } else if (concentracaoUnidade === 'UI/mcg') {
        concentracaoInput.placeholder = 'Insira a concentração em UI/mcg';
        concentracaoMgContainer.style.display = 'none';
        concentracaoMcgContainer.style.display = 'flex';
        document.getElementById('calcUI_concentracaoMg').value = '';
    }
});
