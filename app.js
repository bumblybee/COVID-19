const api = new API();
const ui = new UI();

const infoBtn = document.getElementById("info-btn");
const closeBtn = document.getElementById("close-btn");
const infoModal = document.getElementById("info-modal");
const wrapper = document.getElementsByClassName("wrapper")[0];
const usResults = document.getElementById("us-results");
const stateResults = document.getElementById("state-results");
const counties = document.getElementsByClassName("counties");

infoBtn.addEventListener("click", (e) => {
  infoModal.style.display = "block";
});

closeBtn.addEventListener("click", (e) => {
  infoModal.style.display = "none";
});

//TODO: Fix counties only loading on first instance

usResults.addEventListener("keyup", (e) => {
  if ((e.target.id = "search-states")) {
    const children = usResults.children;
    let searchText = e.target.value.toLowerCase();

    //If space after search value, remove space
    if (searchText.endsWith("")) {
      searchText = searchText.substring(0, searchText.length - 1);
    }

    Array.from(children).forEach((child) => {
      if (child.classList.contains("states")) {
        const h1 = child.firstElementChild.firstElementChild.nextElementSibling;
        const title = h1.textContent.toLowerCase();
        if (searchText !== "") {
          if (title.indexOf(searchText) !== -1) {
            //Create in UI
            child.style.display = "block";
            h1.style.cursor = "pointer";
          } else {
            child.style.display = "none";
            usResults.style.paddingBottom = "5%";
          }
        } else if (searchText === "") {
          // Get rid of counties if input is blank
          const counties = document.getElementsByClassName("county-title");
          Array.from(counties);
          for (let i = 0; i < counties.length; i++) {
            const county = counties[i];
            const countyDiv = county.parentElement.parentElement;
            countyDiv.style.display = "none";
          }
          //Show states
          child.style.display = "block";
        }
      }
    });
  }
});

usResults.addEventListener("click", (e) => {
  const searchStates = document.getElementById("search-states");
  const stateTitles = document.getElementsByClassName("state-title");
  const counties = document.getElementsByClassName("county-title");
  Array.from(counties);
  if (searchStates.value !== "") {
    Array.from(stateTitles).forEach((title) => {
      if (e.target === title) {
        const state = e.target.textContent;

        for (let i = 0; i < counties.length; i++) {
          const county = counties[i];
          const countyDiv = county.parentElement.parentElement;
          if (counties[i].dataset.state === state) {
            countyDiv.classList.toggle("show-county");
            usResults.style.paddingBottom = "0";
          }
        }
      }
    });
  }
});

api.globalTotals().then((data) => {
  ui.paintGlobalTotals(data);
});

api.usTotals().then((data) => {
  ui.paintUSTotals(data);
});

//Load this after everything else is loaded so US and global totals load first
window.addEventListener("load", () => {
  api.stateTotals().then((data) => {
    ui.paintStateTotals(data);
  });

  api.countyTotals().then((data) => {
    ui.paintCountyTotals(data);
  });
});

//Code below is just to compare county totals to state for personal reference; The county data from mathdroid is more robust, so continue using that for county rendering in app
// api.getCounties().then((data) => {
//   // console.log(data);
//   let cases = 0;
//   data.forEach((county) => {
//     if (county.province === "Iowa") {
//       cases += county.stats.confirmed;
//     }
//   });
//   console.log(cases);
// });
