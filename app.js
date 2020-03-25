const api = new API();
const ui = new UI();

const infoBtn = document.getElementById("info-btn");
const closeBtn = document.getElementById("close-btn");
const infoModal = document.getElementById("info-modal");
const wrapper = document.getElementsByClassName("wrapper")[0];
const usResults = document.getElementById("us-results");
const stateResults = document.getElementById("state-results");

infoBtn.addEventListener("click", e => {
  infoModal.style.display = "block";
});

closeBtn.addEventListener("click", e => {
  infoModal.style.display = "none";
});

usResults.addEventListener("keyup", e => {
  if ((e.target.id = "search-states")) {
    const searchText = e.target.value.toLowerCase();
    const children = usResults.children;
    Array.from(children).forEach(child => {
      if (child.classList.contains("states")) {
        const title = child.firstElementChild.firstElementChild.nextElementSibling.textContent.toLowerCase();
        if (searchText !== "") {
          if (title.indexOf(searchText) !== -1) {
            //Create in UI
            child.style.display = "block";
          } else {
            child.style.display = "none";
            usResults.style.paddingBottom = "5%";
          }
        } else if (searchText === "") {
          child.style.display = "block";
        }
      }
    });
  }
});

api.globalTotals().then(data => {
  ui.paintGlobalTotals(data);
});

api.globalChanges().then(data => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let ydd = String(today.getDate() - 1).padStart(2, "0");
  let mm = String(today.getMonth() + 1);
  let yy = String(today.getFullYear()).substr(-2);
  let yesterday = mm + "/" + ydd + "/" + yy;
  today = mm + "/" + dd + "/" + yy;

  // console.log(data);

  let newCases = 0;

  data.forEach(country => {
    Object.entries(country.timeline.cases).forEach(([key, value]) => {
      if (key === yesterday) {
        console.log(`${key}: ${value}`);
        newCases += Number(value);
        console.log(newCases);
      }
    });
  });
  // console.log(newCases.toLocaleString());
  ui.paintGlobalChanges(newCases);
});

// if (date.reportDateString === yesterday) {
//   yesterdaysCases = date.totalConfirmed;
// }

// newCases = todaysCases - yesterdaysCases;
// newCases = newCases.toLocaleString();

// ui.paintNewCases(newCases, today);

api.usTotals().then(data => {
  ui.paintUSTotals(data);
});

api.stateTotals().then(data => {
  ui.paintStateTotals(data);
});

// api.globalChanges().then(data => {
//   let today = new Date();
//   let dd = String(today.getDate()).padStart(2, "0");
//   let ydd = String(today.getDate() - 1).padStart(2, "0");
//   let mm = String(today.getMonth() + 1).padStart(2, "0");
//   let yyyy = today.getFullYear();
//   let yesterday = yyyy + "-" + mm + "-" + ydd;

//   today = yyyy + "-" + mm + "-" + dd;

//   let todaysCases;
//   let yesterdaysCases;
//   let newCases;

//   data.forEach(date => {
//     const dateString = String(date.reportDate);

//     if (dateString === today) {
//       todaysCases = date.totalConfirmed;
//     }

//     if (dateString === yesterday) {
//       yesterdaysCases = date.totalConfirmed;
//     }
//   });

//   ui.paintGlobalChanges(yesterdaysCases);
// });
