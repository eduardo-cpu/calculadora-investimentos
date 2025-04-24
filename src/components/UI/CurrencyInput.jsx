import React, { useState, useEffect } from 'react';
import { formatCurrencyInput, parseCurrencyBRL } from '../../utils/formatCurrency';

const CurrencyInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '0,00', 
  className = '',
  error,
  max,
  ...rest 
}) => {
  const [displayValue, setDisplayValue] = useState('');
  
  // Atualiza o valor de exibição quando o valor prop é alterado externamente
  useEffect(() => {
    if (typeof value === 'number') {
      setDisplayValue(formatCurrencyInput(value.toString().replace('.', ',')));
    }
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrencyInput(inputValue);
    
    // Converte o valor formatado para número
    let numericValue = parseCurrencyBRL(formattedValue);
    
    // Aplica o limite máximo se fornecido
    if (max !== undefined && numericValue > max) {
      numericValue = max;
      // Atualiza o valor de exibição para o máximo formatado
      setDisplayValue(formatCurrencyInput(max.toString().replace('.', ',')));
    } else {
      setDisplayValue(formattedValue);
    }
    
    // Cria um objeto de evento simulado para manter a compatibilidade
    const syntheticEvent = {
      target: {
        name,
        value: numericValue
      }
    };
    
    onChange(syntheticEvent);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          R$
        </span>
        <input
          type="text"
          id={name}
          name={name}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-9 pr-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'} ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CurrencyInput;