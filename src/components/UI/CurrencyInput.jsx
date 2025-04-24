import React, { useState, useEffect } from 'react';
import { formatCurrencyInput, parseCurrencyBRL } from '../../utils/formatCurrency';

const CurrencyInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '0,00', 
  className = '',
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
    
    setDisplayValue(formattedValue);
    
    // Converte o valor formatado para número e chama o onChange
    const numericValue = parseCurrencyBRL(formattedValue);
    
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
          className={`w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;