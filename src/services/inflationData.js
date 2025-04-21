/**
 * Dados históricos de inflação no Brasil (IPCA) para os últimos anos
 * Fonte: IBGE
 */
export const historicalInflationData = [
  { year: 2015, rate: 10.67 },
  { year: 2016, rate: 6.29 },
  { year: 2017, rate: 2.95 },
  { year: 2018, rate: 3.75 },
  { year: 2019, rate: 4.31 },
  { year: 2020, rate: 4.52 },
  { year: 2021, rate: 10.06 },
  { year: 2022, rate: 5.79 },
  { year: 2023, rate: 4.62 },
  { year: 2024, rate: 4.10 } // Estimativa
];

/**
 * Calcula a média da inflação dos últimos anos
 * @param {number} years - Quantidade de anos para calcular a média
 * @returns {number} - Taxa média de inflação
 */
export const getAverageInflationRate = (years = 5) => {
  const recentData = historicalInflationData.slice(-years);
  const sum = recentData.reduce((acc, curr) => acc + curr.rate, 0);
  return sum / recentData.length;
};

/**
 * Retorna exemplos do que poderia ser comprado com determinado valor
 * @param {number} amount - Valor em reais
 * @returns {Array} - Lista de itens que poderiam ser comprados
 */
export const getPurchasingPowerExamples = (amount) => {
  // Alguns exemplos básicos de itens com seus preços médios
  const items = [
    { name: 'Smartphone intermediário', price: 1500 },
    { name: 'Notebook básico', price: 3000 },
    { name: 'Carro popular usado', price: 30000 },
    { name: 'Carro popular novo', price: 60000 },
    { name: 'Apartamento pequeno em cidade média', price: 200000 },
    { name: 'Apartamento em capital', price: 500000 },
    { name: 'Casa em condomínio fechado', price: 800000 },
  ];

  return items
    .filter(item => item.price <= amount)
    .map(item => ({
      ...item,
      quantity: Math.floor(amount / item.price)
    }));
};