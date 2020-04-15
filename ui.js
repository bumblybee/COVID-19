class UI {
  constructor() {
    this.worldResults = document.getElementById("world-results");
    this.usResults = document.getElementById("us-results");
    this.stateResults = `
    <input type="text" id="search-states" class="form-control form-control-sm rounded mb-4 mt-4" placeholder="Filter states..." />
`;
    this.countyResults = document.getElementById("county-results");
  }

  paintGlobalTotals(results) {
    // Find death and recovery rates
    const deathRate = ((results.deaths / results.cases) * 100).toFixed(1);
    const recoveryRate = ((results.recovered / results.cases) * 100).toFixed(1);

    // Display total global stats
    this.worldResults.innerHTML += `
    <h1 id="tracker-title" class="title text-center">COVID-19 Tracker</h1>
    <div class="row bg-primary">
      <div class="col bg-primary">
      
      <h1 class="text-center title global-title"><small class="text-muted"><br>(Global)</small></h1>
      <ul class="list-group-flush bg-primary stats-list">
       <li class="cases list-group-item bg-dark text-warning"> Cases:<span id="global-cases" data-cases="${
         results.cases
       }" class="numbers"> ${results.cases.toLocaleString()}</span><span class="new-cases text-muted">+${results.todayCases.toLocaleString()}</span></li>
       <li class="deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"> ${results.deaths.toLocaleString()}</span><span class="death-rate text-muted ml-3">${deathRate}%</span></li>
       <li class="recovered list-group-item bg-dark text-success">Recovered:<span class="numbers"> ${results.recovered.toLocaleString()}</span><span class="recovery-rate text-muted">${recoveryRate}%</span></li>
      </ul>
     </div>
    </div>`;
  }

  // paintGlobalChanges(yesterdaysCases) {
  //   const globalCases = document.getElementById("global-cases");
  //   const currentCases = globalCases.dataset.cases;
  //   const newCases = (currentCases - yesterdaysCases).toLocaleString();
  //   globalCases.innerHTML += `<span class="new-cases text-muted">+${newCases}</span>`;
  // }

  paintUSTotals(results) {
    this.usResults.innerHTML += "";

    const deathRate = ((results.deaths / results.cases) * 100).toFixed(1);

    const recoveryRate = ((results.recovered / results.cases) * 100).toFixed(1);

    let countryResults = `
      <h1 class="text-center title us-title"><small class="text-muted"><br>(United States)</small></h1>
    <div id="country" class="row bg-primary">
      <div class="col bg-primary">
        <ul class="stats-list list-group-flush bg-primary">
         <li class="cases list-group-item bg-dark text-warning"> Cases:<span class="numbers"> ${results.cases.toLocaleString()}</span><span class="new-cases text-muted">+${results.todayCases.toLocaleString()}</span></li>
        <li class="critical list-group-item bg-dark">Critical:<span class="numbers"> ${results.critical.toLocaleString()}</span></li>
        
        <li class="deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"> ${results.deaths.toLocaleString()}</span><span class="new-death text-muted">+${results.todayDeaths.toLocaleString()}</span><span class="death-rate text-muted">${deathRate}%</span></li>
         <li class="list-group-item bg-dark text-success recovered">Recovered:<span class="numbers"> ${results.recovered.toLocaleString()}</span><span class="recovery-rate text-muted">${recoveryRate}%</span></li>
         <li class="active-cases list-group-item bg-dark">Tests:<span class="numbers"> ${results.tests.toLocaleString()}</span></li>
         
       </ul>
      </div>
    </div>`;

    this.usResults.innerHTML += countryResults;
  }

  paintStateTotals(results) {
    let rank = 1;
    // console.log(results);
    results.shift();
    results.forEach((result) => {
      const deathRate = ((result.deaths / result.cases) * 100).toFixed(1);
      const recovered = result.cases - (result.active + result.deaths);
      const recoveryRate = ((recovered / result.cases) * 100).toFixed(1);
      this.stateResults += `
        <div class="row bg-primary states">
         <div class="col bg-primary">
          <h3 class="rank">${rank}.</h3>
          <h3 class="state-title" id="state-title">${result.state}</h3>
          <ul class="list-group-flush stats-list bg-primary">
          <li class="cases list-group-item bg-dark text-warning">Cases:<span class="numbers"> ${result.cases.toLocaleString()}</span><span class="new-cases text-muted">+${result.todayCases.toLocaleString()}</span></li>
          <li class="list-group-item bg-dark active-cases">Active:<span class="numbers"> ${result.active.toLocaleString()}</span></li>
          <li class="list-group-item bg-dark text-danger deaths">Deaths:<span class="numbers"> ${result.deaths.toLocaleString()}</span><span class="new-death text-muted">+${
        result.todayDeaths
      }</span><span class="death-rate text-muted">${deathRate}%</span></li>
      <li class="list-group-item bg-dark text-success recovered">Recovered:<span class="numbers"> ${recovered.toLocaleString()}</span><span class="recovery-rate text-muted">${recoveryRate}%</span></li>
          
          </ul>
           </div>
        </div>
        
        `;

      // api.countyTotals().then(data => {
      //   data.forEach(county => {
      //     if (county.provinceState === result.state) {
      //       console.log(`${county.admin2}: ${county.confirmed}`);
      //     }
      //   });
      // });
      rank++;
    });
    this.usResults.innerHTML += this.stateResults;
  }

  paintCountyTotals(results) {
    let countyTotals = "";
    results.forEach((result) => {
      // console.log(result);
      countyTotals += `
        <div class="row bg-primary counties" id="counties">
         <div class="col bg-primary">
         <h3 class="county-title text-muted" id="county-title" data-state="${
           result.provinceState
         }">${result.admin2}</h3>
          <ul class="list-group-flush stats-list bg-primary">
          <li class="cases list-group-item bg-dark text-warning">Cases:<span class="numbers"> ${result.confirmed.toLocaleString()}</span></li>
         <!-- <li class="list-group-item bg-dark active-cases">Active:<span class="numbers"> ${result.active.toLocaleString()}</span></li> -->
          <li class="list-group-item bg-dark text-danger deaths">Deaths:<span class="numbers"> ${result.deaths.toLocaleString()}</span></li>
      <!-- <li class="list-group-item bg-dark text-success recovered">Recovered:<span class="numbers"> ${result.recovered.toLocaleString()}</span></li> -->
          </ul>
         </div>
        </div>`;
    });
    //Changed this to load in county results so it doesn't push state results to bottom of counties
    this.countyResults.innerHTML += countyTotals;
  }
}
