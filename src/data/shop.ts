// ---------------------------------------------------------------------------
// The STARRBABY shop, mirrored from the live Shopify store (starrbaby.co)
// on 2026-09-28. Variant ids drive the Add to Bag and Buy Now links, so a
// size picked here lands in the real cart. Re run the products.json pull if
// the store changes.
// ---------------------------------------------------------------------------

export const SHOP_URL = "https://starrbaby.co";
export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"] as const;
export type Size = (typeof SIZES)[number];

export type ShopImage = { src: string; alt: string; kind: "flat" | "life" };

export type ShopProduct = {
  id: string;
  handle: string;
  name: string;
  collection: string;
  category: "tees";
  color: "Black" | "White";
  price: number;
  blurb: string;
  details: string[];
  images: ShopImage[];
  variants: Record<Size, number>;
  featured?: boolean;
  isNew?: boolean;
};

const sizes = (ids: number[]): Record<Size, number> =>
  Object.fromEntries(SIZES.map((s, i) => [s, ids[i]])) as Record<Size, number>;

const teeDetails = ["100% cotton", "7.4 oz", "Oversized cut", "Unisex"];

export const shopProducts: ShopProduct[] = [
  {
    id: "originals",
    handle: "unisex-oversized-cotton-t-shirt",
    name: "“Originals” Oversized Tee",
    collection: "Originals",
    category: "tees",
    color: "Black",
    price: 30,
    blurb: "The oval wordmark up front, the neon star smiley on the back.",
    details: teeDetails,
    images: [
      { src: "/shop/originals-flat-2.webp", alt: "Black Originals tee, back: neon green star smiley", kind: "flat" },
      { src: "/shop/originals-flat-1.webp", alt: "Black Originals tee, front: white STARRBABY oval", kind: "flat" },
      { src: "/shop/originals-life.webp", alt: "Originals tee worn oversized with black denim", kind: "life" },
    ],
    variants: sizes([46964061536450, 46964061569218, 46964061601986, 46964061634754, 46964061667522, 46964061700290, 46964061733058, 46964061765826]),
    featured: true,
    isNew: true,
  },
  {
    id: "blanco",
    handle: "unisex-oversized-cotton-t-shirt-1",
    name: "“Blanco” Oversized Tee",
    collection: "Originals",
    category: "tees",
    color: "White",
    price: 30,
    blurb: "White on white. Oval wordmark on the chest, outlined star smiley on the back.",
    details: teeDetails,
    images: [
      { src: "/shop/blanco-flat-1.webp", alt: "White Blanco tee, front: black STARRBABY oval", kind: "flat" },
      { src: "/shop/blanco-flat-2.webp", alt: "White Blanco tee, back: outlined star smiley", kind: "flat" },
      { src: "/shop/blanco-life-1.webp", alt: "Blanco tee worn with black denim", kind: "life" },
      { src: "/shop/blanco-life-2.webp", alt: "Blanco tee from the back, seated", kind: "life" },
    ],
    variants: sizes([46964065435842, 46964065468610, 46964065501378, 46964065534146, 46964065566914, 46964065599682, 46964065632450, 46964065665218]),
  },
  {
    id: "marked-black",
    handle: "marked-black-t-shirt",
    name: "“MARKED” Black Tee",
    collection: "Marked",
    category: "tees",
    color: "Black",
    price: 29.99,
    blurb: "MARKED across the chest in white. Clean back. Wear it oversized.",
    details: teeDetails,
    images: [
      { src: "/shop/marked-flat-1.webp", alt: "Black MARKED tee, front", kind: "flat" },
      { src: "/shop/marked-life-1.webp", alt: "MARKED black tee worn oversized, foot up on a crate", kind: "life" },
      { src: "/shop/marked-life-3.webp", alt: "MARKED black tee with khaki pants", kind: "life" },
      { src: "/shop/marked-life-2.webp", alt: "MARKED black tee with black shorts", kind: "life" },
    ],
    variants: sizes([47888569630914, 47888569663682, 47888569696450, 47888569729218, 47888569761986, 47888569794754, 47888569827522, 47888569860290]),
  },
  {
    id: "marked-retro",
    handle: "marked-retro-t-shirt",
    name: "“MARKED” Retro Tee",
    collection: "Marked",
    category: "tees",
    color: "White",
    price: 29.99,
    blurb: "White tee, MARKED in the retro orange and yellow outline.",
    details: teeDetails,
    images: [
      { src: "/shop/retro-flat-1.webp", alt: "White MARKED Retro tee, front", kind: "flat" },
      { src: "/shop/retro-life-1.webp", alt: "MARKED Retro tee worn with baggy denim", kind: "life" },
    ],
    variants: sizes([47888638902466, 47888638935234, 47888638968002, 47888639000770, 47888639033538, 47888639066306, 47888639099074, 47888639131842]),
  },
];

export type ShowMerch = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  imageAlt: string;
  url: string;
};

// Show merch: sold at the shows and on the shop's full catalog page.
export const showMerch: ShowMerch[] = [
  {
    id: "trillmatikk",
    name: "TRILLMATIKK run",
    blurb: "Hoodies and tees in black, orange, white and grey with the TRILLMATIKK star. At the shows and online.",
    image: "/brand/merch-lineup.webp",
    imageAlt: "TRILLMATIKK hoodies and tees lineup",
    url: `${SHOP_URL}/collections/all`,
  },
];

export const productUrl = (p: ShopProduct) => `${SHOP_URL}/products/${p.handle}`;
export const addToBagUrl = (variant: number, qty: number) => `${SHOP_URL}/cart/add?id=${variant}&quantity=${qty}`;
export const buyNowUrl = (variant: number, qty: number) => `${SHOP_URL}/cart/${variant}:${qty}`;
export const money = (n: number) => `$${n.toFixed(2)}`;
