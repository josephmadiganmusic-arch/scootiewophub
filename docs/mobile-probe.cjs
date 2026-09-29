// Mobile probe for the STARRBABY site: screenshots every section at phone
// widths, opens the menu and the product sheet, and fails on horizontal
// overflow. Run from C:\Users\jocej\pw-temp so playwright resolves.
const { chromium } = require("playwright");
const path = require("path");
const OUT = path.resolve(__dirname);
const URL = process.env.SITE_URL || "http://localhost:5180/";
const sections = ["top", "about", "products", "news", "artists", "music", "signup", "gallery"];

(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const [w, h] of [[390, 844], [320, 568], [768, 1024]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 700, hasTouch: w < 700 });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    // find the widest offenders if any
    const offenders = await page.evaluate(() => {
      const iw = window.innerWidth; const out = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > iw + 1 && r.width > 0) out.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 3).join(".")} right=${Math.round(r.right)}`);
      });
      return out.slice(0, 12);
    });
    for (const id of sections) {
      await page.evaluate((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" }); if (id !== "top") window.scrollBy(0, -20); }, id);
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(OUT, `m-${w}-${id}.png`) });
    }
    // menu
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const burger = page.locator('[aria-controls="mobile-nav"]');
    const burgerVisible = await burger.isVisible();
    if (burgerVisible) {
      await burger.evaluate((el) => el.click());
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `m-${w}-menu.png`) });
      await page.keyboard.press("Escape");
    }
    // product sheet
    await page.evaluate(() => document.getElementById("products")?.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(800);
    const buy = page.locator('ul[aria-label="Products"] button', { hasText: "Buy now" }).first();
    await buy.evaluate((el) => { el.scrollIntoView({ block: 'center' }); el.click(); });
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `m-${w}-sheet.png`) });
    const sheetOverflow = await page.evaluate(() => { const d = document.querySelector('[role="dialog"]'); const s = d && d.querySelector('.overflow-y-auto'); return s ? { sw: s.scrollWidth, cw: s.clientWidth } : null; });
    if (sheetOverflow) { await page.evaluate(() => { const s = document.querySelector('[role="dialog"] .overflow-y-auto'); if (s) s.scrollTop = 99999; }); await page.waitForTimeout(400); await page.screenshot({ path: path.join(OUT, `m-${w}-sheet-bottom.png`) }); }
    await page.keyboard.press("Escape");
    // gallery lightbox
    await page.evaluate(() => document.getElementById("gallery")?.scrollIntoView({ behavior: "instant" }));
    await page.waitForTimeout(600);
    { const ph = page.locator('ul[aria-label="Photos"] button').first(); await ph.evaluate((el) => { el.scrollIntoView({ block: 'center' }); el.click(); }); }
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, `m-${w}-lightbox.png`) });
    await page.keyboard.press("Escape");
    results.push({ w, h, overflow, offenders, sheetOverflow, burgerVisible, errors });
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
