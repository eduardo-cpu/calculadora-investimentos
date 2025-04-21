/**
 * Calcula o impacto da inflação sobre o valor final de um investimento
 * @param {number} futureAmount - Valor final do investimento
 * @param {number} annualInflationRate - Taxa de inflação anual (em decimal, ex: 0.04 para 4%)
 * @param {number} timeInYears - Período do investimento em anos
 * @returns {Object} - Objeto com os resultados do cálculo
 */
export const calculateInflationImpact = (
  futureAmount,
  annualInflationRate,
  timeInYears
) => {
  // Calcula o valor presente (poder de compra) do valor futuro considerando a inflação
  const inflationAdjustedAmount = futureAmount / Math.pow(1 + annualInflationRate, timeInYears);
  
  // Calcula a perda de poder de compra devido à inflação
  const purchasingPowerLoss = futureAmount - inflationAdjustedAmount;
  
  // Calcula o poder de compra ao longo dos anos
  const yearlyPurchasingPower = [];
  for (let year = 0; year <= timeInYears; year++) {
    // Para cada ano, calculate quanto vale o valor final em termos de poder de compra daquele ano
    const adjustedValue = futureAmount / Math.pow(1 + annualInflationRate, timeInYears - year);
    yearlyPurchasingPower.push({
      year,
      nominalValue: futureAmount,
      realValue: adjustedValue,
      inflationImpact: futureAmount - adjustedValue
    });
  }
  
  return {
    inflationAdjustedAmount,
    purchasingPowerLoss,
    yearlyPurchasingPower
  };
};

const calculateRealValue = (futureValue, averageInflationRate, years) => {
    const realValue = futureValue / Math.pow((1 + averageInflationRate / 100), years);
    return realValue;
};

export { calculateRealValue };