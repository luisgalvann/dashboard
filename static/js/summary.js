// (A = Summary page)
// A1 Chart functions
function fetchA1Options(country, year) {
  fetch(`${SITE_URL}/sales-product/${country}/${year}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((sales) => {
      buildA1Chart(sales);
    })
}

function buildA1Chart(sales) {
  let A1Labels = [];
  let A1Data = [];

  for (const sale of sales) {
    A1Labels.push(sale.product);
    A1Data.push(sale.data.toFixed(2));
  }

  removeChartData(A1Chart);
  
  const context = getContext("A1-chart");
  A1Chart = getChart(context, "doughnut", A1Labels, A1Data, true);
}

// A2 Chart functions
function fetchA2Options(country, year) {
  fetch(`${SITE_URL}/sales-city/${country}/${year}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((sales) => {
      buildA2Chart(sales);
    })
}

function buildA2Chart(sales) {
  let A2Labels = [];
  let A2Data = [];
  
  for (const sale of sales) {
    A2Labels.push(sale.city);
    A2Data.push(sale.data.toFixed(2));
  }

  removeChartData(A2Chart);

  const context = getContext("A2-chart");
  A2Chart = getChart(context, "bar", A2Labels, A2Data, false);
}

// Select functions
function selectA1Country(country) {
  A1Country = country;
  A1CountryBtn.innerText = A1Country;
  fetchA1Options(A1Country, A1Year);
}

function selectA1Year(year) {
  A1Year = year;
  A1YearBtn.innerText = A1Year;
  fetchA1Options(A1Country, A1Year);
}


function selectA2Country(country) {
  A2Country = country;
  A2CountryBtn.innerText = A2Country;
  fetchA2Options(A2Country, A2Year);
}

function selectA2Year(year) {
  A2Year = year;
  A2YearBtn.innerText = A2Year;
  fetchA2Options(A2Country, A2Year);
}

// Initial state
let A1Chart = null;
let A1Country = "España";
let A1Year = "2020";
const A1CountryBtn = document.getElementById("A1-country-btn")
const A1YearBtn = document.getElementById("A1-year-btn")

let A2Chart = null;
let A2Country = "España";
let A2Year = "2020";
const A2CountryBtn = document.getElementById("A2-country-btn")
const A2YearBtn = document.getElementById("A2-year-btn")

fetchA1Options(A1Country, A1Year);
fetchA2Options(A2Country, A2Year);
