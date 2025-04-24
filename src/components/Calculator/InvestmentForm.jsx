import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import CurrencyInput from '../UI/CurrencyInput';

const InvestmentForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    initialAmount: 1000,
    monthlyContribution: 100,
    interestRate: 5,
    timeInYears: 10,
    estimatedInflation: 4
  });

  const [errors, setErrors] = useState({});

  const MAX_VALUES = {
    initialAmount: 100000000000, // 100 bilhões
    monthlyContribution: 100000000000, // 100 bilhões
    interestRate: 1000, // 1000%
    estimatedInflation: 100000 // 100.000%
  };

  const validateField = (name, value) => {
    if (name in MAX_VALUES && value > MAX_VALUES[name]) {
      return `O valor máximo permitido é ${new Intl.NumberFormat('pt-BR').format(MAX_VALUES[name])}${name.includes('Rate') || name.includes('Inflation') ? '%' : ''}`;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Verifica os valores máximos
    const errorMessage = validateField(name, value);
    
    if (errorMessage) {
      setErrors(prev => ({ ...prev, [name]: errorMessage }));
      // Define o valor máximo permitido
      setFormData(prev => ({ ...prev, [name]: MAX_VALUES[name] }));
    } else {
      // Limpa o erro se estiver dentro dos limites
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Valida todos os campos antes de submeter
    let isValid = true;
    const newErrors = {};
    
    Object.entries(formData).forEach(([name, value]) => {
      const errorMessage = validateField(name, value);
      if (errorMessage) {
        newErrors[name] = errorMessage;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    if (isValid) {
      onCalculate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Dados do Investimento</h2>
      
      <CurrencyInput
        label="Valor inicial"
        name="initialAmount"
        value={formData.initialAmount}
        onChange={handleChange}
        error={errors.initialAmount}
        max={MAX_VALUES.initialAmount}
        required
      />
      
      <CurrencyInput
        label="Aporte mensal"
        name="monthlyContribution"
        value={formData.monthlyContribution}
        onChange={handleChange}
        error={errors.monthlyContribution}
        max={MAX_VALUES.monthlyContribution}
        required
      />
      
      <Input
        label="Taxa de juros anual (%)"
        type="number"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleChange}
        min="0"
        max="1000"
        step="0.1"
        error={errors.interestRate}
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
        max="100000"
        step="0.1"
        error={errors.estimatedInflation}
        required
      />
      
      <div className="pt-2">
        <Button type="submit">Calcular Investimento</Button>
      </div>
    </form>
  );
};

export default InvestmentForm;