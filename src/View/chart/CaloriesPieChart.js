import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CaloriesPieChart = ({ orders }) => {
  // گروه‌بندی کالری بر اساس meal
  const mealCalories = (orders || []).reduce((acc, order) => {
    const meal = order.meal || "نامشخص";
    const count = order.count || 0;
    const takeaway = order.takeaway_count || 0;
    const calory = order.food_profile?.calory || 0;
    const color = order.meal_color || "#ccc";

    const total = (count + takeaway) * calory;

    if (!acc[meal]) {
      acc[meal] = { calories: 0, color };
    }

    acc[meal].calories += total;

    return acc;
  }, {});

  const labels = Object.keys(mealCalories);
  const dataValues = labels.map((meal) => mealCalories[meal].calories);
  const colors = labels.map((meal) => mealCalories[meal].color);

  const data = {
    labels,
    datasets: [
      {
        label: "کالری مصرفی",
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            family: "irancell",
          },
        },
      },
      title: {
        display: true,
        text: "کالری مصرفی بر اساس وعده",
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
  };

  return (
    <div className="w-full h-64">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CaloriesPieChart;
