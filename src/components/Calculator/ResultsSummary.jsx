import React from 'react';
import { formatCurrencyBRL } from '../../utils/formatCurrency';

const ResultsSummary = ({ results }) => {
  const {
    initialInvestment,
    totalContributions,
    interestEarned,
    totalAmount,
    inflationAdjustedAmount,
    purchasingPowerLoss,
    lastMonthReturn,
    averageMonthlyReturn,
    irAliquot,
    netInterestEarned,
    netTotalAmount,
    effectiveAnnualRate,
    formData
  } = results;

  const netAnnualRate = parseFloat(formData.interestRate) * (1 - irAliquot);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Resultados</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Valor Total</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrencyBRL(totalAmount)}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-800">Rendimentos</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrencyBRL(interestEarned)}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-medium text-purple-800">Rendimento Mensal Final</h3>
          <p className="text-xl font-bold text-purple-600">{formatCurrencyBRL(lastMonthReturn)}</p>
          <p className="text-sm text-purple-600 mt-1">
            No último mês do período de investimento
          </p>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-medium text-indigo-800">Média de Rendimento Mensal</h3>
          <p className="text-xl font-bold text-indigo-600">{formatCurrencyBRL(averageMonthlyReturn)}</p>
          <p className="text-sm text-indigo-600 mt-1">
            Média ao longo de todo o período
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800">Investimento Inicial</h3>
          <p className="text-xl font-bold text-gray-600">{formatCurrencyBRL(initialInvestment)}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800">Aportes Totais</h3>
          <p className="text-xl font-bold text-gray-600">{formatCurrencyBRL(totalContributions)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-medium text-red-800">Alíquota IR</h3>
          <p className="text-xl font-bold text-red-600">{(irAliquot * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-medium text-green-800">Juros Líquidos</h3>
          <p className="text-xl font-bold text-green-600">{formatCurrencyBRL(netInterestEarned)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Total após IR</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrencyBRL(netTotalAmount)}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-medium text-yellow-800">Taxa anual líquida (após IR)</h3>
          <p className="text-xl font-bold text-yellow-600">{netAnnualRate.toFixed(2)}%</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold mb-2">Considerando a inflação de {formData.estimatedInflation}% ao ano:</h3>
        
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-yellow-800">Valor ajustado pela inflação</h4>
          <p className="text-xl font-bold text-yellow-600">{formatCurrencyBRL(inflationAdjustedAmount)}</p>
          <p className="text-sm text-yellow-700 mt-1">
            Poder de compra equivalente a {formatCurrencyBRL(inflationAdjustedAmount)} hoje
          </p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-medium text-red-800">Perda de poder de compra</h4>
          <p className="text-xl font-bold text-red-600">{formatCurrencyBRL(purchasingPowerLoss)}</p>
          <p className="text-sm text-red-700 mt-1">
            {((purchasingPowerLoss / totalAmount) * 100).toFixed(1)}% do valor foi perdido para a inflação
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;