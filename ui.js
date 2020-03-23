class UI {
  constructor() {
    this.worldResults = document.getElementById("world-results");
    this.usResults = document.getElementById("us-results");
  }

  paintGlobalTotals(cases) {
    // Find death and recovery rates
    const deathPercentage = (
      (cases.deaths.value / cases.confirmed.value) *
      100
    ).toFixed(1);
    const recoveryPercentage = (
      (cases.recovered.value / cases.confirmed.value) *
      100
    ).toFixed(1);

    // Display total global stats
    this.worldResults.innerHTML += `
    <h1 id="tracker-title" class="title text-center">COVID-19 Tracker</h1>
    <div class="row bg-primary">
      <div class="col bg-primary">

      
      <h1 class="text-center title global-title"><small class="text-muted"><br>(Global)</small></h1>

      <ul class="list-group-flush bg-primary">
       <li class="cases list-group-item bg-dark text-warning"> Cases:<span id="global-cases" data-number= ${
         cases.confirmed.value
       } class="numbers"> ${cases.confirmed.value.toLocaleString()}</span></li>
       <li class="deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"> ${cases.deaths.value.toLocaleString()}</span><span class="death-percent text-muted">(${deathPercentage}%)</span></li>
       <li class="recovered list-group-item bg-dark text-success">Recovered:<span class="numbers"> ${cases.recovered.value.toLocaleString()}</span><span class="recovered-percent text-muted">(${recoveryPercentage}%)</span></li>
      </ul>

     </div>
    </div>`;
  }

  paintGlobalChanges(yesterdaysCases) {
    const globalCases = document.getElementById("global-cases");
    const currentCases = Number(globalCases.dataset.number);
    const newCases = (currentCases - yesterdaysCases).toLocaleString();
    globalCases.innerHTML += `<span class="new-global-cases text-muted">(+${newCases})</span>`;
  }

  paintUSTotals(cases) {
    this.usResults.innerHTML += "";

    let deathRate = (
      (cases.deaths.value / cases.confirmed.value) *
      100
    ).toFixed(1);

    let countryResults = `
    <h1 class="text-center title us-title"><small class="text-muted"><br>(United States)</small></h1>
  <div id="country" class="row bg-primary">
    <div class="col bg-primary">
      <ul class="list-group-flush bg-primary">
       <li class="cases list-group-item bg-dark text-warning"> Cases:<span class="numbers"> ${cases.confirmed.value.toLocaleString()}</span></li>
       <li class="deaths list-group-item bg-dark text-danger">Deaths:<span class="numbers"> ${cases.deaths.value.toLocaleString()}</span><span class="death-percent text-muted">(${deathRate}%)</span></li>
     </ul>
    </div>
  </div>`;

    this.usResults.innerHTML += countryResults;
  }
}
