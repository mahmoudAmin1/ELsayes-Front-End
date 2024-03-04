import Chart from "chart.js/auto";
import ChartComponent from "../components/ChartComponent";

function Home() {
  const chartData = {
    labels: ["Number Of Free Spots"],
    datasets: [
      {
        data: [75],
        backgroundColor: ["rgb(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top", // Adjust position as needed
        labels: {
          usePointStyle: true,
          boxWidth: 20, // Set the legend box width
        },
      },
    },
  };
  return (
    <>
      <div class="container-fluid">
        <div class="row gutters">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="welcome-msg">
              <div class="welcome-user-thumb">
                <img src="img/user2.png" alt="Elite Admin" />
              </div>
              <div class="welcome-title">
                Hello, <span>Russel</span>
              </div>
              <div class="welcome-designation">
                Welcome to Elite Admin Template. You have 5 new tasks.
              </div>
              <a href="tasks.html" class="btn btn-orange btn-sm">
                Tasks
              </a>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="row gutters user-plans justify-content-sm-center">
              <div class="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-4">
                <div id="sales"></div>
              </div>
              <div class="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-4">
                <div id="expenses"></div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-3 col-sm-3 col-4">
                <ChartComponent data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
