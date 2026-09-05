// Intake questionnaire: step engine, branching, validation and submission.
(function () {
  var form = document.getElementById("brief");
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var backBtn = document.getElementById("back");
  var nextBtn = document.getElementById("next");
  var sendBtn = document.getElementById("send");
  var failMsg = document.getElementById("form-fail");
  var current = 0;

  function activeBranch() {
    var picked = form.querySelector('input[name="projectType"]:checked');
    return picked ? picked.value : null;
  }

  function syncBranches() {
    var branch = activeBranch();
    form.querySelectorAll(".branch").forEach(function (el) {
      var on = el.dataset.branch === branch;
      el.hidden = !on;
      el.querySelectorAll("input, textarea").forEach(function (input) {
        input.disabled = !on;
      });
    });
  }

  function show(index) {
    current = index;
    steps.forEach(function (step, i) { step.hidden = i !== index; });
    backBtn.hidden = index === 0;
    nextBtn.hidden = index === steps.length - 1;
    sendBtn.hidden = index !== steps.length - 1;
    failMsg.hidden = true;
    document.getElementById("step-now").textContent = String(index + 1);
    document.getElementById("progress-fill").style.width = ((index + 1) / steps.length) * 100 + "%";
    var heading = steps[index].querySelector("legend");
    if (heading) heading.setAttribute("tabindex", "-1"), heading.focus();
  }

  function validateStep(index) {
    var ok = true;
    var fieldset = steps[index];
    fieldset.querySelectorAll(".field-error").forEach(function (msg) { msg.hidden = true; });
    fieldset.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });

    var invalid = fieldset.querySelector("input:invalid:not(:disabled), textarea:invalid:not(:disabled)");
    if (invalid) {
      ok = false;
      var scope = invalid.closest(".field") || fieldset;
      var msg = scope.querySelector(".field-error");
      if (msg) msg.hidden = false;
      invalid.setAttribute("aria-invalid", "true");
      invalid.focus();
    }
    return ok;
  }

  form.addEventListener("change", function (event) {
    if (event.target.name === "projectType") syncBranches();
  });

  nextBtn.addEventListener("click", function () {
    if (!validateStep(current)) return;
    show(current + 1);
  });

  backBtn.addEventListener("click", function () {
    show(current - 1);
  });

  function collect() {
    var data = {};
    var formData = new FormData(form);
    formData.forEach(function (value, key) {
      if (key === "features" || key === "aiGoals") {
        (data[key] = data[key] || []).push(value);
      } else if (key === "cf-turnstile-response") {
        data.turnstileToken = value;
      } else if (key === "budgetBand") {
        data.budgetBand = value;
        var checked = form.querySelector('input[name="budgetBand"]:checked');
        var label = checked && checked.closest(".choice").querySelector("strong");
        if (label) data.budget = label.textContent.trim();
      } else {
        data[key] = value;
      }
    });
    var currency = "USD";
    try { currency = localStorage.getItem("currency") || window.__currency || "USD"; } catch (err) {}
    data.currency = currency;
    return data;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateStep(current)) return;

    var data = collect();
    failMsg.hidden = true;
    sendBtn.disabled = true;
    var restLabel = sendBtn.textContent;
    sendBtn.textContent = "Sending…";

    fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (response) { return response.json().then(function (body) { return { response: response, body: body }; }); })
      .then(function (result) {
        if (result.response.ok && result.body.ok) {
          document.getElementById("success-name").textContent = data.name || "";
          var title = document.querySelector(".contact-title");
          if (title) title.textContent = "Brief received.";
          var intro = document.querySelector(".contact-page .section-intro");
          if (intro) intro.textContent = "Here's what happens next.";
          form.hidden = true;
          document.getElementById("form-success").hidden = false;
        } else {
          throw new Error(result.body.error || "failed");
        }
      })
      .catch(function () {
        failMsg.hidden = false;
        sendBtn.disabled = false;
        sendBtn.textContent = restLabel;
        if (window.turnstile) window.turnstile.reset();
      });
  });

  // Preselect from ?plan= links on the pricing tiers.
  var plan = new URLSearchParams(window.location.search).get("plan");
  var planMap = {
    "starter": "new-site",
    "business": "new-site",
    "bespoke": "web-app",
    "care-basic": null,
    "care-growth": null,
    "care-premium": null,
  };
  if (plan && plan in planMap) {
    if (planMap[plan]) {
      var radio = form.querySelector('input[name="projectType"][value="' + planMap[plan] + '"]');
      if (radio) radio.checked = true;
    }
    if (plan.indexOf("care-") === 0) {
      var care = form.querySelector('input[name="carePlan"][value="Yes"]');
      if (care) care.checked = true;
    }
    if (plan === "starter") {
      var size = form.querySelector('input[name="siteSize"][value="A single page"]');
      if (size) size.checked = true;
    }
  }

  syncBranches();
  steps.forEach(function (step, i) { step.hidden = i !== 0; });
})();
