import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { formatCurrency } from '../../utils/formatCurrency';

// Registrando os componentes do Chart.js necessários para o Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

const InvestmentBreakdownChart = ({ results }) => {
  const { initialInvestment, totalContributions, interestEarned } = results;
  
  // O capital total inclui o investimento inicial + aportes mensais
  const capital = totalContributions;
  
  const data = {
    labels: ['Investimento Inicial', 'Aportes Mensais', 'Rendimentos'],
    datasets: [
      {
        data: [
          initialInvestment, 
          totalContributions - initialInvestment, 
          interestEarned
        ],
        backgroundColor: [
          'rgba(107, 114, 128, 0.7)',  // gray para investimento inicial
          'rgba(59, 130, 246, 0.7)',   // blue para aportes mensais
          'rgba(16, 185, 129, 0.7)'    // green para rendimentos
        ],
        borderColor: [
          'rgb(107, 114, 128)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = formatCurrency(context.raw);
            const percentage = ((context.raw / results.totalAmount) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6 grid grid-cols-3 w-full text-center gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Investimento Inicial</p>
          <p className="font-bold">{formatCurrency(initialInvestment)}</p>
          <p className="text-xs text-gray-500">
            {((initialInvestment / results.totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-600">Aportes Mensais</p>
          <p className="font-bold">{formatCurrency(totalContributions - initialInvestment)}</p>
          <p className="text-xs text-blue-500">
            {(((totalContributions - initialInvestment) / results.totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-600">Rendimentos</p>
          <p className="font-bold">{formatCurrency(interestEarned)}</p>
          <p className="text-xs text-green-500">
            {((interestEarned / results.totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBreakdownChart;