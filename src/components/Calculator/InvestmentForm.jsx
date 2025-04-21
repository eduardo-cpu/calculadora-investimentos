import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';

const InvestmentForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    initialAmount: 1000,
    monthlyContribution: 100,
    interestRate: 5,
    timeInYears: 10,
    estimatedInflation: 4
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Dados do Investimento</h2>
      
      <Input
        label="Valor inicial (R$)"
        type="number"
        name="initialAmount"
        value={formData.initialAmount}
        onChange={handleChange}
        min="0"
        step="100"
        required
      />
      
      <Input
        label="Aporte mensal (R$)"
        type="number"
        name="monthlyContribution"
        value={formData.monthlyContribution}
        onChange={handleChange}
        min="0"
        step="10"
        required
      />
      
      <Input
        label="Taxa de juros anual (%)"
        type="number"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleChange}
        min="0"
        step="0.1"
        required
      />
      
      <Input
        label="Tempo (anos)"
        type="number"
        name="timeInYears"
        value={formData.timeInYears}
        onChange={handleChange}
        min="1"
        max="50"
        step="1"
        required
      />
      
      <Input
        label="Estimativa de inflação anual (%)"
        type="number"
        name="estimatedInflation"
        value={formData.estimatedInflation}
        onChange={handleChange}
        min="0"
        step="0.1"
        required
      />
      
      <div className="pt-2">
        <Button type="submit">Calcular Investimento</Button>
      </div>
    </form>
  );
};

export default InvestmentForm;