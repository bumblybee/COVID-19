class UI {
  constructor() {
    this.worldResults = document.getElementById("world-results");
    this.usResults = document.getElementById("us-results");
    this.stateResults = document.getElementById("state-results");
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
       <li class="cases list-group-item bg-dark text-warning"> Cases:<span id="global-cases" data-number= ${
         results.cases
       } class="numbers"> ${results.cases.toLocaleString()}</span></li>
       <li class="deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"> ${results.deaths.toLocaleString()}</span><span class="death-rate text-muted ml-3">${deathRate}%</span></li>
       <li class="recovered list-group-item bg-dark text-success">Recovered:<span class="numbers"> ${results.recovered.toLocaleString()}</span><span class="recovery-rate text-muted">${recoveryRate}%</span></li>
      </ul>

     </div>
    </div>`;
  }

  paintGlobalChanges(yesterdaysCases) {
    const globalCases = document.getElementById("global-cases");
    const currentCases = Number(globalCases.dataset.number);
    const newCases = (currentCases - yesterdaysCases).toLocaleString();
    globalCases.innerHTML += `<span class="new-cases text-muted">+${newCases}</span>`;
  }

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

        <li class="active-cases list-group-item bg-dark">Active:<span class="numbers"> ${results.active.toLocaleString()}</span></li>

        <li class="critical list-group-item bg-dark">Critical:<span class="numbers"> ${results.critical.toLocaleString()}</span></li>
        
        <li class="deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"> ${results.deaths.toLocaleString()}</span><span class="new-death text-muted">+${
      results.todayDeaths
    }</span><span class="death-rate text-muted">${deathRate}%</span></li>

         <li class="list-group-item bg-dark text-success recovered">Recovered:<span class="numbers"> ${results.recovered.toLocaleString()}</span><span class="recovery-rate text-muted">${recoveryRate}%</span></li>
         
       </ul>
      </div>
    </div>`;

    this.usResults.innerHTML += countryResults;
  }

  paintStateTotals(results) {
    let rank = 1;
    let stateResults = `
    <input type="text" id="search-states" class="form-control form-control-sm rounded mb-4 mt-4" placeholder="Filter states..." />
`;

    results.forEach(result => {
      const deathRate = ((result.deaths / result.cases) * 100).toFixed(1);
      const recovered = result.cases - (result.active + result.deaths);
      const recoveryRate = ((recovered / result.cases) * 100).toFixed(1);
      stateResults += `
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
        </div>`;
      rank++;
    });
    this.usResults.innerHTML += stateResults;
  }

  //     let countyOutput = "";
  //     let stateOutput = "";
  //     // <input type="text" id="search-states" class="form-control form-control-sm rounded mb-4 mt-4" placeholder="Filter states..." />

  //     for (let i = 0; i < states.length; i++) {
  //       let state = states[i];
  //       let stateCases = 0;
  //       let stateDeaths = 0;

  //       countyOutput += `
  //             <div class="row bg-primary state">
  //              <div class="col bg-primary">
  //                 <h2 id="state-name" class="title state-name">${state}</h2>

  //                  <ul class="state list-group-flush bg-primary mb-4">
  //                     <li id="state-cases" class="cases list-group-item bg-dark text-warning"> Cases:<span class="numbers"></span></li>
  //                     <li id="state-deaths" class=" deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"></span></li>
  //                     </ul>
  //                 <ul class="list-group-flush bg-primary county-list">

  //       `;

  //       results.forEach(result => {
  //         if (result.provinceState === state) {
  //           stateCases += result.confirmed;
  //           stateDeaths += result.deaths;
  //           countyOutput += `

  //         <li class="list-group-item bg-dark text-white county"><span class="county-name">${result.admin2}</span>
  //         <ul class="county-results list-group bg-primary">
  //         <li class="list-group-item bg-dark text-warning county-cases">Cases: <span class="numbers">${result.confirmed}</span></li>
  //         <li class="list-group-item bg-dark text-danger county-deaths">Deaths: <span class="numbers">${result.deaths}</span></li></ul></li>`;
  //         }
  //       });
  //       countyOutput += `
  //     </ul>

  //     </div>`;
  //     }
  //     this.stateResults.innerHTML = stateOutput;

  //     this.stateResults.innerHTML += countyOutput;
  //   }
}
