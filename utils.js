/**
  * Created by FishingHacks
  * https://github.com/FishingHacks/utils
*/
class ArrayList extends Array {
  constructor() {
    super();
  }

  append(el) {
    this.push(el);
  }
  clear() {
    while (this.length > 0) {
      this.shift();
    }
  }
  add(arr) {
    while (arr.length > 0) {
      this.push(arr.shift());
    }
  }
  remove(_el) {
    let newArr = this.filter((el) => el != _el);
    this.clear();
    this.add(newArr);
  }
  removeAt(_i) {
    let newArr = this.filter((el, i) => i != _i);
    this.clear();
    this.add(newArr);
  }
  search(query) {
    let arr = [];
    this.forEach((item) => {
      if (query(item)) arr.push(item);
    });

    return arr;
  }
  filter_(func) {
    let newArr = [];
    this.forEach((el, i, arr) => {
      newArr.push(func(el, i, arr));
    });
    return newArr;
  }

  random(count) {
    if (!count) count = 1;

    let items = this[Math.floor(Math.random() * this.length)];

    if (count > 1) {
      items = [];
      for (let i = 0; i < count; i++) {
        items.push(this[Math.floor(Math.random() * this.length)]);
      }
    }
    this.add(items);
  }
}

function xinspect(for_console, object, prefix) {
  if (typeof object == "undefined" || object == null) {
    return "null";
  }
  if (typeof object != "object") return "Invalid object";
  if (typeof prefix == "undefined") prefix = "";

  if (prefix.length > 50) return "[RECURSION TOO DEEP. ABORTING.]";

  var rows = [];
  for (var property in object) {
    var datatype = typeof object[property];

    var tempDescription = prefix + '"' + property + '"';
    tempDescription += " (" + datatype + ") => ";
    if (datatype == "object")
      tempDescription +=
        "object: " + xinspect(for_console, object[property], prefix + "  ");
    else tempDescription += object[property];

    rows.push(tempDescription);
  }

  let r = rows.join(prefix + "\n");
  if (!for_console) {
    while (r.indexOf("\n") > 0) {
      r = r.replace("\n", "<br>");
    }
  }
  return r;
}

let logFunctions = {
  date: (gmt = true, time = true, date = true) => {
    if (gmt) return new Date().toUTCString();
    return (
      (date ? new Date().toLocaleDateString() + " " : "") +
      (time ? new Date().toLocaleTimeString() : "")
    );
  },
  info: (proc, lvl) => `[${proc}/${lvl}]`,
};

function forEach(obj, func) {
  for (el in obj) {
    func(obj[el], el);
  }
}

function validateObject(obj, template) {
  let _templ = new ArrayList();
  let _obj = new ArrayList();
  for (prop in template) {
    if (typeof template[prop] == typeof {} && typeof obj[prop] == typeof template[prop] && obj[prop] != null) {
      _templ.append([prop, typeof template[prop], validateObject(obj[prop], template[prop])]);
    } else {
      _templ.append([prop, typeof template[prop]]);
    }
  }
  for (prop in obj) {
    if (
      typeof obj[prop] == typeof {} &&
      typeof obj[prop] == typeof template[prop] &&
      template[prop] != null
    ) {
      _obj.append([
        prop,
        typeof obj[prop],
        validateObject(obj[prop], template[prop]),
      ]);
    } else {
      _obj.append([prop, typeof obj[prop]]);
    }
  }
  let neq = false;
  let _tmp = false;
  _templ.forEach(el => {
    if (!neq) {
      _obj.forEach(_el => {
        if (el.includes(..._el)) _tmp = true;
      })
      if (!_tmp) {
        neq = true;
      }
    }
  })
  return !neq;
}

if (!globalThis["window"]) {
  module.exports = {
    forEach,
    xinspect,
    ArrayList,
    validateObject
  };
}
