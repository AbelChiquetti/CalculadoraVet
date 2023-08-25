function calcularDebitoUrinario() {
    var volume = parseFloat(document.getElementById('volume').value);
    var tempo = parseFloat(document.getElementById('tempo').value);
    var peso = parseFloat(document.getElementById('peso-debito-urinario').value);
    var fluidoterapia = document.getElementById('option-fluidoterapia').value;

    if (isNaN(volume) || isNaN(tempo) || isNaN(peso)) {
        document.getElementById('resultado-debito-urinario').innerText = "Preencha todos os campos corretamente.";
    } else {
        var debitoUrinario = volume / (peso * tempo);
        var resultadoTexto = debitoUrinario.toFixed(2) + " mL/kg/hr";

        if (fluidoterapia === 'sem') {
            if (debitoUrinario <= 0.07) {
                resultadoTexto += " - Anúria";
            } else if (debitoUrinario >= 0.08 && debitoUrinario <= 0.27) {
                resultadoTexto += " - Oligúria";
            } else if (debitoUrinario > 1) {
                resultadoTexto += " - Poliúria";
            } else if (debitoUrinario >= 0.28 && debitoUrinario <= 1) {
                resultadoTexto += " - Normal";
            }
        } else if (fluidoterapia === 'com') {
            if (debitoUrinario <= 0.07) {
                resultadoTexto += " - Anúria";
            } else if (debitoUrinario >= 0.08 && debitoUrinario <= 0.27) {
                resultadoTexto += " - Oligúria";
            } else if (debitoUrinario > 2) {
                resultadoTexto += " - Poliúria";
            } else if (debitoUrinario >= 0.28 && debitoUrinario <= 2) {
                resultadoTexto += " - Normal";
            }
        }

        document.getElementById('resultado-debito-urinario').innerText = resultadoTexto;
    }
}

function limparCamposUrinario() {
    document.getElementById('volume').value = '';
    document.getElementById('tempo').value = '';
    document.getElementById('peso-debito-urinario').value = '';
    document.getElementById('resultado-debito-urinario').innerText = '';
}
