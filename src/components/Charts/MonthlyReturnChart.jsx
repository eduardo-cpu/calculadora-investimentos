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
import { formatCurrencyBRL } from '../../utils/formatCurrency';

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

const MonthlyReturnChart = ({ results }) => {
  const { monthlyData } = results;
  
  // Vamos pegar apenas alguns pontos para não sobrecarregar o gráfico
  // Uma amostragem a cada 6 meses ou anual dependendo do período
  const sampleRate = monthlyData.length > 60 ? 12 : 6; // Anual ou semestral
  
  const filteredData = monthlyData.filter((_, index) => index % sampleRate === 0 || index === monthlyData.length - 1);
  
  const labels = filteredData.map(data => {
    const year = Math.floor(data.month / 12);
    const month = data.month % 12;
    return `${year}a ${month}m`;
  });
  
  const monthlyReturns = filteredData.map(data => data.monthlyReturn);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Rendimento Mensal',
        data: monthlyReturns,
        fill: true,
        borderColor: 'rgb(147, 51, 234)', // purple-600
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        tension: 0.3
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
            label += formatCurrencyBRL(context.parsed.y);
            return label;
          }
        }
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolução do Rendimento Mensal'
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return formatCurrencyBRL(value);
          }
        },
        title: {
          display: true,
          text: 'Rendimento (R$)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Período (Anos e Meses)'
        }
      }
    }
  };

  return (
    <div>
      <Line data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600">
        <p className="italic">
          Este gráfico mostra como o rendimento mensal cresce ao longo do tempo conforme o montante investido aumenta.
        </p>
        <p className="mt-1">
          <span className="font-semibold">Último rendimento mensal:</span> {formatCurrencyBRL(results.lastMonthReturn)}
        </p>
      </div>
    </div>
  );
};

export default MonthlyReturnChart;