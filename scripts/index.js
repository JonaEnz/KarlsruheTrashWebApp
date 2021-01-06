import TrashApiHelper from "./TrashApiHelper.js";

var tah = new TrashApiHelper(
  "Lebrechtstraße",
  52,
  "https://karlsruhe-trash.azurewebsites.net/api/HttpTrigger?street={street}&nr={nr}"
);
setTimeout(() => {
  console.log(tah.getByDate());
  console.log(tah.getByType());
}, 500);
