function calcularFluidoterapia() {
    var peso = parseFloat(document.getElementById('peso-fluidoterapia').value);
    var desidratacao = parseFloat(document.getElementById('desidratacao').value);
    var animalType = document.getElementById('animal-fluidoterapia').value;
    var perdasTipo = document.getElementById('perdas').value;

    if (isNaN(peso) || isNaN(desidratacao)) {
        document.getElementById('reposicaoResultado').innerText = "";
        document.getElementById('manutencaoResultado').innerText = "";
        document.getElementById('perdasResultado').innerText = "";
        document.getElementById('totalDiarioResultado').innerText = "Preencha todos os campos corretamente.";
    } else {
        // Fluid Replacement (Volume de reposição)
        var reposicao = peso * desidratacao * 10;

        // Maintenance (Manutenção)
        var manutencao;
        if (animalType === 'cao') {
            manutencao = peso * 50;
        } else if (animalType === 'gato') {
            manutencao = peso * 70;
        } else {
            document.getElementById('reposicaoResultado').innerText = "";
            document.getElementById('manutencaoResultado').innerText = "";
            document.getElementById('perdasResultado').innerText = "";
            document.getElementById('totalDiarioResultado').innerText = "Tipo de animal inválido. Escolha 'Cão' ou 'Gato'.";
            return;
        }

        // Continuous Losses (Perdas Contínuas)
        var perdasContinuas = 0;
        if (perdasTipo === 'vomito') {
            perdasContinuas = peso * 40;
        } else if (perdasTipo === 'diarreia') {
            perdasContinuas = peso * 50;
        } else if (perdasTipo === 'ambos') {
            perdasContinuas = peso * 60;
        }

        // If the user selects "Nenhuma", perdasContinuas will remain zero.

        // Total Daily Requirement
        var totalDiario = reposicao + manutencao + perdasContinuas;

        // Display results
        document.getElementById('reposicaoResultado').innerText = reposicao.toFixed(2) + " mL";
        document.getElementById('manutencaoResultado').innerText = manutencao.toFixed(2) + " mL";
        document.getElementById('perdasResultado').innerText = perdasContinuas.toFixed(2) + " mL";
        document.getElementById('totalDiarioResultado').innerText = totalDiario.toFixed(2);
    }
}

function limparCamposFluidoterapia() {
    document.getElementById('peso-fluidoterapia').value = '';
    document.getElementById('desidratacao').value = '';
    document.getElementById('perdas').value = 'nenhuma';
    document.getElementById('reposicaoResultado').innerText = '';
    document.getElementById('manutencaoResultado').innerText = '';
    document.getElementById('perdasResultado').innerText = '';
    document.getElementById('totalDiarioResultado').innerText = '';
}
