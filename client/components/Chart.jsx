import React from "react";
import { Line } from "react-chartjs-2";
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

/**
 * Register the chart
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * Pass in weights, create the chart.
 */
const Chart = ({ weights }) => {
  const initialData = {
    labels: weights.map(row => `${row.date.getUTCMonth()+1}-${row.date.getUTCDate()}-${row.date.getUTCFullYear()}`),
    datasets: [
      {
        label: 'Weights',
        data: weights.map(row => row.weight),
        backgroundColor: '#ebecec',
        borderColor: '#f4d35e'
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div id="chart">
      <Line className="line-chart-js" data={initialData} options={options} />
    </div>
  )
}

export default Chart;