// Função para verificar se o campo do diâmetro é válido
function validarCampoDiamentro(diametro) {
    if (isNaN(diametro) || diametro <= 0) {
        return false;
    }
    return true;
}

// Função para exibir mensagem de erro
function exibirMensagemErro(mensagem) {
    var mensagemErroElement = document.getElementById('mensagem-erro');
    mensagemErroElement.innerHTML = mensagem ? '<strong>' + mensagem + '</strong>' : '';
}

// Função para limpar os campos e redefinir a barra de progresso
function limparDadosgestacionalcg() {
    document.getElementById('diametro').value = '';
    document.getElementById('diagnostico').innerHTML = '';
    document.getElementById('resultado-idade-gestacional').innerText = '';
    document.getElementById('resultado-dias-parto').innerText = '';
    exibirMensagemErro(''); // Limpa a mensagem de erro quando limpar os campos
}

// Função para calcular a gestação com base no diâmetro e período selecionados
function calcularGestacao() {
    var animal = document.getElementById('animal-gestacao').value;
    var periodo = document.getElementById('periodo').value;
    var diametro = parseFloat(document.getElementById('diametro').value);
    var resultadoIdadeGestacional;
    var resultadoDiasParto;

    // Validar o campo diâmetro
    if (!validarCampoDiamentro(diametro)) {
        exibirMensagemErro('Preencha todos os campos corretamente.');
        document.getElementById('resultado-idade-gestacional').innerText = '';
        document.getElementById('resultado-dias-parto').innerText = '';
        return;
    }

    if (periodo === 'antes') {
        // Fórmulas para idade gestacional antes de 35 dias
        if (animal === 'Cadela Toy (Ate 5kg)' || animal === 'Cadela Pequena' || animal === 'Cadela Medio/Grande') {
            resultadoIdadeGestacional = (6 * diametro) + 20;
        } else {
            // Define como "Indefinido" para animais diferentes dos especificados abaixo
            resultadoIdadeGestacional = 'Indefinido';
        }

        // Fórmulas para dias para o parto em mm antes de 35 dias
        if (animal === 'Cadela Toy (Ate 5kg)') {
            resultadoDiasParto = (0.62887 * diametro) - 44.04;
        } else if (animal === 'Cadela Pequena') {
            resultadoDiasParto = (diametro - 68.68) / 1.53;
        } else if (animal === 'Cadela Medio/Grande') {
            resultadoDiasParto = (diametro - 82.13) / 1.8;
        } else if (animal === 'Gata') {
            resultadoDiasParto = (diametro - 62.03) / 1.1;
        } else if (animal === 'Yorkshire') {
            resultadoDiasParto = 63.4 - (18.92 + 0.65 * diametro);
        } else if (animal === 'Maltes') {
            resultadoDiasParto = 63.2 - (18.58 + 0.71 * diametro);
        } else if (animal === 'Pastor Alemao') {
            resultadoDiasParto = 44.76 - (4.34 * diametro);
        } else if (animal === 'Maine Coon') {
            resultadoDiasParto = (-0.79 * diametro) + 57.9; // Convertendo cm para mm
        }
    } else if (periodo === 'depois') {
        // Fórmulas para idade gestacional depois de 35 dias
        if (animal === 'Cadela Toy (Ate 5kg)' || animal === 'Cadela Pequena' || animal === 'Cadela Medio/Grande') {
            resultadoIdadeGestacional = (15 * diametro) + 20;
        } else {
            // Define como "Indefinido" para animais diferentes dos especificados abaixo
            resultadoIdadeGestacional = 'Indefinido';
        }

        // Fórmulas para dias para o parto em mm depois de 35 dias
        if (animal === 'Cadela Toy (Ate 5kg)') {
            resultadoDiasParto = (1.6190 * diametro) - 39.7;
        } else if (animal === 'Cadela Pequena') {
            resultadoDiasParto = (diametro - 25.11) / 0.61;
        } else if (animal === 'Cadela Medio/Grande') {
            resultadoDiasParto = (diametro - 29.18) / 0.7;
        } else if (animal === 'Gata') {
            resultadoDiasParto = (diametro - 23.39) / 0.47;
        } else if (animal === 'Yorkshire') {
            resultadoDiasParto = 63.4 - (23.89 + 1.63 * diametro);
        } else if (animal === 'Maltes') {
            resultadoDiasParto = 63.2 - (24.7 + 1.54 * diametro);
        } else if (animal === 'Pastor Alemao') {
            resultadoDiasParto = 38.65 - (12.86 * diametro);
        } else if (animal === 'Maine Coon') {
            resultadoDiasParto = (-1.18 * diametro) + 49.3; // Convertendo cm para mm
        }
    } else {
        resultadoIdadeGestacional = 'Indefinido';
        resultadoDiasParto = 0;
    }

    // Exibindo os resultados na página
    document.getElementById('resultado-idade-gestacional').innerText = 'Idade Gestacional: ' + (typeof resultadoIdadeGestacional === 'number' ? resultadoIdadeGestacional.toFixed(2) + ' cm' : resultadoIdadeGestacional);
    document.getElementById('resultado-dias-parto').innerText = 'Dias para o Parto: ' + resultadoDiasParto.toFixed(2) + ' mm';
}

// Event listeners permanecem inalterados
document.addEventListener("DOMContentLoaded", function () {
    var diametroInput = document.getElementById('diametro');
    var diagnostico = document.getElementById('diagnostico');
    diametroInput.addEventListener('input', function () {
        diagnostico.innerText = "";
    });

    document.getElementById('periodo').addEventListener('change', function () {
        var periodo = this.value;
        diagnostico.innerText = "";
        if (periodo === 'antes') {
            diametroInput.placeholder = "Insira o diâmetro da vesícula gestacional em cm";
        } else if (periodo === 'depois') {
            diametroInput.placeholder = "Insira o diâmetro biparietal em cm";
        } else {
            diametroInput.placeholder = "";
        }
    });
});

(function () {
    // Código para Gestação de Cadelas e Gatas aqui
    console.log("Página de Gestação de Cadelas e Gatas");
})();
