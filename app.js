const api = new API();
const ui = new UI();

const infoBtn = document.getElementById("info-btn");
const closeBtn = document.getElementById("close-btn");
const infoModal = document.getElementById("info-modal");
const wrapper = document.getElementsByClassName("wrapper")[0];
const usResults = document.getElementById("us-results");
const stateResults = document.getElementById("state-results");
const counties = document.getElementsByClassName("counties");

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
            // const stateTitles = document.getElementsByClassName("state-title");
            // Array.from(stateTitles).forEach(name => {
            //   const state = name.textContent;
            //   const counties = document.getElementsByClassName("county-title");
            //   Array.from(counties);
            //   for (let i = 0; i < counties.length; i++) {
            //     const county = counties[i];
            //     const countyDiv = county.parentElement.parentElement;
            //     if (counties[i].dataset.state === title) {
            //       countyDiv.className = "show-county";
            //     }
            //   }
            // });
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

usResults.addEventListener("click", e => {
  const searchStates = document.getElementById("search-states");
  if (searchStates.value !== "") {
    const stateTitles = document.getElementsByClassName("state-title");
    Array.from(stateTitles).forEach(title => {
      if (e.target === title || e.target.id === "search-states") {
        const state = e.target.textContent;
        const counties = document.getElementsByClassName("county-title");
        Array.from(counties);
        for (let i = 0; i < counties.length; i++) {
          const county = counties[i];
          const countyDiv = county.parentElement.parentElement;
          if (counties[i].dataset.state === state) {
            countyDiv.classList.toggle("show-county");
          }
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
    //Grab each object key/value pair
    Object.entries(country.timeline.cases).forEach(([key, value]) => {
      //If the key matches yesterday's date, add each case
      if (key === yesterday) {
        newCases += Number(value);
        // console.log(newCases);
      }
    });
  });
  // console.log(newCases.toLocaleString());
  ui.paintGlobalChanges(newCases);
});

api.usTotals().then(data => {
  ui.paintUSTotals(data);
});

api.stateTotals().then(data => {
  ui.paintStateTotals(data);
});

api.countyTotals().then(data => {
  // console.log(data);
  // let stateNames = document.getElementsByClassName("state-title");
  // Array.from(stateNames).forEach(name => {
  //   const state = name.textContent;
  ui.paintCountyTotals(data);
});
