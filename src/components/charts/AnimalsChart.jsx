import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * AnimalsChart - A pie chart component showing animal distribution by species or status
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - The type of distribution to show ('species' or 'status')
 * @param {Array} props.data - The data to display in the chart
 * @param {number} props.height - Optional height for the chart container
 */
const AnimalsChart = ({ type = 'species', data = [], height = 300 }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }],
  });

  // Color palette for the chart
  const colorPalette = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(78, 129, 188, 0.8)',
    'rgba(192, 80, 77, 0.8)',
  ];

  useEffect(() => {
    if (!data.length) return;

    // Process data based on the type
    const processData = () => {
      // Group data by the specified type
      const groupedData = data.reduce((acc, item) => {
        const key = type === 'species' ? item.species : item.status;
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
        return acc;
      }, {});

      // Prepare data for the chart
      const labels = Object.keys(groupedData);
      const values = Object.values(groupedData);
      const backgroundColors = labels.map((_, i) => colorPalette[i % colorPalette.length]);
      const borderColors = backgroundColors.map(color => color.replace('0.8', '1'));

      setChartData({
        labels,
        datasets: [{
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        }],
      });
    };

    processData();
  }, [data, type]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          boxWidth: 10,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div style={{ height: `${height}px` }} className="relative">
      {data.length ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default AnimalsChart;
