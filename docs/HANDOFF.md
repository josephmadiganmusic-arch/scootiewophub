# STARRBABY WRLDWIDE site, handoff 2026-09-28

Repo: C:\Users\jocej\Scootie-Wop-Hub
Run: pnpm dev (http://localhost:5180), pnpm build for dist/
Preview the live banner: http://localhost:5180/?live=1

Built: About, Products, News, Artists, Music, Sign Up, Photo Gallery. Black, white, neon green. Drunk Wide with Lato. ChromaTide shader hero in green. Soft 3D panels and buttons in the CiCi style. Shop panel on the two references with his brand only: green ground, white cards, black featured card, size chips, quantity, total, Add to Bag and Buy Now straight into the real Shopify cart. Live strip and a phone tab bar that light up when he is live on Rollout Heaven and click through to rolloutheaven.com/starrbaby.

Verified: typecheck and build clean, desktop pass in Chrome, Playwright pass at 390, 320 and 768 with no horizontal overflow and no console errors, impeccable detect (only the neon glow rule, which is the brand look). Screenshots in docs/screenshots.

Waiting on you:
1. Commit and push the new live-status route in marketing-command-center/lib/lighthouse.js (uncommitted, next to /api/current). The banner reads it.
2. Drunk Wide font files into public/fonts (DrunkWide.woff2 and .woff). Unbounded stands in until then.
3. Email list endpoint in .env as VITE_SIGNUP_ENDPOINT, or a contact address in src/data/site.ts. Today the form hands off to his Symphony STARRBABY FAMILY page.
4. Real shows and pop ups plus roster names in src/data/site.ts.
5. Deploy target and domain, and a git remote.
