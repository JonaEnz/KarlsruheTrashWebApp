import StorageManager from "./storagemanager.js";
import TrashApiHelper from "./TrashApiHelper.js";

var sm = new StorageManager();
var tah = null;

var btnSave = document.getElementById("btnSave");
var street = document.getElementById("street");
var nr = document.getElementById("nr");
var api = document.getElementById("api");
var ae = document.getElementById("adressError");
var accErr = document.getElementById("accuracyError");

var btnPos = document.getElementById("btnPos");

const ACCURACY_MIN = 100;

if (sm.idExists("street")) {
  street.value = sm.getById("street");
}
if (sm.idExists("nr")) {
  nr.value = sm.getById("nr");
}
if (sm.idExists("apiPath")) {
  api.value = sm.getById("apiPath");
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
      api.removeAttribute("disabled");
      ae.style.setProperty("display", "block");
      return;
    case 1:
      sm.save("street", street.value);
      sm.save("nr", nr.value);
      sm.save("apiPath", api.value)

      window.location.href = "/KarlsruheTrashWebApp/";
  }
}

btnSave.onclick = function () {
  street.value = street.value
    .replace("str.", "straße")
    .replace("wg.", "weg")
    .trim();

  tah = new TrashApiHelper(
    street.value,
    nr.value,
    `https://${api.value}?street={street}&nr={nr}`
  );

  street.setAttribute("disabled", true);
  nr.setAttribute("disabled", true);
  api.setAttribute("disabled", true);
  ae.style.setProperty("display", "none");

  waitForData();
};

if (!("geolocation" in navigator)) {
  btnPos.setAttribute("disabled");
}

btnPos.onclick = function (e) {
  accErr.style.setProperty("display", "none");
  navigator.geolocation.getCurrentPosition(
    (result) => {
      if (result.coords.accuracy > ACCURACY_MIN) {
        accErr.style.setProperty("display", "block");
        return;
      }
      try {
        fetch(
          "https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
            .replace("{lat}", result.coords.latitude)
            .replace("{lon}", result.coords.longitude)
        ).then((resp) => {
          resp.json().then((res) => {
            if (res.address.road && res.address.house_number) {
              street.value = res.address.road;
              nr.value = res.address.house_number;
              btnPos.classList.remove("btn-warning", "btn-danger");
              btnPos.classList.add("btn-success");
            }
          });
        });
      } catch (error) {
        console.log(error);
        btnPos.classList.remove("btn-warning", "btn-success");
        btnPos.classList.add("btn-danger");
      }
    },
    (error) => {
      console.log(error);
      btnPos.setAttribute("disabled");
    },
    { enableHighAccuracy: true }
  );
};
