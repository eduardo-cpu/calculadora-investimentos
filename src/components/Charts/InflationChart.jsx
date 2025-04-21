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
  Legend
);

const InflationChart = ({ results }) => {
  const { yearlyPurchasingPower, formData } = results;
  
  // Se não tivermos dados de inflação, mostrar uma mensagem
  if (!yearlyPurchasingPower || yearlyPurchasingPower.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>Dados de inflação não disponíveis</p>
      </div>
    );
  }
  
  const years = yearlyPurchasingPower.map(data => `Ano ${data.year}`);
  const nominalValues = yearlyPurchasingPower.map(data => data.nominalValue);
  const realValues = yearlyPurchasingPower.map(data => data.realValue);
  
  const data = {
    labels: years,
    datasets: [
      {
        label: 'Valor Nominal',
        data: nominalValues,
        fill: false,
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1
      },
      {
        label: 'Valor Real (Ajustado pela Inflação)',
        data: realValues,
        fill: false,
        borderColor: 'rgb(245, 158, 11)', // yellow-500
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
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
        display: true,
        text: `Inflação estimada: ${formData.estimatedInflation}% ao ano`
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
      <div className="mt-4 text-sm text-gray-600">
        <p className="italic">
          O gráfico mostra como o valor nominal (total investido + rendimentos) se compara com o 
          valor real (poder de compra) considerando a inflação ao longo do tempo.
        </p>
      </div>
    </div>
  );
};

export default InflationChart;