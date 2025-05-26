import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * HealthStatusChart - A bar chart showing health metrics for animals
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Optional chart title
 * @param {Array<string>} props.labels - X-axis labels (e.g., health categories)
 * @param {Array<Object>} props.datasets - The health metrics data
 * @param {number} props.height - Optional height for the chart container
 */
const HealthStatusChart = ({ title = 'Animal Health Status', labels = [], datasets = [], height = 300 }) => {
  // Default options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 12
        },
        titleFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 14,
          weight: 'bold'
        }
      },
      title: {
        display: !!title,
        text: title,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11
          }
        }
      }
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  };

  // Prepare chart data
  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: dataset.borderColor || dataset.backgroundColor.map(color => 
        color.replace('0.7', '1')
      ),
    }))
  };

  return (
    <div style={{ height: `${height}px` }} className="relative">
      {labels.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default HealthStatusChart;
