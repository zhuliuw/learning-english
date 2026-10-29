/* Page counts for the static site.
   Sends this page's path and the time only. No name.
   The number is kept by Abacus (no account). GitHub Pages cannot store it.
   https://abacus.jasoncameron.dev */
(function () {
  var NAMESPACE = "zhuliuw-learning-english";
  var HOST = "https://abacus.jasoncameron.dev";

  function normalize(path) {
    var marker = "/learning-english";
    if (path === marker || path.indexOf(marker + "/") === 0) {
      path = path.slice(marker.length) || "/";
    }
    if (!path) path = "/";
    if (path !== "/" && path.charAt(path.length - 1) !== "/") path += "/";
    if (path === "/index.html/") path = "/";
    return path;
  }

  function keyFor(path) {
    path = normalize(path);
    if (path === "/") return "home";
    return path.replace(/^\//, "").replace(/\/$/, "").replace(/[^A-Za-z0-9]+/g, "-");
  }

  function hit(path) {
    if (!window.fetch) return;
    var time = new Date().toISOString();
    var url = HOST + "/hit/" + NAMESPACE + "/" + keyFor(path)
      + "?path=" + encodeURIComponent(normalize(path))
      + "&t=" + encodeURIComponent(time);
    fetch(url, { method: "GET", cache: "no-store", keepalive: true }).catch(function () {});
  }

  hit(location.pathname);
})();
