// Gerador de Planilha Excel para Análise Uber Esdra
// Usando SheetJS para criar arquivo .xlsx

const XLSX = require('xlsx');

// Dados da análise
const analise = {
    horas: { semanais: 30, mensais: 129.9 },
    quilometragem: { semanal: 300, mensal: 1299 },
    receita: {
        bruta: 4676.40,
        comissaoUber: 1169.10,
        liquida: 3507.30
    },
    custos: {
        combustivel: 974.25,
        manutencao: 194.85,
        alimentacao: 541.25,
        seguro: 390.00,
        total: 2100.35
    },
    lucro: {
        bruto: 1406.95,
        irAdicional: 0,
        liquido: 1406.95
    }
};

// Criar workbook
const wb = XLSX.utils.book_new();

// 1. Resumo Executivo
const resumoData = [
    ['ANÁLISE FINANCEIRA UBER - SENHOR ESDRA', '', ''],
    ['', '', ''],
    ['RESUMO EXECUTIVO', '', ''],
    ['', '', ''],
    ['Métrica', 'Valor', 'Observação'],
    ['Horas mensais', '129.9h', '30h/semana × 4.33 semanas'],
    ['Quilometragem mensal', '1,299 km', '10 km/h × 129.9h'],
    ['Receita bruta mensal', 'R$ 4,676.40', 'R$ 36/h × 129.9h'],
    ['Comissão Uber (25%)', 'R$ 1,169.10', 'Sobre receita bruta'],
    ['Custos operacionais', 'R$ 2,100.35', 'Todos os custos variáveis'],
    ['Lucro líquido mensal', 'R$ 1,406.95', 'Após todos os custos e IR'],
    ['Meta estabelecida', 'R$ 2,500.00', 'Meta não atingida'],
    ['Diferença', '-R$ 1,093.05', 'Falta 43.7% para meta'],
    ['', '', ''],
    ['VIABILIDADE', 'NÃO ATINGE META', 'Requer ajustes no plano']
];

const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
XLSX.utils.book_append_sheet(wb, wsResumo, "Resumo Executivo");

// 2. Detalhamento de Custos
const custosData = [
    ['DETALHAMENTO DE CUSTOS MENSAIS', '', '', ''],
    ['', '', '', ''],
    ['Tipo de Custo', 'Base de Cálculo', 'Valor Unitário', 'Total Mensal'],
    ['', '', '', ''],
    ['COMBUSTÍVEL', '', '', ''],
    ['Quilometragem mensal', '1,299 km', 'R$ 0.75/km', 'R$ 974.25'],
    ['Tipo: Etanol', '6 km/l', 'R$ 4.50/l', ''],
    ['', '', '', ''],
    ['MANUTENÇÃO', '', '', ''],
    ['Quilometragem mensal', '1,299 km', 'R$ 0.15/km', 'R$ 194.85'],
    ['', '', '', ''],
    ['ALIMENTAÇÃO', '', '', ''],
    ['Dias úteis', '21.67 dias', 'R$ 25.00/dia', 'R$ 541.25'],
    ['', '', '', ''],
    ['SEGURO DO VEÍCULO', '', '', ''],
    ['Mensalidade fixa', '1 mês', 'R$ 390.00', 'R$ 390.00'],
    ['', '', '', ''],
    ['TOTAL DE CUSTOS', '', '', 'R$ 2,100.35']
];

const wsCustos = XLSX.utils.aoa_to_sheet(custosData);
XLSX.utils.book_append_sheet(wb, wsCustos, "Custos Detalhados");

// 3. Projeção de Receitas
const receitasData = [
    ['PROJEÇÃO DE RECEITAS MENSAIS', '', '', '', ''],
    ['', '', '', '', ''],
    ['Dia da Semana', 'Horas', 'Receita Bruta', 'Comissão Uber', 'Receita Líquida'],
    ['', '', '', '', ''],
    ['Segunda-feira', 4, 'R$ 144.00', 'R$ 36.00', 'R$ 108.00'],
    ['Terça-feira', 4, 'R$ 144.00', 'R$ 36.00', 'R$ 108.00'],
    ['Quarta-feira', 4, 'R$ 144.00', 'R$ 36.00', 'R$ 108.00'],
    ['Quinta-feira', 4, 'R$ 144.00', 'R$ 36.00', 'R$ 108.00'],
    ['Sexta-feira', 4, 'R$ 144.00', 'R$ 36.00', 'R$ 108.00'],
    ['Sábado', 0, 'R$ 0.00', 'R$ 0.00', 'R$ 0.00'],
    ['Domingo', 10, 'R$ 360.00', 'R$ 90.00', 'R$ 270.00'],
    ['', '', '', '', ''],
    ['TOTAL SEMANAL', 30, 'R$ 1,080.00', 'R$ 270.00', 'R$ 810.00'],
    ['TOTAL MENSAL', 129.9, 'R$ 4,676.40', 'R$ 1,169.10', 'R$ 3,507.30']
];

