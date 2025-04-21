import { useState } from 'react';
import { calculateInvestment } from '../utils/calculateInvestment';
import { calculateInflationImpact } from '../utils/calculateInflationImpact';
import { getAverageInflationRate, getPurchasingPowerExamples } from '../services/inflationData';

const useInvestmentCalculator = () => {
  const [formData, setFormData] = useState({
    initialAmount: 1000,
    monthlyContribution: 100,
    interestRate: 5,
    timeInYears: 10,
    estimatedInflation: getAverageInflationRate()
  });

  const [results, setResults] = useState(null);
  const [examples, setExamples] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateResults = () => {
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

    const calculatedResults = {
      ...investmentResults,
      ...inflationImpact,
      formData
    };

    setResults(calculatedResults);

    // Calcular exemplos de poder de compra com o valor ajustado pela inflação
    const purchasingExamples = getPurchasingPowerExamples(inflationImpact.inflationAdjustedAmount);
    setExamples(purchasingExamples);

    return calculatedResults;
  };

  return {
    formData,
    results,
    examples,
    handleChange,
    calculateResults
  };
};

export default useInvestmentCalculator;