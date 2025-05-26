import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EquipmentInteractionsChart = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState("overall");

  const chartData = {
    labels: data[timeFilter].labels,
    datasets: [
      {
        label: "Interactions",
        data: data[timeFilter].values,
        backgroundColor: "rgba(60, 191, 174, 0.6)",
        borderColor: "rgba(60, 191, 174, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1a1e24",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#2a2e34",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(42, 46, 52, 0.5)",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y: {
        grid: {
          color: "rgba(42, 46, 52, 0.5)",
        },
        ticks: {
          color: "#9ca3af",
          // Limit label length
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.length > 12 ? label.substring(0, 12) + "..." : label;
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34] p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="font-semibold text-white text-base">Equipment Interactions</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeFilter("overall")}
            className={`px-3 py-1 text-xs rounded-md ${
              timeFilter === "overall" ? "bg-[#3CBFAE] text-white" : "bg-[#0f1216] text-gray-300 hover:bg-[#2a2e34]"
            }`}
          >
            Overall
          </button>
          <button
            onClick={() => setTimeFilter("lastWeek")}
            className={`px-3 py-1 text-xs rounded-md ${
              timeFilter === "lastWeek" ? "bg-[#3CBFAE] text-white" : "bg-[#0f1216] text-gray-300 hover:bg-[#2a2e34]"
            }`}
          >
            Last 7 Days
          </button>
        </div>
      </div>
      <div className="h-[200px] md:h-[250px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EquipmentInteractionsChart;
