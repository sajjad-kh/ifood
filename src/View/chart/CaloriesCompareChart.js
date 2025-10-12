import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CaloriesCompareChart = ({ orders, requiredCalories }) => {
  // محاسبه مجموع کالری مصرفی از روی orders
  const totalCalories =
    (orders || []).reduce((sum, order) => {
      const count = order.count || 0;
      const takeaway = order.takeaway_count || 0;
      const calory = order.food_profile?.calory || 0;
      return sum + (count + takeaway) * calory;
    }, 0) || 0;

  const data = {
    labels: ["کالری"],
    datasets: [
      {
        label: "مصرفی",
        data: [totalCalories],
        backgroundColor: "#80857f",
      },
      {
        label: "مورد نیاز",
        data: [requiredCalories],
        backgroundColor: "#ffc219", 
      },
    ],
  };

  const options = {
    responsive: true,
	maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "irancell",
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: "مقایسه کالری مصرفی و مورد نیاز",
        font: {
          family: "irancell",
          weight: "bold",
        },
      },
      tooltip: {
        bodyFont: {
          family: "irancell",
        },
        titleFont: {
          family: "irancell", 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "irancell", 
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "irancell", 
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />
  
};

export default CaloriesCompareChart;
