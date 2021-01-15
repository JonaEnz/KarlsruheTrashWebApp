export default class StorageManager {
  constructor() {}

  save(id, val) {
    localStorage.setItem(id, val);
  }

  getById(id) {
    var item = localStorage.getItem(id);
    if (item) {
      return item;
    } else {
      throw new Error("Item with id -" + id + "- doesn't exist");
    }
  }

  idExists(id) {
    if (localStorage.getItem(id)) {
      return true;
    } else {
      return false;
    }
  }
}
