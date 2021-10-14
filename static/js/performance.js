// (B = Performance page)
// B1 Chart and Table functions
function fetchB1Options(year) {
  fetch(`${SITE_URL}/sales-year/${year}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((sales) => {
      buildB1Table(sales);
      buildB1Chart(sales);
    })
}

function buildB1Table(sales) {
  B1table = document.getElementById("B1-table");
  B1table.innerHTML = "";

  for (const sale of sales) {
    let html = `<tr><td><strong>${sale.product}</strong></td>`;
    for (const val of sale.data) {
      value = parseFloat(val.toFixed(0)).toLocaleString("en");
      html += `<td>${value}</td>`;
    }
    html += `</tr>`;
    B1table.innerHTML += html;
  }
}

function buildB1Chart(sales) {
  let datasets = [];
  
  for (const i in sales) {
    datasets = [
      ...datasets, {
        label: sales[i].product,
        data: sales[i].data,
        borderColor: solidColors[i],
        borderWidth: 1
      }
    ];
  }
  
  removeChartData(B1Chart);

  B1Chart = new Chart(getContext("B1-chart"), {
    type: "line",
    data: {
      labels: monthLabels,
      datasets: datasets
    }
  });
}

// Select function
function selectB1Year(year) {
  console.log("que pasa")
  B1Year = year;
  B1YearBtn.innerText = B1Year;
  fetchB1Options(B1Year);
}

// Initial state
let B1Chart = null;
let B1Year = "2020";
const B1YearBtn = document.getElementById("B1-year-btn")

fetchB1Options(B1Year);
