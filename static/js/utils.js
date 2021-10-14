// rChart.config.type = "line"
const SITE_URL = document.getElementById("site-url").value;

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const alphaColors = [
"rgba(170,0,255, .6)",
"rgba(230,38,0, .6)",
"rgba(77,106,255, .6)",
"rgba(0,179,0, .6)",
"rgba(255,128,0, .6)",
];

const solidColors = [
  "rgb(170,0,255)",
  "rgb(230,38,0)",
  "rgb(77,106,255)",
  "rgb(0,179,0)",
  "rgb(255,128,0)",
];

function getContext(canvasId){
  const element = document.getElementById(canvasId);
  const context = element.getContext("2d");
  return context;
}

function getChart(context, type, labels, data, display) {
  const chart = new Chart(context, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
          data: data,
          backgroundColor: alphaColors,
          borderColor: alphaColors,
          borderWidth: 1
        }]
    },
    options: {
      legend: {
        position: "bottom",
        display: display
      }
    }
  });
  return chart;
}

function removeChartData(chart) {
  if (chart) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
  }
}
