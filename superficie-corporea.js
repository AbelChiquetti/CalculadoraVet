function calcularSuperficieCorporea() {
    var tipoAnimal = document.getElementById('tipo-animal-superficiecorporea').value;
    var pesoKg = parseFloat(document.getElementById('peso-animal-superficiecorporea').value);

    if (isNaN(pesoKg)) {
        document.getElementById('resultado-superficiecorporea').innerText = "Por favor, preencha o peso corretamente.";
    } else {
        var coeficiente;
        if (tipoAnimal === 'cao') {
            coeficiente = 10.1;
        } else if (tipoAnimal === 'gato') {
            coeficiente = 10.0;
        }

        var superficieCorporea = (coeficiente * Math.pow(pesoKg, 0.666)) / 100;
        document.getElementById('resultado-superficiecorporea').innerText = superficieCorporea.toFixed(3) + " m²";
    }
}

function limparCamposSuperficieCorporea() {
    document.getElementById('peso-animal-superficiecorporea').value = '';
    document.getElementById('resultado-superficiecorporea').innerText = '';
}
