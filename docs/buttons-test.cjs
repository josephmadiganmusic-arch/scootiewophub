// Every button and link on the site, tapped for real on a phone emulation and
// clicked for real on desktop. Two layers:
//   1. Hit test: for every visible interactive element, the point at its centre
//      must resolve to that element (or something inside it). Anything else means
//      a fixed layer is sitting on top of it and taps die there.
//   2. Flows: each button does what it says (scrolls, opens, links out).
// Run from C:\Users\jocej\pw-temp with NODE_PATH set to its node_modules:
//   SITE_URL=https://... node docs/buttons-test.cjs
const { chromium, devices } = require("playwright");

const URL = process.env.SITE_URL || "http://localhost:5180/";
const fails = [];
const passes = [];
const ok = (name) => passes.push(name);
const bad = (name, why) => fails.push(`${name}: ${why}`);

async function hitTestAll(page, label) {
  const items = await page.evaluate(() => {
    const out = [];
    const els = document.querySelectorAll("a[href], button");
    for (const el of els) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width < 2 || r.height < 2 || cs.visibility === "hidden" || cs.display === "none") continue;
      out.push({ text: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40), tag: el.tagName, idx: out.length });
    }
    return out;
  });
  const handles = await page.$$("a[href], button");
  let tested = 0;
  for (const h of handles) {
    const info = await h.evaluate((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2 || cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0") return null;
      return { text: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40) };
    });
    if (!info) continue;
    // ignore anything inside a closed sheet/dialog
    const inHidden = await h.evaluate((el) => !!el.closest('[aria-hidden="true"]'));
    if (inHidden) continue;
    await h.evaluate((el) => el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" }));
    await page.waitForTimeout(260);
    const res = await h.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const hit = document.elementFromPoint(x, y);
      const good = hit && (hit === el || el.contains(hit));
      return { good, hit: hit ? hit.tagName + "." + String(hit.className).slice(0, 50) : "none", x: Math.round(x), y: Math.round(y) };
    });
    tested++;
    if (!res.good) bad(`${label} hit test "${info.text}"`, `covered by ${res.hit} at ${res.x},${res.y}`);
  }
  ok(`${label} hit test: ${tested} elements checked (${items.length} visible)`);
}

async function tapOrClick(page, locator, mobile) {
  if (mobile) await locator.tap({ timeout: 6000 });
  else await locator.click({ timeout: 6000 });
}

async function expectPopup(ctx, page, locator, mobile, name, urlPart) {
  const p = ctx.waitForEvent("page", { timeout: 6000 }).catch(() => null);
  try {
    await locator.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(150);
    await tapOrClick(page, locator, mobile);
  } catch (e) {
    bad(name, "tap failed: " + String(e).split("\n")[0]);
    return;
  }
  const popup = await p;
  if (!popup) return bad(name, "no new tab opened");
  await popup.waitForLoadState("domcontentloaded").catch(() => {});
  const u = popup.url();
  await popup.close();
  if (urlPart && !u.includes(urlPart)) return bad(name, `opened ${u}, expected ${urlPart}`);
  ok(`${name} -> ${u.slice(0, 70)}`);
}

async function expectScroll(page, locator, mobile, name, targetId) {
  const before = await page.evaluate(() => window.scrollY);
  try {
    await locator.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(150);
    await tapOrClick(page, locator, mobile);
  } catch (e) {
    return bad(name, "tap failed: " + String(e).split("\n")[0]);
  }
  await page.waitForTimeout(2200);
  const near = await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return { top: null };
    return { top: Math.round(el.getBoundingClientRect().top) };
  }, targetId);
  if (near.top === null) return bad(name, `no #${targetId}`);
  if (near.top > 220 || near.top < -400) return bad(name, `#${targetId} top is ${near.top}px after tap (scrollY ${before})`);
  ok(`${name} -> #${targetId} at ${near.top}px`);
}

