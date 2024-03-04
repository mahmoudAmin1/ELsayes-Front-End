import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const ChartComponent = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data,
      options,
    });

    // Cleanup when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
