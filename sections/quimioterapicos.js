function calcularDoseAntineoplasico() {
    var tipoAnimal = document.getElementById('animalAntineoplasico').value;
    var pesoKg = parseFloat(document.getElementById('pesoAntineoplasico').value);
    var doseMgM2 = parseFloat(document.getElementById('doseAntineoplasico').value);
    var concentracaoMg = parseFloat(document.getElementById('concentracaoMgAntineoplasico').value);
    var concentracaoMl = parseFloat(document.getElementById('concentracaoMlAntineoplasico').value);

    if (isNaN(pesoKg) || isNaN(doseMgM2) || isNaN(concentracaoMg) || isNaN(concentracaoMl)) {
        document.getElementById('resultadoAntineoplasico').innerText = "Preencha todos os campos corretamente.";
    } else {
        var coeficiente;
        if (tipoAnimal === 'cao') {
            coeficiente = 10.1;
        } else if (tipoAnimal === 'gato') {
            coeficiente = 10.0;
        }

        // Cálculo da Área (Superfície Corpórea)
        var areaM2 = (coeficiente * Math.pow(pesoKg, 0.666)) / 100;

        // Cálculo da Dose em mL
        var doseMl = (areaM2 * doseMgM2) / (concentracaoMg / concentracaoMl);

        document.getElementById('resultadoAntineoplasico').innerText = doseMl.toFixed(2) + " mL";
    }
}

function limparCamposAntineoplasico() {
    // Função para limpar os campos de entrada e o resultado
    document.getElementById('pesoAntineoplasico').value = '';
    document.getElementById('doseAntineoplasico').value = '';
    document.getElementById('concentracaoMgAntineoplasico').value = '';
    document.getElementById('concentracaoMlAntineoplasico').value = '';
    document.getElementById('resultadoAntineoplasico').innerText = '';
}
