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

  // Calcular imposto de renda sobre rendimentos
  const totalInterest = currentBalance - totalContributions;
  let irAliquot;
  if (totalMonths <= 6) irAliquot = 0.225;
  else if (totalMonths <= 12) irAliquot = 0.20;
  else if (totalMonths <= 24) irAliquot = 0.175;
  else irAliquot = 0.15;

  const netInterestEarned = totalInterest * (1 - irAliquot);
  const netTotalAmount = totalContributions + netInterestEarned;
  const effectiveAnnualRate = Math.pow(netTotalAmount / initialAmount, 1 / timeInYears) - 1;

  return {
    initialInvestment: initialAmount,
    totalContributions: totalContributions,
    interestEarned: totalInterest,
    irAliquot,
    netInterestEarned,
    totalAmount: currentBalance,
    netTotalAmount,
    effectiveAnnualRate,
    monthlyData,
    yearlyData,
    lastMonthReturn: lastMonthInterest,
    averageMonthlyReturn: totalInterest / totalMonths
  };
};