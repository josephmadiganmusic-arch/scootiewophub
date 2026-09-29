# STARRBABY WRLDWIDE

The brand site for STARRBABY WRLDWIDE, Scootie Wop's label and streetwear brand. Black ground, white writing, neon green accents, one page with seven sections: About, Products, News, Artists, Music, Sign Up, Photo Gallery.

## Run it

```
pnpm install
pnpm dev        # http://localhost:5180
pnpm build      # typecheck + production build into dist/
pnpm preview    # serve the production build
```

Node 24 or newer and pnpm 10.

## Where the content lives

- `src/data/site.ts`: copy, links, events, artists, singles, gallery photos, nav.
- `src/data/shop.ts`: the Shopify mirror. Product names, prices, images and the variant id for every size. Add to Bag and Buy Now build real cart links from these ids.
- `public/brand`: logos, the 3D star, album cover, merch art.
- `public/shop`: product photos.
- `public/gallery`: photos, full size and thumbnails.

## Fonts

Drunk Wide is the display face and it is a licensed font. Put the files at `public/fonts/DrunkWide.woff2` and `public/fonts/DrunkWide.woff` and the site picks them up. Until then Unbounded from Google Fonts stands in. Lato is the body face.

## Sign up form

Set `VITE_SIGNUP_ENDPOINT` in a `.env` file to a URL that accepts a JSON POST of `{ email, source }` (Formspree, Resend, an n8n webhook). Without it the form hands off to the STARRBABY FAMILY page on Symphony.

## Design notes

- Raised surfaces use the `.neu` classes, buttons use `.btn3d` and `.btn3d-neon`. These are unlayered CSS, so responsive `hidden` utilities go on a wrapper element, not on the button.
- Infinite motion is CSS keyframes only. Scroll reveals are transitions driven by an IntersectionObserver.
- The hero background is the ChromaTide WebGL shader in `src/components/ui/background-gradient-shader.tsx`, tinted with the brand green. It renders nothing where WebGL is missing, so the page still reads.