const wsReceitas = XLSX.utils.aoa_to_sheet(receitasData);
XLSX.utils.book_append_sheet(wb, wsReceitas, "Projeção de Receitas");

// 4. Cenários de Análise
const cenariosData = [
    ['ANÁLISE DE CENÁRIOS', '', '', '', ''],
    ['', '', '', '', ''],
    ['Cenário', 'Receita Bruta', 'Custos Totais', 'Lucro Líquido', 'Atinge Meta?'],
    ['', '', '', '', ''],
    ['Conservador (-20%)', 'R$ 3,741.12', 'R$ 2,100.35', 'R$ 705.49', 'NÃO (-71.8%)'],
    ['Realista', 'R$ 4,676.40', 'R$ 2,100.35', 'R$ 1,406.95', 'NÃO (-43.7%)'],
    ['Otimista (+20%)', 'R$ 5,611.68', 'R$ 2,100.35', 'R$ 2,108.41', 'NÃO (-15.7%)'],
    ['', '', '', '', ''],
    ['META', 'R$ 4,600.35', 'R$ 2,100.35', 'R$ 2,500.00', '100%']
];

const wsCenarios = XLSX.utils.aoa_to_sheet(cenariosData);
XLSX.utils.book_append_sheet(wb, wsCenarios, "Cenários de Análise");

// 5. Break-even Analysis
const breakEvenData = [
    ['ANÁLISE DE BREAK-EVEN', '', '', ''],
    ['', '', '', ''],
    ['Métrica', 'Valor Atual', 'Necessário para Meta', 'Diferença'],
    ['', '', '', ''],
    ['Horas mensais', '129.9h', '231.0h', '+101.1h (+77.8%)'],
    ['Receita por hora', 'R$ 36.00', 'R$ 64.00', '+R$ 28.00 (+77.8%)'],
    ['Dias de trabalho', '6 dias/semana', '10.7 dias/semana', '+4.7 dias'],
    ['Quilometragem mensal', '1,299 km', '2,310 km', '+1,011 km (+77.8%)'],
    ['', '', '', ''],
    ['CONCLUSÃO', 'Necessário aumentar em 77.8%', 'para atingir meta', 'R$ 2,500.00']
];

const wsBreakEven = XLSX.utils.aoa_to_sheet(breakEvenData);
XLSX.utils.book_append_sheet(wb, wsBreakEven, "Break-even Analysis");

// 6. Recomendações
const recomendacoesData = [
    ['RECOMENDAÇÕES PARA ATINGIR A META', '', '', ''],
    ['', '', '', ''],
    ['Opção', 'Descrição', 'Impacto Estimado', 'Viabilidade'],
    ['', '', '', ''],
    ['1. Aumentar horas', 'Trabalhar 2h extras diárias', '+R$ 1,093.05', 'Difícil (CLT)'],
    ['2. Melhorar eficiência', 'Horários de pico + áreas nobres', '+R$ 500-800', 'Moderada'],
    ['3. Reduzir custos', 'Trocar para gasolina + manutenção preventiva', '-R$ 200-300', 'Fácil'],
    ['4. Combinar estratégias', 'Eficiência + redução de custos', '+R$ 700-1100', 'Moderada'],
    ['5. Revisar meta', 'Meta ajustada para R$ 1,400', '100% atingido', 'Fácil'],
    ['', '', '', ''],
    ['RECOMENDAÇÃO FINAL', 'Combinar opções 2, 3 e 5', 'Meta realista', 'Alta viabilidade']
];

const wsRecomendacoes = XLSX.utils.aoa_to_sheet(recomendacoesData);
XLSX.utils.book_append_sheet(wb, wsRecomendacoes, "Recomendações");

// Configurar largura das colunas
const colWidths = [
    { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }
];

[wsResumo, wsCustos, wsReceitas, wsCenarios, wsBreakEven, wsRecomendacoes].forEach(ws => {
    ws['!cols'] = colWidths;
});

// Salvar arquivo
XLSX.writeFile(wb, 'Planilha_Esdras_Uber.xlsx');
