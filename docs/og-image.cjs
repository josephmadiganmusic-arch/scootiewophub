// Renders public/og.jpg (1200 x 630) from docs/og-image.html with the site's
// own fonts and the 3D star embedded as data URIs. Run from C:\Users\jocej\pw-temp
// (or with NODE_PATH pointing at its node_modules) so playwright resolves:
//   NODE_PATH=C:/Users/jocej/pw-temp/node_modules node docs/og-image.cjs
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const os = require("os");

const root = path.resolve(__dirname, "..");
const data = (p, mime) => `data:${mime};base64,${fs.readFileSync(path.join(root, p)).toString("base64")}`;

(async () => {
  const html = fs
    .readFileSync(path.join(__dirname, "og-image.html"), "utf8")
    .replace("{{UNBOUNDED}}", data("public/fonts/Unbounded-800-latin.woff2", "font/woff2"))
    .replace("{{LATO}}", data("public/fonts/Lato-900-latin.woff2", "font/woff2"))
    .replace("{{STAR}}", data("public/brand/star-3d.webp", "image/webp"));
  const tmp = path.join(os.tmpdir(), `sb-og-${Date.now()}.html`);
  fs.writeFileSync(tmp, html);
  const out = path.join(root, "public", "og.jpg");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto("file:///" + tmp.replace(/\\/g, "/"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: out, type: "jpeg", quality: 90 });
  await browser.close();
  fs.unlinkSync(tmp);
  console.log("wrote", out, fs.statSync(out).size, "bytes");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
