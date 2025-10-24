'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions, // Importa o tipo ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MappedProcessesChart: React.FC = () => {
  // Tipagem para os dados do gráfico
  const data: ChartData<'bar'> = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Processos Mapeados',
        data: [15, 22, 18, 28, 25, 17],
        backgroundColor: '#6366f1',
        hoverBackgroundColor: '#4f46e5',
        borderRadius: 4,
      },
    ],
  };

  // Tipagem para as opções do gráfico
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 7,
        },
        grid: {
          color: '#e2e8f0',
        },
        title: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Processos Mapeados por Mês</h2>
      <div className="relative h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MappedProcessesChart;