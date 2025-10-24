// components/ProcessHealthChart.tsx

'use client'

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions, // Importa o tipo ChartOptions
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProcessHealthChart: React.FC = () => {
  // Tipagem para os dados do gráfico
  const data: ChartData<'doughnut'> = {
    labels: ['Ativo', 'Em Análise', 'Obsoleto', 'Sugestão'],
    datasets: [
      {
        data: [45, 15, 20, 5], // Exemplo de dados
        backgroundColor: ['#28a745', '#ffc107', '#6c757d', '#007bff'],
        hoverBackgroundColor: ['#218838', '#e0a800', '#5a6268', '#0069d9'],
        borderWidth: 0,
      },
    ],
  };

  // Tipagem para as opções do gráfico
  const options: ChartOptions<'doughnut'> = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            // context.parsed já é inferido como número
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Saúde dos Processos</h2>
      <div className="relative h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ProcessHealthChart;