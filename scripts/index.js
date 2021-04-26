import TrashApiHelper from "./TrashApiHelper.js";
import { iconTrash, iconPaper, iconBio, iconPlastic } from "./icons.js";
import Calendar from "./calendar.js";
import StorageManager from "./storagemanager.js";
import ListVote from "./listvote.js";

var navheadline = document.getElementById("navHeadline");

var warning = document.getElementById("alert");

var content = document.getElementById("content");
var trashIcon = document.getElementById("trashIcon");
/**
const iconTrash =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n</svg>';
const iconPaper =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">\n  <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>\n</svg>';
const iconBio =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flower1" viewBox="0 0 16 16">\n  <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5l-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134l.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196l.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>\n</svg>';
const iconPlastic =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-straw" viewBox="0 0 16 16">\n  <path d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0l-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z"/>\n</svg>';
 */

var contA = document.getElementById("containerA");
var contB = document.getElementById("containerB");
var contC = document.getElementById("containerC");

var divA = document.getElementById("divA");
var divB = document.getElementById("divB");
var divC = document.getElementById("divC");

var flex = document.getElementById("flexDiv");

var firstCont = 1;
var sndCont = 2;

var sm = new StorageManager();

if (!sm.idExists("street") || !sm.idExists("nr")) {
  window.location.href = "/KarlsruheTrashWebApp/setup";
}

var street = sm.getById("street");
var nr = sm.getById("nr");

navheadline.innerHTML = street + " " + nr;

var tah = new TrashApiHelper(
  street,
  nr,
  "https://karlsruhe-trash.azurewebsites.net/api/HttpTrigger?street={street}&nr={nr}"
);
tryGetData();

function tryGetData() {
  if (tah.data.length == 0) {
    setTimeout(tryGetData, 500);
  } else {
    renderTimeline(tah.getByDate());
    tah.getByDate().forEach((e) => {
      e[1].forEach((type) => {
        cal.addEvent(e[0], type);
      });
    });
    cal.render();

    renderWarning(tah.getByType());
  }
}
var today = new Date();
var cal = new Calendar(
  document.getElementById("calendar"),
  today.getMonth(),
  today.getFullYear()
);

cal.render();

var vote = new ListVote();

function renderWarning(byType) {
  var dayInMs = 24 * 60 * 60 * 1000;

  warning.innerHTML = "";

  byType.forEach((val) => {
    var spacing = val[1].map((v, index, array) => {
      if (index == 0) {
        return 0;
      } else {
        return Math.floor((v.getTime() - array[index - 1].getTime()) / dayInMs);
      }
    });
    spacing.splice(0, 1);

    var winner = vote.getWinner(spacing);

    var nonWinner = spacing.map((v) => {
      return v != winner;
    });

    var isChanged = spacing.map((v, i, a) => {
      // Leerung geändert, Plan nicht erkennbar
      return nonWinner[i] && (i == a.length - 1 || !nonWinner[i + 1]);
    });

    var isSpecial = spacing.map((v, i, a) => {
      // Leerung einmalig außerplanmäßig
      return nonWinner[i] && i != a.length - 1 && nonWinner[i + 1];
    });

    function addToWarning(text, info) {
      var a = document.createElement("p");
      a.innerHTML = text + ": " + info;
      warning.appendChild(a);
    }

    spacing.forEach((v, i) => {
      if (isChanged[i]) {
        addToWarning(
          "Leerung nicht regelmäßig",
          val[0] + " " + val[1][i].toLocaleDateString()
        );
      } else if (isSpecial[i]) {
        addToWarning(
          "Folgende Leerung ist außerplanmäßig",
          val[0] + " " + val[1][i + 1].toLocaleDateString()
        );
      } else {
        //addToWarning("Test", val[0] + " " + val[1][i + 1].toLocaleDateString());
      }
    });
  });

  if (warning.innerHTML.length > 0) {
    warning.removeAttribute("hidden");
  } else {
    warning.setAttribute("hidden", "");
  }
}

