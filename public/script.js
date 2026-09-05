// Currency localisation: default USD; Cloudflare's /cdn-cgi/trace supplies the
// visitor's country, and a manual toggle (persisted locally) overrides it.
(function () {
  var EU = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"];
  var KEY = "currency";

  function apply(code) {
    window.__currency = code;
    document.querySelectorAll("[data-usd]").forEach(function (el) {
      el.textContent = el.dataset[code.toLowerCase()] || el.dataset.usd;
    });
    document.querySelectorAll(".currency-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.currency === code));
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".currency-toggle button");
    if (!btn) return;
    try { localStorage.setItem(KEY, btn.dataset.currency); } catch (err) {}
    apply(btn.dataset.currency);
  });

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (err) {}
  if (saved) {
    apply(saved);
    return;
  }

  fetch("/cdn-cgi/trace")
    .then(function (r) { return r.text(); })
    .then(function (t) {
      var m = t.match(/^loc=([A-Z]+)$/m);
      if (!m) return;
      if (m[1] === "GB") apply("GBP");
      else if (EU.indexOf(m[1]) !== -1) apply("EUR");
    })
    .catch(function () {});
})();
