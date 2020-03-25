class API {
  constructor() {
    this.url = "https://corona.lmao.ninja";
  }

  async globalTotals() {
    const res = await fetch(`${this.url}/all`);
    const data = await res.json();
    return data;
  }

  async globalChanges() {
    const res = await fetch(`${this.url}/v2/historical`);
    const data = await res.json();
    return data;
  }

  async usTotals() {
    const res = await fetch(`${this.url}/countries/USA`);
    const data = await res.json();
    return data;
  }

  async stateTotals() {
    const res = await fetch(`${this.url}/states`);
    const data = await res.json();
    return data;
  }
}
