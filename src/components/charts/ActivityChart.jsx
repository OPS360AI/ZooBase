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

// Register Chart.js components
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

/**
 * ActivityChart - A line chart showing activity metrics over time
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the chart
 * @param {Array<string>} props.labels - X-axis labels (usually time periods)
 * @param {Array<Object>} props.datasets - The datasets to display in the chart
 * @param {number} props.height - Optional height for the chart container
 */
const ActivityChart = ({ title, labels = [], datasets = [], height = 300 }) => {
  // Default configuration for the chart
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
        mode: 'index',
        intersect: false,
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
        display: title ? true : false,
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
          },
          maxRotation: 0
        }
      }
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 4,
      },
      line: {
        tension: 0.2
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  // Prepare chart data
  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      tension: 0.3,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: '#fff',
      pointBorderWidth: 1,
      pointRadius: 3,
    }))
  };

  return (
    <div style={{ height: `${height}px` }} className="relative">
      {labels.length > 0 ? (
        <Line options={options} data={data} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default ActivityChart;
