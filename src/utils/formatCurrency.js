/**
 * Formata um valor numérico para o formato de moeda brasileira (R$)
 * @param {number} value - O valor a ser formatado
 * @param {boolean} includeCurrencySymbol - Se deve incluir o símbolo da moeda (R$)
 * @returns {string} - O valor formatado como string (ex: "R$ 1.234,56")
 */
export const formatCurrencyBRL = (value, includeCurrencySymbol = true) => {
  if (value === null || value === undefined || isNaN(value)) return includeCurrencySymbol ? 'R$ 0,00' : '0,00';
  
  // Formata o número com separadores brasileiros
  const formattedValue = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return includeCurrencySymbol ? `R$ ${formattedValue}` : formattedValue;
};

/**
 * Converte uma string no formato de moeda brasileira para um número
 * @param {string} value - A string contendo o valor monetário (ex: "1.234,56" ou "R$ 1.234,56")
 * @returns {number} - O valor convertido como número
 */
export const parseCurrencyBRL = (value) => {
  if (!value) return 0;
  
  // Remove o símbolo da moeda e espaços
  let cleanValue = String(value).replace(/^R\$\s?/, '').trim();
  
  // Substitui os separadores brasileiros
  cleanValue = cleanValue.replace(/\./g, '').replace(',', '.');
  
  // Converte para número
  const number = parseFloat(cleanValue);
  
  return isNaN(number) ? 0 : number;
};

/**
 * Formata o valor enquanto o usuário digita, mantendo o formato de moeda brasileira
 * @param {string} value - O valor atual do campo
 * @returns {string} - O valor formatado com separadores de milhar
 */
export const formatCurrencyInput = (value) => {
  // Se estiver vazio, retorna vazio
  if (!value) return '';

  // Remove tudo que não for dígito ou vírgula
  let onlyNumbers = value.replace(/[^\d,]/g, '');
  
  // Verifica se já tem uma vírgula
  if (onlyNumbers.indexOf(',') !== -1) {
    // Divide a string na vírgula
    const parts = onlyNumbers.split(',');
    // Mantém apenas a primeira parte antes da vírgula e a segunda parte (limitada a 2 dígitos)
    onlyNumbers = parts[0] + ',' + (parts[1] || '').substring(0, 2);
  }

  // Adiciona os pontos como separadores de milhar
  let formattedValue = '';
  let integerPart = onlyNumbers.split(',')[0];
  
  // Adiciona os separadores de milhar
  while (integerPart.length > 3) {
    formattedValue = '.' + integerPart.substring(integerPart.length - 3) + formattedValue;
    integerPart = integerPart.substring(0, integerPart.length - 3);
  }
  
  formattedValue = integerPart + formattedValue;
  
  // Adiciona a parte decimal se existir
  if (onlyNumbers.includes(',')) {
    formattedValue += ',' + onlyNumbers.split(',')[1];
  }
  
  return formattedValue;
};