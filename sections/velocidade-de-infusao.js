        function calcularVelocidadeInfusao() {
            var peso = parseFloat(document.getElementById('pesoAnimalInput').value);
            var volumeTotal = parseFloat(document.getElementById('volumeTotalInput').value);
            var horasIniciaisInput = document.getElementById('horasIniciaisInput').value;
            var horasIniciais = calcularHoras(horasIniciaisInput);
            var velocidadeInicial = parseFloat(document.getElementById('velocidadeInicialInput').value);
            var tipoEquipo = document.getElementById('tipoEquipoSelect').value;

            // Verifica se todos os campos foram preenchidos corretamente
            if (isNaN(peso) || isNaN(volumeTotal) || isNaN(horasIniciais) || isNaN(velocidadeInicial)) {
                alert("Preencha todos os campos corretamente.");
                return;
            }

            // Cálculos
            var volumeInicial = velocidadeInicial * peso * horasIniciais;
            var horasRestantes = 24 - horasIniciais;
            var volumeRestante = volumeTotal - volumeInicial;
            var velocidadeRestante = volumeRestante / horasRestantes;
            var tipoEquipoFactor = (tipoEquipo === 'microgotas') ? 60 : 20;
            var taxaInfusaoInicial = (volumeInicial * tipoEquipoFactor) / horasIniciais / 60;
            var taxaInfusaoInicial10Segundos = (taxaInfusaoInicial / 60) * 10;
            var taxaInfusaoFinal = (volumeRestante * tipoEquipoFactor) / horasRestantes / 60;
            var taxaInfusaoFinal10Segundos = (taxaInfusaoFinal / 60) * 10;

            // Exibe os resultados
            document.getElementById('resultadoVolumeInicial').innerText = Math.floor(volumeInicial) + " mL";
            document.getElementById('resultadoHorasRestantes').innerText = formatarHoras(horasRestantes) + " hrs";
            document.getElementById('resultadoVolumeRestante').innerText = Math.floor(volumeRestante) + " mL";
            document.getElementById('resultadoVelocidadeRestante').innerText = Math.floor(velocidadeRestante) + " mL/hr";
            document.getElementById('resultadoTaxaInfusaoInicial').innerText = Math.floor(taxaInfusaoInicial) + " gotas/min";
            document.getElementById('resultadoTaxaInfusaoInicial10Segundos').innerText = Math.floor(taxaInfusaoInicial10Segundos) + " gotas em 10 segundos";
            document.getElementById('resultadoTaxaInfusaoFinal').innerText = Math.floor(taxaInfusaoFinal) + " gotas/min";
            document.getElementById('resultadoTaxaInfusaoFinal10Segundos').innerText = Math.floor(taxaInfusaoFinal10Segundos) + " gotas em 10 segundos";
        }

        function limparCamposVelocidadeInfusao() {
            document.getElementById('pesoAnimalInput').value = '';
            document.getElementById('volumeTotalInput').value = '';
            document.getElementById('horasIniciaisInput').value = '';
            document.getElementById('velocidadeInicialInput').value = '';
            document.getElementById('tipoEquipoSelect').value = 'microgotas';

            // Limpa os resultados
            document.getElementById('resultadoVolumeInicial').innerText = '';
            document.getElementById('resultadoHorasRestantes').innerText = '';
            document.getElementById('resultadoVolumeRestante').innerText = '';
            document.getElementById('resultadoVelocidadeRestante').innerText = '';
            document.getElementById('resultadoTaxaInfusaoInicial').innerText = '';
            document.getElementById('resultadoTaxaInfusaoInicial10Segundos').innerText = '';
            document.getElementById('resultadoTaxaInfusaoFinal').innerText = '';
            document.getElementById('resultadoTaxaInfusaoFinal10Segundos').innerText = '';
        }

        function calcularHoras(horasInput) {
            // Divide a entrada em horas e minutos
            var partes = horasInput.split(":");
            var horas = parseInt(partes[0], 10) || 0;
            var minutos = parseInt(partes[1], 10) || 0;

            // Calcula o total de horas em números decimais
            var horasTotais = horas + minutos / 60;
            return horasTotais;
        }

        function formatarHoras(horasDecimais) {
            // Converte horas decimais em formato HH:mm
            var horasInteiras = Math.floor(horasDecimais);
            var minutos = Math.round((horasDecimais - horasInteiras) * 60);
            return horasInteiras + ":" + (minutos < 10 ? "0" : "") + minutos;
        }