function renderTimeline(byDate) {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  var tl = document.createElement("ul");
  tl.classList = ["timeline"];

  byDate.forEach((e) => {
    var event = document.createElement("li");
    event.className = ["event"];
    var date = document.createElement("h4");

    e[1].forEach((type) => {
      var h2 = document.createElement("h3");

      switch (type) {
        case "Papier":
          h2.innerHTML = iconPaper + " " + type;
          break;
        case "Bioabfall":
          h2.innerHTML = iconBio + " " + type;
          break;
        case "Wertstoff":
          h2.innerHTML = iconPlastic + " " + type;
          break;
        default:
          h2.innerHTML = iconTrash + " " + type;
          break;
      }
      var icon = h2.querySelector("svg");
      icon.setAttribute("width", "20px");
      icon.setAttribute("height", "20px");
      event.appendChild(h2);
    });

    var dateContent = document.createElement("span");
    dateContent.classList.add("badge", "bg-secondary", "timeline-badge");
    dateContent.innerHTML =
      e[0].getDate() +
      "." +
      (e[0].getMonth() + 1) +
      "." +
      (e[0].getYear() - 100);
    /*
    date.onclick = function (e) {
      document.querySelectorAll(".timeline-badge-clicked").forEach((s) => {
        s.classList.remove("timeline-badge-clicked");
      });

      var date = tah.date_from_string(e.target.innerHTML);
      e.target.classList.add("timeline-badge-clicked");
      cal.month = date.getMonth();
      cal.year = date.getFullYear();
      cal.markDay(date);
      cal.render();
      openContainer(2);
    };
*/
    event.onclick = function (e) {
      document.querySelectorAll(".timeline-badge-clicked").forEach((s) => {
        s.classList.remove("timeline-badge-clicked");
      });

      var date = tah.date_from_string(event.children[0].innerText);
      event.children[0].children[0].classList.add("timeline-badge-clicked");
      cal.month = date.getMonth();
      cal.year = date.getFullYear();
      cal.markDay(date);
      cal.render();
      openContainer(2);
    };

    date.appendChild(dateContent);
    event.insertBefore(date, event.querySelector("h3"));
    tl.appendChild(event);
  });
  content.appendChild(tl);
}

function openContainer(id) {
  if (id == firstCont || !isMobileFormat()) {
    return;
  } else {
    sndCont = firstCont;
    firstCont = id;
  }

  contA.hidden = true;
  contB.hidden = true;
  contC.hidden = true;

  contA.classList.remove("order-1", "order-2");
  contB.classList.remove("order-1", "order-2");
  contC.classList.remove("order-1", "order-2");

  switch (firstCont) {
    case 1:
      contA.hidden = false;
      contA.classList.add("order-1");
      break;
    case 2:
      contB.hidden = false;
      contB.classList.add("order-1");
      break;
    case 3:
      contC.hidden = false;
      contC.classList.add("order-1");
      break;
  }
  switch (sndCont) {
    case 1:
      contA.hidden = false;
      contA.classList.add("order-2");
      break;
    case 2:
      contB.hidden = false;
      contB.classList.add("order-2");
      break;
    case 3:
      contC.hidden = false;
      contC.classList.add("order-2");
      break;
  }

  window.scroll(0, 0);
}

function changeMonthBy(n) {
  cal.month += n;
  if (cal.month < 0) {
    cal.month += 12;
    cal.year -= 1;
  } else if (cal.month > 11) {
    cal.month -= 12;
    cal.year += 1;
  }
  cal.render();
}

function isMobileFormat() {
  return Math.abs(contA.offsetTop - contB.offsetTop) > 10;
}

window.changeMonthBy = changeMonthBy;

document.getElementById("btnPrev").onclick = (e) => {
  changeMonthBy(-1);
};

document.getElementById("btnNext").onclick = (e) => {
  changeMonthBy(1);
};
