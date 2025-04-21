import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import ResultsSummary from './ResultsSummary';
import GrowthChart from '../Charts/GrowthChart';
import InflationChart from '../Charts/InflationChart';
import InvestmentBreakdownChart from '../Charts/InvestmentBreakdownChart';
import MonthlyReturnChart from '../Charts/MonthlyReturnChart';
import AdBanner from '../Ads/AdBanner';
import { calculateInvestment } from '../../utils/calculateInvestment';
import { calculateInflationImpact } from '../../utils/calculateInflationImpact';
import Card from '../UI/Card';

const Calculator = () => {
  const [results, setResults] = useState(null);

  const handleCalculate = (formData) => {
    // Calcular investimento
    const investmentResults = calculateInvestment(
      parseFloat(formData.initialAmount),
      parseFloat(formData.monthlyContribution),
      parseFloat(formData.interestRate) / 100,
      parseInt(formData.timeInYears)
    );

    // Calcular impacto da inflação
    const inflationImpact = calculateInflationImpact(
      investmentResults.totalAmount,
      parseFloat(formData.estimatedInflation) / 100,
      parseInt(formData.timeInYears)
    );

    setResults({
      ...investmentResults,
      ...inflationImpact,
      formData
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <InvestmentForm onCalculate={handleCalculate} />
        </Card>

        {results && (
          <Card>
            <ResultsSummary results={results} />
          </Card>
        )}
      </div>

      {/* Banner de anúncio após o formulário/resultados */}
      <AdBanner adSlot="1234567890" />

      {results && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Crescimento do Investimento</h3>
              <GrowthChart results={results} />
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold mb-4">Rendimento Mensal</h3>
              <MonthlyReturnChart results={results} />
            </Card>
          </div>
          
          {/* Banner de anúncio entre os gráficos */}
          <AdBanner adSlot="0987654321" />
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Impacto da Inflação</h3>
              <InflationChart results={results} />
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">Composição do Investimento</h3>
              <InvestmentBreakdownChart results={results} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;