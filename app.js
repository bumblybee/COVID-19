const api = new API();
const ui = new UI();

const infoBtn = document.getElementById("info-btn");
const closeBtn = document.getElementById("close-btn");
const infoModal = document.getElementById("info-modal");
const wrapper = document.getElementsByClassName("wrapper")[0];
const usResults = document.getElementById("us-results");

infoBtn.addEventListener("click", e => {
  infoModal.style.display = "block";
});

closeBtn.addEventListener("click", e => {
  infoModal.style.display = "none";
});

api.globalTotals().then(data => {
  ui.paintGlobalTotals(data);
  console.log(data);
});

api.usTotals().then(data => {
  ui.paintUSTotals(data);
});

api.usRecovered().then(data => {
  if (data.countryRegion === "US") {
    console.log(data);
  }
});

api.globalChanges().then(data => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let ydd = String(today.getDate() - 1).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let yesterday = yyyy + "-" + mm + "-" + ydd;

  today = yyyy + "-" + mm + "-" + dd;

  let todaysCases;
  let yesterdaysCases;
  let newCases;

  data.forEach(date => {
    const dateString = String(date.reportDate);

    if (dateString === today) {
      todaysCases = date.totalConfirmed;
    }

    if (dateString === yesterday) {
      yesterdaysCases = date.totalConfirmed;
    }
  });

  ui.paintGlobalChanges(yesterdaysCases);
});
