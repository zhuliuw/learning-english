/* Lesson practice. Stays in this browser for this visit. Nothing is sent. */
(function () {
  setupPractice();
  setupRound();

  function setupPractice() {
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
  }

  function setupRound() {
    var round = document.querySelector(".round[data-round]");
    if (!round) return;

    var words = round.getAttribute("data-round").trim().split(/\s+/);
    var bank = round.querySelector(".round-bank");
    var line = round.querySelector(".round-line");
    var note = round.querySelector(".round-note");
    var okText = round.getAttribute("data-ok") || "";
    var noText = round.getAttribute("data-no") || "";
    if (!bank || !line || words.length < 3) return;

    var order = shuffle(words);
    for (var i = 0; i < order.length; i++) {
      bank.appendChild(makeButton(order[i]));
    }

    function makeButton(word) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = word;
      button.addEventListener("click", onTap);
      return button;
    }

    function onTap(event) {
      var button = event.currentTarget;
      if (button.parentNode === bank) line.appendChild(button);
      else bank.appendChild(button);
      check();
    }

    function check() {
      if (!note) return;
      var placed = line.querySelectorAll("button");
      if (placed.length !== words.length) {
        note.hidden = true;
        note.removeAttribute("data-state");
        return;
      }
      var right = true;
      for (var i = 0; i < words.length; i++) {
        if (placed[i].textContent !== words[i]) right = false;
      }
      note.hidden = false;
      note.textContent = right ? okText : noText;
      note.setAttribute("data-state", right ? "ok" : "no");
    }

    function shuffle(list) {
      var out = list.slice();
      for (var i = out.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = out[i];
        out[i] = out[j];
        out[j] = tmp;
      }
      var same = true;
      for (var k = 0; k < out.length; k++) {
        if (out[k] !== list[k]) same = false;
      }
      if (same && out.length > 1) {
        var first = out[0];
        out[0] = out[1];
        out[1] = first;
      }
      return out;
    }
  }
})();
