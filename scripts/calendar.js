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
    var headline = this.root.querySelector("#calHeadline");
    headline.innerHTML = this.monthList[this.month] + " " + this.year;

    var elements = this.root.querySelectorAll(".day");
    var i = 0;
    elements.forEach((element) => {
      //console.log(element);
      element.classList.remove("day-event", "day-empty");
      var day = this.index_to_date(i);
      if (day == 0 || day > this.days_in_month(this.month, this.year)) {
        //TODO: Days in month
        element.classList.add("day-empty");
        element.innerHTML = "";
      } else {
        var date = new Date(this.year, this.month, day);
        if (this.eventExists(date)) {
          var html = "";
          this.getEvents(date).forEach((e) => {
            //html += e.type;
          });
          element.innerHTML = "";
          var div = document.createElement("div");
          div.classList.add(
            "d-flex",
            "align-items-center",
            "justify-content-center"
          );
          div.style = "width: 100%; height: 100%";
          switch (this.getEvents(date)[0].type) {
            case "Papier":
              html += iconPaper;
              break;
            case "Bioabfall":
              html += iconBio;
              break;
            case "Wertstoff":
              html += iconPlastic;
              break;
            default:
              html += iconTrash;
              break;
          }
          div.innerHTML = html;
          element.appendChild(div);

          var icon = div.querySelector("svg");
          icon.setAttribute("width", "32px");
          icon.setAttribute("height", "32px");

          element.classList.add("day-event");
        } else {
          //No event, show day
          element.innerHTML = day;
          element.style = "font-size: 20px";
        }
      }
      i++;
    });
  }
  days_in_month(month, year) {
    return new Date(year, month + 1, 0).getDate();
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
    return this.events.some((val) => {
      return this.sameDay(date, val.date);
    });
  }

  getEvents(date) {
    return this.events.filter((val) => {
      return this.sameDay(date, val.date);
    });
  }

  sameDay(d1, d2) {
    return (
      d1.getFullYear() == d2.getFullYear() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getDate() == d2.getDate()
    );
  }
}

class Event {
  constructor(date, type) {
    this.date = date;
    this.type = type;
  }
}
