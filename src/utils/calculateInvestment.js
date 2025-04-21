/**
 * Calcula os resultados de um investimento ao longo do tempo
 * @param {number} initialAmount - Investimento inicial
 * @param {number} monthlyContribution - Aporte mensal
 * @param {number} annualInterestRate - Taxa de juros anual (em decimal, ex: 0.05 para 5%)
 * @param {number} timeInYears - Período do investimento em anos
 * @returns {Object} - Objeto com os resultados do cálculo
 */
export const calculateInvestment = (
  initialAmount,
  monthlyContribution,
  annualInterestRate,
  timeInYears
) => {
  const monthlyInterestRate = annualInterestRate / 12;
  const totalMonths = timeInYears * 12;
  
  let currentBalance = initialAmount;
  let totalContributions = initialAmount;
  
  // Array para armazenar o histórico mensal para os gráficos
  const monthlyData = [{
    month: 0,
    balance: initialAmount,
    contributions: initialAmount,
    interest: 0,
    monthlyReturn: 0
  }];
  
  // Array para armazenar o histórico anual para os gráficos
  const yearlyData = [{
    year: 0,
    balance: initialAmount,
    contributions: initialAmount,
    interest: 0
  }];
  
  // Para armazenar informações sobre o último mês
  let lastMonthBalance = initialAmount;
  let lastMonthInterest = 0;
  
  // Calcular o crescimento do investimento mês a mês
  for (let month = 1; month <= totalMonths; month++) {
    // Adiciona o aporte mensal
    currentBalance += monthlyContribution;
    totalContributions += monthlyContribution;
    
    // Calcula o rendimento do mês
    const monthlyInterest = currentBalance * monthlyInterestRate;
    
    // Adiciona o rendimento ao saldo
    currentBalance += monthlyInterest;
    
    // Armazena o rendimento mensal
    lastMonthBalance = currentBalance;
    lastMonthInterest = monthlyInterest;
    
    // Registra os dados do mês
    monthlyData.push({
      month,
      balance: currentBalance,
      contributions: totalContributions,
      interest: currentBalance - totalContributions,
      monthlyReturn: monthlyInterest
    });
    
    // Registra os dados do ano no final de cada ano
    if (month % 12 === 0) {
      const year = month / 12;
      yearlyData.push({
        year,
        balance: currentBalance,
        contributions: totalContributions,
        interest: currentBalance - totalContributions
      });
    }
  }
  
  return {
    initialInvestment: initialAmount,
    totalContributions: totalContributions,
    interestEarned: currentBalance - totalContributions,
    totalAmount: currentBalance,
    monthlyData,
    yearlyData,
    lastMonthReturn: lastMonthInterest,
    averageMonthlyReturn: (currentBalance - totalContributions) / totalMonths
  };
};