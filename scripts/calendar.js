import { iconBio, iconPaper, iconPlastic, iconTrash } from "./icons.js";

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
      element.classList.remove("day-event", "day-empty");
      var day = this.index_to_date(i);
      if (day == 0 && day < this.days_in_month(this.month, this.year)) {
        //TODO: Days in month
        element.classList.add("day-empty");
        element.innerHTML = "";
      } else {
        var date = new Date(this.year, this.month, day);
        if (this.eventExists(date)) {
          var html = "";
          this.getEvents(date).forEach((e) => {
            html += e.type;
          });
          element.innerHTML = "";
          var div = document.createElement("div");
          div.classList.add(
            "d-flex",
            "align-items-center",
            "justify-content-center"
          );
          div.style = "width: 100%; height: 100%";
          div.innerHTML = html + iconTrash;
          element.appendChild(div);

          var icon = div.querySelector("svg");
          icon.setAttribute("width", "32px");
          icon.setAttribute("height", "32px");
          element.classList.add("day-event");
        } else {
          element.innerHTML = day;
        }
      }
      i++;
    });
  }
  days_in_month(month, year) {
    return new Date(year, month, 0).getDate();
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
      return (
        Math.floor(date.getTime() / daymilli) ==
        Math.floor(val.date.getTime() / daymilli)
      );
    });
  }

  getEvents(date) {
    var daymilli = 1000 * 60 * 60 * 24;
    return this.events.filter((val) => {
      return (
        Math.floor(date.getTime() / daymilli) ==
        Math.floor(val.date.getTime() / daymilli)
      );
    });
  }
}

class Event {
  constructor(date, type) {
    this.date = date;
    this.type = type;
  }
}
