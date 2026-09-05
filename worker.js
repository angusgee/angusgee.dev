// Contact form API. Static assets are served by the assets binding; only
// /api/* reaches this code (run_worker_first in wrangler.jsonc).

const MAX_BODY_BYTES = 10000;
const LONG_FIELDS = new Set(["details", "about", "notes"]);

const PROJECT_TYPES = {
  "new-site": "New website",
  "redesign": "Redesign",
  "web-app": "Web app or online shop",
  "ai": "AI integration or automation",
  "not-sure": "Not sure yet",
};

// Order and labels for the email body. Unanswered fields are skipped.
const EMAIL_LINES = [
  ["projectType", "Project type", (v) => PROJECT_TYPES[v]],
  ["siteSize", "Site size"],
  ["branding", "Branding"],
  ["content", "Content"],
  ["currentUrl", "Current site"],
  ["problem", "Main problem"],
  ["features", "Features", (v) => v.join(", ")],
  ["aiGoals", "AI goals", (v) => v.join(", ")],
  ["details", "Details"],
  ["about", "About the business"],
  ["timeline", "Timeline"],
  ["budget", "Budget"],
  ["currency", "Currency shown"],
  ["carePlan", "Care plan interest"],
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["phone", "Phone"],
  ["notes", "Anything else"],
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405);
      }
      return handleContact(request, env);
    }
    if (url.pathname.startsWith("/api/")) {
      return json({ ok: false, error: "not_found" }, 404);
    }
    return env.ASSETS.fetch(request);
  },
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function handleContact(request, env) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // Honeypot: bots that fill the hidden field get a quiet "success".
  if (body.website) {
    return json({ ok: true });
  }

  const clean = {};
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") {
      clean[key] = value.trim().slice(0, LONG_FIELDS.has(key) ? 2000 : 200);
    } else if (Array.isArray(value)) {
      clean[key] = value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim().slice(0, 100))
        .slice(0, 10);
    }
  }

  const invalid = [];
  if (!clean.name) invalid.push("name");
  if (!clean.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) invalid.push("email");
  if (!clean.projectType || !(clean.projectType in PROJECT_TYPES)) invalid.push("projectType");
  if (invalid.length) {
    return json({ ok: false, error: "invalid_fields", fields: invalid }, 400);
  }

  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: typeof body.turnstileToken === "string" ? body.turnstileToken : "",
      remoteip: request.headers.get("CF-Connecting-IP") || "",
    }),
  });
  const outcome = await verification.json();
  if (!outcome.success) {
    return json({ ok: false, error: "verification_failed" }, 403);
  }

  const projectLabel = PROJECT_TYPES[clean.projectType];
  const subject = `New enquiry: ${clean.name} (${projectLabel})`;
  const lines = [];
  for (const [key, label, format] of EMAIL_LINES) {
    const value = clean[key];
    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) continue;
    lines.push(`${label}: ${format ? format(value) : value}`);
  }
  const text = `New project enquiry from angusgee.dev/contact\n\n${lines.join("\n")}\n`;

  try {
    await env.EMAIL.send({
      to: "info@angusgee.dev",
      from: "enquiries@angusgee.dev",
      replyTo: clean.email,
      subject,
      text,
    });
  } catch (err) {
    console.error("email send failed:", err && err.code, err && err.message);
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}