async function run(mobile) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(mobile ? { ...devices["iPhone 14"] } : { viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const label = mobile ? "phone" : "desktop";
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  // wake every reveal so opacity is not 0 anywhere
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(800);

  await hitTestAll(page, label);

  // Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await expectScroll(page, page.locator("#top button", { hasText: "Shop the drop" }).first(), mobile, `${label} hero Shop the drop`, "products");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expectScroll(page, page.locator("#top button", { hasText: "Listen" }).first(), mobile, `${label} hero Listen`, "music");

  if (mobile) {
    // Header on phones: App plus the green Shop button, no menu (owner, 2026-09-29)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    if (await page.locator('[aria-controls="mobile-nav"]').count()) bad(`${label} header`, "hamburger menu is back");
    await expectScroll(page, page.locator("header button", { hasText: /^Shop$/ }).filter({ visible: true }).first(), true, `${label} header Shop`, "products");
    // Tab bar
    const bar = page.locator('nav[aria-label="Quick jumps"]');
    await expectScroll(page, bar.locator("button", { hasText: "Shop" }), true, `${label} tab bar Shop`, "products");
    await expectScroll(page, bar.locator("button", { hasText: "Music" }), true, `${label} tab bar Music`, "music");
    await tapOrClick(page, bar.locator("button", { hasText: "Home" }), true);
    await page.waitForTimeout(3000);
    const y = await page.evaluate(() => window.scrollY);
    if (y > 5) bad(`${label} tab bar Home`, `scrollY ${y}`); else ok(`${label} tab bar Home -> top`);
    await expectPopup(ctx, page, bar.locator('a[aria-label*="live" i]'), true, `${label} tab bar Live`, "rolloutheaven.com");
    await expectScroll(page, bar.locator("button", { hasText: "Sign up" }), true, `${label} tab bar Sign up`, "signup");
  } else {
    for (const item of ["About", "Products", "News", "Artists", "Music", "Sign Up", "Gallery"]) {
      const id = item === "Sign Up" ? "signup" : item.toLowerCase();
      await expectScroll(page, page.locator('nav[aria-label="Sections"] button', { hasText: new RegExp(`^${item}$`) }), false, `${label} nav ${item}`, id);
    }
    await expectScroll(page, page.locator("header button", { hasText: /^Shop$/ }).filter({ visible: true }).first(), false, `${label} nav Shop`, "products");
  }

  // Add as app
  {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const btn = page.locator('header button[aria-label*="Add STARRBABY"]').filter({ visible: true }).first();
    try { await tapOrClick(page, btn, mobile); } catch (e) { bad(`${label} Add as app`, String(e).split("\n")[0]); }
    await page.waitForTimeout(500);
    const dlg = page.locator('[role="dialog"][aria-labelledby="install-title"]');
    if (!(await dlg.count())) bad(`${label} Add as app`, "steps dialog did not open"); else {
      ok(`${label} Add as app opens the steps`);
      await tapOrClick(page, dlg.locator('button[aria-label="Close"]'), mobile);
      await page.waitForTimeout(300);
      if (await page.locator('[role="dialog"][aria-labelledby="install-title"]').count()) bad(`${label} Add as app close`, "still open"); else ok(`${label} Add as app close`);
    }
  }

  // Shop panel
  const panel = page.locator("#products");
  const search = panel.locator('input[type="search"]');
  await search.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await search.fill("marked");
  await page.waitForTimeout(400);
  const count = await panel.locator('ul[aria-label="Products"] > li').count();
  if (count !== 2) bad(`${label} search`, `"marked" shows ${count} cards, expected 2`); else ok(`${label} search "marked" -> 2 cards`);
  await search.fill("");
  await page.waitForTimeout(400);

  // Featured Buy now -> sheet
  const featBuy = panel.locator("article.chrome button", { hasText: "Buy now" });
  await featBuy.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(200);
  try { await tapOrClick(page, featBuy, mobile); } catch (e) { bad(`${label} featured Buy now`, String(e).split("\n")[0]); }
  await page.waitForTimeout(700);
  let dialog = page.locator('[role="dialog"]');
  if ((await dialog.count()) !== 1) bad(`${label} featured Buy now`, "sheet did not open"); else ok(`${label} featured Buy now opens the sheet`);
  // size + qty + links
  if (await dialog.count()) {
    await tapOrClick(page, dialog.locator('[role="radio"]', { hasText: /^XL$/ }), mobile);
    await page.waitForTimeout(150);
    const xl = await dialog.locator('[role="radio"]', { hasText: /^XL$/ }).getAttribute("aria-checked");
    if (xl !== "true") bad(`${label} sheet size XL`, "not selected"); else ok(`${label} sheet size XL selects`);
    await tapOrClick(page, dialog.locator('button[aria-label="Increase quantity"]'), mobile);
    await page.waitForTimeout(150);
    const total = await dialog.locator("text=/^\\$\\d+\\.\\d\\d$/").last().textContent();
    if (total !== "$60.00") bad(`${label} sheet qty`, `total reads ${total}, expected $60.00`); else ok(`${label} sheet qty + -> $60.00`);
    await tapOrClick(page, dialog.locator('button[aria-label="Decrease quantity"]'), mobile);
    const addHref = await dialog.locator("a", { hasText: "Add to bag" }).getAttribute("href");
    const buyHref = await dialog.locator("a", { hasText: "Buy now" }).getAttribute("href");
    if (!/starrbaby\.co\/cart\/add\?id=\d+&quantity=1/.test(addHref || "")) bad(`${label} sheet Add to bag href`, addHref || "none"); else ok(`${label} sheet Add to bag -> ${addHref}`);
    if (!/starrbaby\.co\/cart\/\d+:1/.test(buyHref || "")) bad(`${label} sheet Buy now href`, buyHref || "none"); else ok(`${label} sheet Buy now -> ${buyHref}`);
    await expectPopup(ctx, page, dialog.locator("a", { hasText: "Add to bag" }), mobile, `${label} sheet Add to bag opens`, "myshopify.com");
    await expectPopup(ctx, page, dialog.locator("a", { hasText: "Size guide" }), mobile, `${label} sheet Size guide opens`, "myshopify.com");
    // thumbnails
    const thumbs = dialog.locator('ul[aria-label="Photos"] button');
    if (await thumbs.count()) { await tapOrClick(page, thumbs.nth(1), mobile); await page.waitForTimeout(150); const pressed = await thumbs.nth(1).getAttribute("aria-pressed"); if (pressed !== "true") bad(`${label} sheet thumbnail`, "did not switch"); else ok(`${label} sheet thumbnail switches`); }
    await tapOrClick(page, dialog.locator('button[aria-label="Close"]'), mobile);
    await page.waitForTimeout(400);
    if (await page.locator('[role="dialog"]').count()) bad(`${label} sheet close`, "still open"); else ok(`${label} sheet close`);
  }
  // Each product card Buy now + heart
  const cards = panel.locator('ul[aria-label="Products"] > li');
  const n = await cards.count();
  for (let i = 0; i < n; i++) {
    const card = cards.nth(i);
    const buy = card.locator("button", { hasText: "Buy now" });
    if (!(await buy.count())) continue;
    const name = (await card.locator("h3").first().textContent()) || `card ${i}`;
    await buy.evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForTimeout(150);
    try { await tapOrClick(page, buy, mobile); } catch (e) { bad(`${label} card Buy now ${name}`, String(e).split("\n")[0]); continue; }
    await page.waitForTimeout(500);
    const d = page.locator('[role="dialog"]');
    const title = (await d.locator("#sheet-title").textContent().catch(() => "")) || "";
    if (!title || title.trim() !== name.trim()) bad(`${label} card Buy now ${name}`, `sheet title "${title}"`); else ok(`${label} card Buy now ${name} -> sheet`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const heart = card.locator('button[aria-pressed]');
    if (await heart.count()) { await tapOrClick(page, heart, mobile); await page.waitForTimeout(100); const p = await heart.getAttribute("aria-pressed"); if (p !== "true") bad(`${label} heart ${name}`, "not pressed"); else ok(`${label} heart ${name} toggles`); }
  }

  // News
  const news = page.locator("#news");
  await expectScroll(page, news.locator("button", { hasText: "Get alerts" }), mobile, `${label} news Get alerts`, "signup");
  await expectPopup(ctx, page, news.locator("a", { hasText: /Submit a song|Watch live now/ }).first(), mobile, `${label} news primary`, "rolloutheaven.com");
  await expectPopup(ctx, page, news.locator("a", { hasText: /^Watch live$|^Submit a song$/ }).last(), mobile, `${label} news secondary`, "rolloutheaven.com");
  await expectScroll(page, news.locator("button", { hasText: "Join the list" }), mobile, `${label} news Join the list`, "signup");

  // Artists
  const artists = page.locator("#artists");
  for (const l of ["Spotify", "Apple Music", "Instagram"]) await expectPopup(ctx, page, artists.locator("a", { hasText: new RegExp(`^${l}`) }).first(), mobile, `${label} artist ${l}`);
  await expectPopup(ctx, page, artists.locator("a", { hasText: "De La Cruz" }), mobile, `${label} featured on De La Cruz`, "music.apple.com");
  await expectScroll(page, artists.locator("button", { hasText: "Hear the records" }), mobile, `${label} artists Hear the records`, "music");

  // Music
  const music = page.locator("#music");
  for (const l of ["Spotify", "Apple Music", "YouTube"]) await expectPopup(ctx, page, music.locator("article a", { hasText: new RegExp(`^${l}$`) }).first(), mobile, `${label} album ${l}`);
  await expectPopup(ctx, page, music.locator("a", { hasText: "HOLY HOLY HOLY" }), mobile, `${label} single HOLY HOLY HOLY`, "symphony.to");
  await expectPopup(ctx, page, music.locator("a", { hasText: "Scootie Wop Live" }), mobile, `${label} platform Scootie Wop Live`, "youtube.com");
  await expectPopup(ctx, page, music.locator("a", { hasText: "Get your song reviewed" }), mobile, `${label} music submit card`, "rolloutheaven.com");

  // Sign up
  const signup = page.locator("#signup");
  const email = signup.locator("#signup-email");
  await email.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await email.fill("not an email");
  await tapOrClick(page, signup.locator('button[type="submit"]'), mobile);
  await page.waitForTimeout(300);
  const err = await signup.locator("#signup-status").textContent();
  if (!/Check the email/.test(err || "")) bad(`${label} signup validation`, `status "${err}"`); else ok(`${label} signup rejects a bad email`);
  await email.fill("fan@example.com");
  await tapOrClick(page, signup.locator('button[type="submit"]'), mobile);
  await page.waitForTimeout(500);
  const done = await signup.locator("#signup-status").textContent();
  if (!/mail app opened|on the list|STARRBABY FAMILY/.test(done || "")) bad(`${label} signup submit`, `status "${done}"`); else ok(`${label} signup submit -> "${(done || "").trim().slice(0, 50)}"`);
  await expectPopup(ctx, page, signup.locator("a", { hasText: "STARRBABY FAMILY" }), mobile, `${label} signup Symphony`, "symphony.to");
  await expectPopup(ctx, page, signup.locator("a", { hasText: "SBF Discord" }), mobile, `${label} signup Discord`, "discord");

  // Gallery
  const photo = page.locator('ul[aria-label="Photos"] button').first();
  await photo.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(200);
  await tapOrClick(page, photo, mobile);
  await page.waitForTimeout(500);
  const lb = page.locator('[role="dialog"][aria-modal="true"]');
  if (!(await lb.count())) bad(`${label} gallery open`, "no lightbox"); else {
    ok(`${label} gallery opens`);
    await tapOrClick(page, lb.locator('button[aria-label="Next photo"]'), mobile);
    await page.waitForTimeout(300);
    const cap = await lb.locator("figcaption").textContent();
    if (!/2 of 8/.test(cap || "")) bad(`${label} gallery next`, `caption "${cap}"`); else ok(`${label} gallery next -> 2 of 8`);
    await tapOrClick(page, lb.locator('button[aria-label="Previous photo"]'), mobile);
    await page.waitForTimeout(300);
    await tapOrClick(page, lb.locator('button[aria-label="Close"]'), mobile);
    await page.waitForTimeout(300);
    if (await page.locator('[role="dialog"][aria-modal="true"]').count()) bad(`${label} gallery close`, "still open"); else ok(`${label} gallery close`);
  }

  // Footer
  const footer = page.locator("footer");
  await expectScroll(page, footer.locator("button", { hasText: /^Shop$/ }), mobile, `${label} footer Shop`, "products");
  if (!mobile) await expectScroll(page, footer.locator("button", { hasText: /^Gallery$/ }), mobile, `${label} footer Gallery`, "gallery"); // the section list is hidden below lg
  for (const s of ["Instagram", "TikTok", "YouTube", "Facebook", "Discord"]) await expectPopup(ctx, page, footer.locator("a", { hasText: s }).first(), mobile, `${label} footer ${s}`);
  const mail = await footer.locator('a[href^="mailto:"]').getAttribute("href");
  if (mail !== "mailto:starrbabywrldwide@gmail.com") bad(`${label} footer contact`, mail || "none"); else ok(`${label} footer contact mailto`);

  // Logo to top
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(300);
  await tapOrClick(page, page.locator('header a[aria-label*="back to top"]'), mobile);
  await page.waitForTimeout(3000);
  const y2 = await page.evaluate(() => window.scrollY);
  if (y2 > 5) bad(`${label} logo to top`, `scrollY ${y2}`); else ok(`${label} logo -> top`);

  if (errors.length) bad(`${label} console`, errors.slice(0, 3).join(" | "));
  await browser.close();
}

(async () => {
  await run(true);
  await run(false);
  console.log(`\nPASS ${passes.length}`);
  for (const p of passes) console.log("  ok  " + p);
  console.log(`\nFAIL ${fails.length}`);
  for (const f of fails) console.log("  XX  " + f);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
