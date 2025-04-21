import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { formatCurrency } from '../../utils/formatCurrency';

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GrowthChart = ({ results }) => {
  const { yearlyData } = results;
  
  const years = yearlyData.map(data => `Ano ${data.year}`);
  const totalAmounts = yearlyData.map(data => data.balance);
  const contributions = yearlyData.map(data => data.contributions);
  const interests = yearlyData.map(data => data.interest);
  
  const data = {
    labels: years,
    datasets: [
      {
        label: 'Valor Total',
        data: totalAmounts,
        fill: false,
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1
      },
      {
        label: 'Aportes Acumulados',
        data: contributions,
        fill: false,
        borderColor: 'rgb(107, 114, 128)', // gray-500
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
        tension: 0.1
      },
      {
        label: 'Rendimentos',
        data: interests,
        fill: false,
        borderColor: 'rgb(16, 185, 129)', // green-500
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += formatCurrency(context.parsed.y);
            return label;
          }
        }
      },
      legend: {
        position: 'top',
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default GrowthChart;