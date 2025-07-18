// Análise Financeira Completa - Uber Esdra
// Volkswagen T-Cross 1.0 Turbo 2021 - Vespasiano MG

const PARAMETROS = {
    // Dados do usuário
    nome: "Senhor Esdra",
    localizacao: "Vespasiano - MG",
    veiculo: "Volkswagen T-Cross 1.0 Turbo 2021",
    
    // Horários de trabalho
    horarios: {
        segunda: { inicio: "17:30", fim: "21:30", horas: 4 },
        terca: { inicio: "17:30", fim: "21:30", horas: 4 },
        quarta: { inicio: "17:30", fim: "21:30", horas: 4 },
        quinta: { inicio: "17:30", fim: "21:30", horas: 4 },
        sexta: { inicio: "17:30", fim: "21:30", horas: 4 },
        sabado: { horas: 0 },
        domingo: { inicio: "08:00", fim: "18:00", horas: 10 }
    },
    
    // Parâmetros financeiros
    rendimentoBrutoPorHora: 36.00,
    taxaUber: 0.25,
    seguroMensal: 390.00,
    alimentacaoPorDia: 25.00,
    metaLiquida: 2500.00,
    
    // Parâmetros do veículo
    consumo: {
        etanol: { kmPorLitro: 6, precoPorLitro: 4.50 },
        gasolina: { kmPorLitro: 10, precoPorLitro: 6.10 }
    },
    kmPorHora: 10,
    manutencaoPorKm: 0.15,
    
    // Tabela IR 2025
    tabelaIR: [
        { limite: 2259.20, aliquota: 0, deducao: 0 },
        { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
        { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
        { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
        { limite: Infinity, aliquota: 0.275, deducao: 896.00 }
    ]
};

// Cálculos principais
function calcularAnaliseCompleta() {
    // 1. Horas totais
    const horasSemanais = Object.values(PARAMETROS.horarios).reduce((total, dia) => total + dia.horas, 0);
    const horasMensais = horasSemanais * 4.33; // Média de semanas por mês
    
    // 2. Quilometragem
    const kmSemanal = horasSemanais * PARAMETROS.kmPorHora;
    const kmMensal = kmSemanal * 4.33;
    
    // 3. Cálculo de combustível mais econômico
    const custoPorKmEtanol = PARAMETROS.consumo.etanol.precoPorLitro / PARAMETROS.consumo.etanol.kmPorLitro;
    const custoPorKmGasolina = PARAMETROS.consumo.gasolina.precoPorLitro / PARAMETROS.consumo.gasolina.kmPorLitro;
    
    const combustivelEscolhido = custoPorKmEtanol < custoPorKmGasolina ? 'etanol' : 'gasolina';
    const custoPorKmCombustivel = Math.min(custoPorKmEtanol, custoPorKmGasolina);
    
    // 4. Receita bruta
    const receitaBrutaMensal = horasMensais * PARAMETROS.rendimentoBrutoPorHora;
    
    // 5. Comissão Uber
    const comissaoUber = receitaBrutaMensal * PARAMETROS.taxaUber;
    
    // 6. Custos variáveis
    const custoCombustivelMensal = kmMensal * custoPorKmCombustivel;
    const custoManutencaoMensal = kmMensal * PARAMETROS.manutencaoPorKm;
    const custoAlimentacaoMensal = Object.values(PARAMETROS.horarios)
        .filter(dia => dia.horas > 0)
        .length * 4.33 * PARAMETROS.alimentacaoPorDia;
    
    // 7. Custos fixos
    const custoSeguro = PARAMETROS.seguroMensal;
    
    // 8. Custos totais
    const custosTotais = custoCombustivelMensal + custoManutencaoMensal + custoAlimentacaoMensal + custoSeguro;
    
    // 9. Lucro bruto antes de IR
    const lucroBruto = receitaBrutaMensal - comissaoUber - custosTotais;
    
    // 10. Cálculo do IR
    const salarioCLT = 2700.00;
    const rendaTotal = salarioCLT + lucroBruto;
    
    let impostoDevido = 0;
    for (const faixa of PARAMETROS.tabelaIR) {
        if (rendaTotal <= faixa.limite) {
            impostoDevido = rendaTotal * faixa.aliquota - faixa.deducao;
            break;
        }
    }
    
    // IR já retido no CLT (estimado)
    const irCLT = salarioCLT * 0.075 - 169.44; // Estimativa para faixa salarial
    const irAdicional = Math.max(0, impostoDevido - irCLT);
    
    // 11. Lucro líquido final
    const lucroLiquido = lucroBruto - irAdicional;
    
    // 12. Análise de viabilidade
    const atingeMeta = lucroLiquido >= PARAMETROS.metaLiquida;
    const diferencaMeta = lucroLiquido - PARAMETROS.metaLiquida;
    
    // 13. Cenários
    const cenarios = {
        conservador: {
            receita: receitaBrutaMensal * 0.8,
            lucroLiquido: (receitaBrutaMensal * 0.8 - comissaoUber - custosTotais) - irAdicional
        },
        realista: {
            receita: receitaBrutaMensal,
            lucroLiquido: lucroLiquido
        },
        otimista: {
            receita: receitaBrutaMensal * 1.2,
            lucroLiquido: (receitaBrutaMensal * 1.2 - comissaoUber - custosTotais) - irAdicional
        }
    };
    
    return {
        horas: { semanais: horasSemanais, mensais: horasMensais },
        quilometragem: { semanal: kmSemanal, mensal: kmMensal },
        combustivel: {
            escolhido: combustivelEscolhido,
            custoPorKm: custoPorKmCombustivel,
            custoMensal: custoCombustivelMensal
        },
        receita: {
            bruta: receitaBrutaMensal,
            comissaoUber: comissaoUber,
            liquida: receitaBrutaMensal - comissaoUber
        },
        custos: {
            combustivel: custoCombustivelMensal,
            manutencao: custoManutencaoMensal,
            alimentacao: custoAlimentacaoMensal,
            seguro: custoSeguro,
            total: custosTotais
        },
        lucro: {
            bruto: lucroBruto,
            irAdicional: irAdicional,
            liquido: lucroLiquido
        },
        viabilidade: {
            atingeMeta: atingeMeta,
            diferencaMeta: diferencaMeta,
            percentualMeta: (lucroLiquido / PARAMETROS.metaLiquida) * 100
        },
        cenarios: cenarios,
        parametros: PARAMETROS
    };
}

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcularAnaliseCompleta, PARAMETROS };
}
