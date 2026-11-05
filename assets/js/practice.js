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
    var lang = (document.documentElement.lang || "").toLowerCase();
    var en = lang.indexOf("en") === 0;

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

    function markLabel(button, on) {
      var base = button.getAttribute("data-label") || button.textContent.trim();
      if (!button.getAttribute("data-label")) button.setAttribute("data-label", base);
      var prefix = on
        ? (en ? "Marked. " : "已标。")
        : (en ? "Not marked. " : "未标。");
      button.setAttribute("aria-label", prefix + base);
    }

    for (var m = 0; m < marks.length; m++) {
      markLabel(marks[m], marks[m].getAttribute("aria-pressed") === "true");
    }

    function tried() {
      if (fields.length) {
        for (var i = 0; i < fields.length; i++) {
          if (!fields[i].value.trim()) return false;
        }
        return true;
      }
      if (marks.length) {
        for (var j = 0; j < marks.length; j++) {
          if (marks[j].getAttribute("aria-pressed") !== "true") return false;
        }
        return true;
      }
      return true;
    }

    var round = document.querySelector(".round[data-wait]");
    var roundStatus = null;
    var announceRound = false;

    function ensureRoundStatus() {
      if (!round || roundStatus) return;
      roundStatus = document.createElement("p");
      roundStatus.className = "round-status";
      roundStatus.setAttribute("aria-live", "polite");
      roundStatus.hidden = true;
      round.insertBefore(roundStatus, round.firstChild);
    }

    function syncRound() {
      if (!round || !tried()) return;
      var wasHidden = round.hidden;
      round.hidden = false;
      if (wasHidden && announceRound) {
        ensureRoundStatus();
        if (roundStatus) {
          roundStatus.hidden = false;
          roundStatus.textContent = en
            ? "A short word-order round is ready below."
            : "下面多了一轮排词。";
        }
        var heading = round.querySelector("h2");
        if (heading) {
          if (!heading.id) heading.id = "round-heading";
          heading.setAttribute("tabindex", "-1");
          try {
            heading.focus({ preventScroll: false });
          } catch (err) {
            heading.focus();
          }
        }
      }
    }

    function onField() {
      if (note && tried()) note.hidden = true;
      announceRound = true;
      syncRound();
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
        markLabel(button, on);
        announceRound = true;
        syncRound();
        writeStore();
      });
    }

    syncRound();

    for (var k = 0; k < locks.length; k++) {
      locks[k].addEventListener("click", function (event) {
        if (tried()) return;
        event.preventDefault();
        if (note) {
          note.hidden = false;
          try {
            note.focus({ preventScroll: false });
          } catch (err) {
            /* note may not be focusable */
          }
        }
      });
      locks[k].addEventListener("toggle", function (event) {
        var details = event.currentTarget;
        if (details.open && !tried()) details.open = false;
      });
    }

    if (note && !note.hasAttribute("tabindex")) {
      note.setAttribute("tabindex", "-1");
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

    var lang = (document.documentElement.lang || "").toLowerCase();
    var en = lang.indexOf("en") === 0;
    var bankLabel = bank.getAttribute("aria-label") || (en ? "Word bank" : "词");
    var lineLabel = line.getAttribute("aria-label") || (en ? "Your order" : "你排的顺序");
    bank.setAttribute("role", "group");
    line.setAttribute("role", "group");
    bank.setAttribute("aria-label", bankLabel);
    line.setAttribute("aria-label", lineLabel);

    var order = shuffle(words);
    for (var i = 0; i < order.length; i++) {
      bank.appendChild(makeButton(order[i]));
    }

    function makeButton(word) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = word;
      button.setAttribute(
        "aria-label",
        en ? word + ". Add to your order." : word + "。点到你排的顺序。"
      );
      button.addEventListener("click", onTap);
      return button;
    }

    function onTap(event) {
      var button = event.currentTarget;
      var word = button.textContent;
      if (button.parentNode === bank) {
        line.appendChild(button);
        button.setAttribute(
          "aria-label",
          en ? word + ". Remove from your order." : word + "。从顺序里拿回。"
        );
      } else {
        bank.appendChild(button);
        button.setAttribute(
          "aria-label",
          en ? word + ". Add to your order." : word + "。点到你排的顺序。"
        );
      }
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
