import { Bar } from 'react-chartjs-2';
// import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncorporationCountryChart = ({ data }) => {

  const labels = data.map((item) => item._id);
  const values = data.map((item) => item.count);

  const backgroundColor = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColor.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Distribution of Incorporation Country Chart',
        data: values,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

const ProductGroupByCompanyChart = ({ data }) => {
  const labels = data.map((item) => item._id);
  const values = data.map((item) => item.count);

  const backgroundColor = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColor.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Distribution of Products by Company',
        data: values,
        backgroundColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
}


export { IncorporationCountryChart, ProductGroupByCompanyChart };