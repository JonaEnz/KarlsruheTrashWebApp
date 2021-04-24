import StorageManager from "./storagemanager.js";
import TrashApiHelper from "./TrashApiHelper.js";

var sm = new StorageManager();
var tah = null;

var btnSave = document.getElementById("btnSave");
var street = document.getElementById("street");
var nr = document.getElementById("nr");
var ae = document.getElementById("adressError");

var btnPos = document.getElementById("btnPos");

if (sm.idExists("street")) {
  street.value = sm.getById("street");
}
if (sm.idExists("nr")) {
  nr.value = sm.getById("nr");
}

function waitForData() {
  if (!tah) {
    return;
  }
  switch (tah.success) {
    case -1:
      //wait
      setTimeout(waitForData, 100);
      return;
    case 0:
      //failure, show warning on input
      street.removeAttribute("disabled");
      nr.removeAttribute("disabled");
      ae.style.setProperty("visibility", "visible");
      return;
    case 1:
      sm.save("street", street.value);
      sm.save("nr", nr.value);

      window.location.href = "/KarlsruheTrashWebApp/";
  }
}

btnSave.onclick = function (e) {
  street.value = street.value
    .replace("str.", "straße")
    .replace("wg.", "weg")
    .trim();

  tah = new TrashApiHelper(
    street.value,
    nr.value,
    "https://karlsruhe-trash.azurewebsites.net/api/HttpTrigger?street={street}&nr={nr}"
  );

  street.setAttribute("disabled", true);
  nr.setAttribute("disabled", true);
  ae.style.setProperty("visibility", "hidden");

  waitForData();
};

if (!("geolocation" in navigator)) {
  btnPos.setAttribute("disabled");
}

btnPos.onclick = function (e) {
  navigator.geolocation.getCurrentPosition(
    (result) => {
      try {
        fetch(
          "https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
            .replace("{lat}", result.coords.latitude)
            .replace("{lon}", result.coords.longitude)
        ).then((resp) => {
          var json = resp.json();
          if (json.address.road && json.address.house_nr) {
            street.value = json.address.road;
            nr.value = json.address.house_nr;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    (error) => {
      btnPos.setAttribute("disabled");
    }
  );
};
