function calcularTransfusao() {
    var peso = parseFloat(document.getElementById('peso-transfusao-sangue').value);
    var vgDesejado = parseFloat(document.getElementById('vgDesejado').value);
    var vgReceptor = parseFloat(document.getElementById('vgReceptor').value);
    var vgDoador = parseFloat(document.getElementById('vgDoador').value);
    var fator = 0;

    if (isNaN(peso) || isNaN(vgDesejado) || isNaN(vgReceptor) || isNaN(vgDoador)) {
        document.getElementById('resultado-transfusao-sangue').innerText = "Preencha todos os campos corretamente.";
    } else {
        if (document.getElementById('fator').value === 'cao') {
            fator = 90;
        } else if (document.getElementById('fator').value === 'gato') {
            fator = 70;
        }

        var doseCalculada = peso * fator * ((vgDesejado - vgReceptor) / vgDoador);
        document.getElementById('resultado-transfusao-sangue').innerText = doseCalculada.toFixed(2) + " mL";
    }
}

function limparCamposTransfusao() {
    document.getElementById('peso-transfusao-sangue').value = '';
    document.getElementById('vgDesejado').value = '';
    document.getElementById('vgReceptor').value = '';
    document.getElementById('vgDoador').value = '';
    document.getElementById('resultado-transfusao-sangue').innerText = '';
    document.getElementById('fator').value = 'cao';
}
