/* Lesson practice. Stays in this browser for this visit. Nothing is sent. */
(function () {
  var block = document.querySelector("[data-practice]");
  if (!block) return;

  var fields = block.querySelectorAll("textarea, input");
  var marks = block.querySelectorAll("button[aria-pressed]");
  var note = block.querySelector(".need");
  var locks = document.querySelectorAll("details[data-locked]");
  var key = "practice:" + location.pathname;

  function readStore() {
    try {
      return JSON.parse(sessionStorage.getItem(key) || "null");
    } catch (err) {
      return null;
    }
  }

  function writeStore() {
    var data = { fields: [], marks: [] };
    for (var i = 0; i < fields.length; i++) data.fields.push(fields[i].value);
    for (var j = 0; j < marks.length; j++) {
      data.marks.push(marks[j].getAttribute("aria-pressed") === "true");
    }
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      /* Private mode can refuse storage. The text still stays in the page. */
    }
  }

  var saved = readStore();
  if (saved) {
    if (saved.fields) {
      for (var i = 0; i < fields.length && i < saved.fields.length; i++) {
        fields[i].value = saved.fields[i];
      }
    }
    if (saved.marks) {
      for (var j = 0; j < marks.length && j < saved.marks.length; j++) {
        marks[j].setAttribute("aria-pressed", saved.marks[j] ? "true" : "false");
      }
    }
  }

  function tried() {
    if (!fields.length) return true;
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].value.trim()) return false;
    }
    return true;
  }

  function onField() {
    if (note && tried()) note.hidden = true;
    writeStore();
  }

  for (var i = 0; i < fields.length; i++) {
    fields[i].addEventListener("input", onField);
  }

  for (var j = 0; j < marks.length; j++) {
    marks[j].addEventListener("click", function (event) {
      var button = event.currentTarget;
      var on = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", on ? "true" : "false");
      writeStore();
    });
  }

  for (var k = 0; k < locks.length; k++) {
    locks[k].addEventListener("click", function (event) {
      if (tried()) return;
      event.preventDefault();
      if (note) note.hidden = false;
    });
    locks[k].addEventListener("toggle", function (event) {
      var details = event.currentTarget;
      if (details.open && !tried()) details.open = false;
    });
  }
})();
