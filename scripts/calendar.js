export default class Calendar {
  constructor(root, month, year) {
    this.root = root;
    this.events = [];
    this.month = month;
    this.year = year;
    if (year < 2000) {
      this.year = 2000 + (year % 100);
    }

    this.monthList = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
  }

  addEvent(date, typeId) {
    this.events.push(new Event(date, typeId));
  }

  render() {
    var headline = this.root.querySelector("h3");
    headline.innerHTML = this.monthList[this.month] + " " + this.year;

    var elements = this.root.querySelectorAll(".day");
    var i = 0;
    elements.forEach((element) => {
      //console.log(element);
      element.innerHTML = i;

      i++;
    });
  }

  index_to_date(i) {
    var offset = (new Date(this.year, this.month, 1).getDay() - 1) % 7;

    if (offset > i) {
      return 0;
    }

    var week = Math.floor(i / 5);
    var day = i % 5;
    return 7 * week + day - offset + 1;
  }

  eventExists(date) {
    var daymilli = 1000 * 60 * 60 * 24;
    return this.events.some((val) => {
      return date.getTime() % daymilli == val.getTime() % daymilli;
    });
  }
}

class Event {
  constructor(date, type) {
    this.date = date;
    this.type = type;
  }
}
