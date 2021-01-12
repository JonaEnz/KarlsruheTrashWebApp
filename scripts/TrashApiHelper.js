export default class TrashApiHelper {
  constructor(street, nr, urlFormat) {
    this.street = street;
    this.nr = nr;
    this.urlFormat = urlFormat;
    this.data = [];
    this.update();
  }

  async update() {
    var url = this.urlFormat
      .replace("{nr}", this.nr)
      .replace("{street}", this.street);
    try {
      var response = await fetch(url, { method: "GET" });
      var json = await response.json();
      if (json.CollectionDates) {
        this.data = json.CollectionDates;
      }
      console.log(this.data);
    } catch (e) {
      console.error(e.toString());
    }
  }

  setUrl(url) {
    this.urlFormat = url;
    this.update();
  }

  setAdress(street, nr) {
    this.street = street;
    this.nr = nr;
    this.update();
  }

  getByDate() {
    var result = [];
    this.data.forEach((e) => {
      e.dates.forEach((date) => {
        result.push([e.name, this.date_from_string(date)]);
      });
    });
    result = result.sort((a, b) => {
      return a[1] - b[1];
    });
    var res = [[result[0][1], [result[0][0]]]];
    result.reduce((prev, curr, index) => {
      if (index != 0 && prev[1].getTime() == curr[1].getTime()) {
        res[res.length - 1][1].push(curr[0]);
      } else {
        res.push([curr[1], [curr[0]]]);
      }
      return curr;
    });

    return res;
  }

  getByType() {
    var results = [];
    this.data.forEach((e) => {
      results.push([e.name, e.dates]);
    });
    return results;
  }

  date_from_string(str) {
    return new Date(str.replace(/(\d{2}).(\d{2}).(\d{2})/, "20$3-$2-$1"));
  }

  setLocation(lat, lng) {
    //TODO
  }
}
