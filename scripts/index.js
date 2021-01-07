import TrashApiHelper from "./TrashApiHelper.js";

var content = document.getElementById("content");
var trashIcon = document.getElementById("trashIcon");
const ti =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 20 20">\n      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>\n    </svg>';

var tah = new TrashApiHelper(
  "Lebrechtstraße",
  52,
  "https://karlsruhe-trash.azurewebsites.net/api/HttpTrigger?street={street}&nr={nr}"
);
tryGetData();

function tryGetData() {
  if (tah.data.length == 0) {
    setTimeout(tryGetData, 500);
  } else {
    renderTimeline(tah.getByDate());
  }
}

function renderTimeline(byDate) {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  byDate.forEach((e) => {
    var tl = document.createElement("ul");
    tl.classList = ["timeline"];
    var event = document.createElement("li");
    event.className = ["event"];
    var h2 = document.createElement("h2");
    var h3 = document.createElement("h3");
    h2.innerHTML = ti + e[0];
    h3.innerHTML =
      e[1].getDate() +
      "." +
      (e[1].getMonth() + 1) +
      "." +
      (e[1].getYear() - 100);

    event.appendChild(h2);
    event.appendChild(h3);
    tl.appendChild(event);
    content.appendChild(tl);
  });
}
