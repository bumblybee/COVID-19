class API {
  constructor() {
    this.url = "https://covid19.mathdro.id/api";
  }

  async globalTotals() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data;
  }

  async globalChanges() {
    const res = await fetch(`${this.url}/daily`);
    const data = await res.json();
    return data;
  }

  async usTotals() {
    const res = await fetch(`${this.url}/countries/USA`);
    const data = await res.json();
    return data;
  }

  async usRecovered() {
    const res = await fetch(`${this.url}/recovered`);
    const data = await res.json();
    return data;
  }
}
