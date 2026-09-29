// Desktop screenshots of every section plus a full page capture, saved into
// the project's docs/screenshots folder for the handoff.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const OUT = "C:/Users/jocej/Scootie-Wop-Hub/docs/screenshots";
fs.mkdirSync(OUT, { recursive: true });
const URL = process.env.SITE_URL || "http://localhost:5180/";
const sections = ["top", "about", "products", "news", "artists", "music", "signup", "gallery"];
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const id of sections) {
    await page.evaluate((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" }); if (id !== "top") window.scrollBy(0, -24); }, id);
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT, `desktop-${id}.png`) });
  }
  await page.evaluate(() => document.getElementById("products")?.scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(700);
  await page.locator('ul[aria-label="Products"] button', { hasText: "Buy now" }).first().click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(OUT, "desktop-product-sheet.png") });
  await page.keyboard.press("Escape");
  // reveal everything for the full page capture
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "desktop-full-page.png"), fullPage: true });
  // copy the mobile shots in too
  const S = path.resolve(__dirname);
  for (const f of fs.readdirSync(S)) if (/^m-(390|320)-.*\.png$/.test(f)) fs.copyFileSync(path.join(S, f), path.join(OUT, f.replace(/^m-/, "mobile-")));
  await browser.close();
  console.log(fs.readdirSync(OUT).join("\n"));
})().catch((e) => { console.error(e); process.exit(1); });
