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
    estimatedInflation: 4,
    timeUnit: 'years' // Nova propriedade para controlar a unidade de tempo
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
      // Converte o tempo em meses se necessário antes de enviar para o cálculo
      const calculationData = { ...formData };
      
      // Se a unidade for meses, converte para anos para o cálculo
      if (formData.timeUnit === 'months') {
        calculationData.timeInYears = parseFloat((formData.timeInYears / 12).toFixed(2));
        calculationData.originalTimeInMonths = parseFloat(formData.timeInYears); // Preserva o valor original em meses
      }
      
      onCalculate(calculationData);
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
      
      <div className="flex gap-4 items-start">
        <div className="flex-grow">
          <Input
            label={`Tempo (${formData.timeUnit === 'years' ? 'anos' : 'meses'})`}
            type="number"
            name="timeInYears"
            value={formData.timeInYears}
            onChange={handleChange}
            min={formData.timeUnit === 'years' ? '1' : '1'}
            max={formData.timeUnit === 'years' ? '50' : '600'} // 50 anos = 600 meses
            step="1"
            required
          />
        </div>
        <div className="mt-8">
          <select
            name="timeUnit"
            value={formData.timeUnit}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="years">Anos</option>
            <option value="months">Meses</option>
          </select>
        </div>
      </div>
      
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