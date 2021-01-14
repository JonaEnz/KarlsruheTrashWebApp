import StorageManager from "./storagemanager.js";

var sm = new StorageManager();

var btnSave = document.getElementById("btnSave");
var street = document.getElementById("street");
var nr = document.getElementById("nr");

btnSave.onclick = function (e) {
  //TODO: Validate Data (tah?)
  sm.save("street", street.value);
  sm.save("nr", nr.value);
  window.location.href = "/";
};
