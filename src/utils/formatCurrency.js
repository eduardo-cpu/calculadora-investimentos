/**
 * Formata um número como moeda brasileira (R$)
 * @param {number} value - Valor a ser formatado
 * @returns {string} - Valor formatado como moeda
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};