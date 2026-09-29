// ---------------------------------------------------------------------------
// STARRBABY WRLDWIDE site content. Everything the sections render comes from
// here so the owner can change copy, links, products and events in one file.
// Facts below were pulled from starrbaby.com, starrbaby.co (Shopify), the
// Linktree and the Rollout Live page on 2026-09-28. Anything marked TODO is
// still waiting on Scootie or the owner.
// ---------------------------------------------------------------------------

export const brand = {
  name: "STARRBABY WRLDWIDE",
  short: "SB WRLDWIDE",
  founder: "Emmanuel Lofton",
  founderStage: "Scootie Wop",
  founded: 2023,
  hometown: "Hilton Head, South Carolina",
  tagline: "Created to Create",
  pillars: ["Music", "Fashion", "Lifestyle"],
  shopUrl: "https://starrbaby.co",
  liveUrl: "https://rolloutheaven.com/starrbaby",
  // Scootie's creator referral: anyone who starts their own Rollout Live page
  // through this link is credited to him.
  referralUrl: "https://rolloutheaven.com/live?ref=scootiewop",
  // Public, CORS open live status on Rollout Heaven. The site polls it every
  // 30s and shows the live strip when it says live. VITE_LIVE_STATUS_URL overrides.
  liveStatusUrl:
    (import.meta.env.VITE_LIVE_STATUS_URL as string | undefined) ||
    "https://rolloutheaven.com/starrbaby/api/live-status",
  // Contact address. The sign up form mails here until a list endpoint is set.
  contactEmail: "starrbabywrldwide@gmail.com",
  // Optional: a POST endpoint (Formspree, Resend, n8n webhook) that accepts
  // { email, source }. Set VITE_SIGNUP_ENDPOINT in .env to wire it up.
  signupEndpoint: import.meta.env.VITE_SIGNUP_ENDPOINT as string | undefined,
  // His existing fan capture page on Symphony (from the Linktree).
  familyUrl: "https://symphony.to/scootie-wop/747cfcbc-3d9d-4e10-9636-6a5de572392a",
  discordUrl: "https://discord.gg/KPXHrHmq",
} as const;

export const about = {
  eyebrow: "History of SB",
  headline: "Created to Create",
  paragraphs: [
    "STARRBABY WRLDWIDE was founded in 2023 by Emmanuel Lofton p.k.a Scootie Wop of Hilton Head, South Carolina. The initial purpose was to establish a brand and take a chance as a creative, tattooing the first original logo on his hand, there was no turning back from the vision.",
    "As time passed the framework all started to come together. Creating the official logo with the “star smiley” and locking in the neon green that is seen everywhere on socials. Inspired by creatives like Tyler Okonma, Ye, Jacques Webster, Elias Vargas, Phresh and Avery Doreen, Emmanuel began stepping into his own with confidence.",
    "With streetwear paying homage to different experiences in life to producing and building up artist he believes in.",
  ],
  statement: "STARRBABY WRLDWIDE is music, it’s fashion, it’s a lifestyle. Created to Create",
  milestones: [
    { year: "2023", title: "Founded", body: "Emmanuel Lofton starts STARRBABY WRLDWIDE in Hilton Head, SC." },
    { year: "Day one", title: "The first tattoo", body: "The original logo goes on his hand. No turning back from the vision." },
    { year: "The mark", title: "Star smiley", body: "The official logo lands, and the neon green locks in across every social." },
    { year: "Now", title: "Music, fashion, lifestyle", body: "Streetwear, records, and building up artists he believes in." },
  ],
  influences: ["Tyler Okonma", "Ye", "Jacques Webster", "Elias Vargas", "Phresh", "Avery Doreen"],
} as const;

export type Product = {
  id: string;
  name: string;
  price: string | null;
  url: string;
  image: string;
  imageAlt: string;
  hoverImage?: string;
  tag?: string;
  category: "apparel" | "show";
  note?: string;
};

export const products: Product[] = [
  {
    id: "blanco",
    name: "“Blanco” Oversized T Shirt",
    price: "$30.00",
    url: "https://starrbaby.co/products/unisex-oversized-cotton-t-shirt-1",
    image: "/brand/product-blanco-1.webp",
    hoverImage: "/brand/product-blanco-2.webp",
    imageAlt: "White oversized STARRBABY T shirt, oval wordmark on the chest and the star smiley on the back",
    tag: "Marked collection",
    category: "apparel",
  },
  {
    id: "marked",
    name: "“MARKED” Black T Shirt",
    price: "$29.99",
    url: "https://starrbaby.co/products/marked-black-t-shirt",
    image: "/brand/product-marked-1.webp",
    hoverImage: "/brand/product-marked-2.webp",
    imageAlt: "Black MARKED T shirt worn oversized with black shorts",
    tag: "Marked collection",
    category: "apparel",
  },
  {
    id: "trill-merch",
    name: "TRILLMATIKK Merch",
    price: null,
    url: "https://starrbaby.co/collections/all",
    image: "/brand/merch-lineup.webp",
    imageAlt: "TRILLMATIKK hoodies and tees in black, orange, white and grey with the TRILLMATIKK star",
    tag: "Show merch",
    category: "show",
    note: "Hoodies and tees from the TRILLMATIKK run. Grab them at the shows or online.",
  },
];

export type EventItem = {
  id: string;
  kind: "show" | "popup" | "live";
  title: string;
  when: string;
  where: string;
  url?: string;
  cta?: string;
  recurring?: boolean;
};

// TODO: add upcoming shows and pop up events here as they get booked.
// { id, kind: "show" | "popup", title, when, where, url, cta }
export const events: EventItem[] = [
  {
    id: "starr-wars",
    kind: "live",
    title: "STARR WARS Music Reviews",
    when: "Every Thursday · 10 EST",
    where: "Live on Rollout Heaven",
    url: "https://rolloutheaven.com/starrbaby",
    cta: "Submit a song",
    recurring: true,
  },
];

export type Artist = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  links: { label: string; url: string }[];
  featured?: boolean;
};

export const artists: Artist[] = [
  {
    slug: "scootie-wop",
    name: "Scootie Wop",
    role: "Founder · Rapper · Producer",
    bio: "Emmanuel Lofton. Rapper, singer, songwriter, record producer and entrepreneur out of Hilton Head, South Carolina. Songwriting credits for Lecrae, production for a run of independent artists, and records like Coming Back Home and Spin Back that hit millions of streams in their first year.",
    image: "/gallery/g02-golden-portrait-2.webp",
    imageAlt: "Scootie Wop in golden light wearing a patterned shirt",
    links: [
      { label: "Spotify", url: "https://open.spotify.com/artist/1JAoqu34UmPWUUAjLMXt5I" },
      { label: "Apple Music", url: "https://music.apple.com/us/artist/scootie-wop/1488283654" },
      { label: "Instagram", url: "https://instagram.com/scootiewop" },
    ],
    featured: true,
  },
];

// Artists who appear on STARRBABY WRLDWIDE releases (label credit on the
// singles). Not the roster; the roster grows from the artists array above.
export const featuredOn = [
  { name: "De La Cruz", release: "GOD TIME", url: "https://music.apple.com/us/album/god-time-single/1758168698" },
  { name: "Avery Doreen", release: "SET UR EYES", url: "https://music.apple.com/us/album/set-ur-eyes-single/1769952706" },
  { name: "Vennisay", release: "LEAGUE BOUND", url: "https://music.apple.com/us/album/league-bound-single/1767476304" },
];

export const music = {
  featured: {
    title: "TRILLMATIKK",
    kind: "Album",
    cover: "/brand/trillmatikk-cover.webp",
    coverAlt: "TRILLMATIKK album cover: the star character on a couch in a warm lit room",
    links: [
      { label: "Spotify", url: "https://open.spotify.com/artist/1JAoqu34UmPWUUAjLMXt5I" },
      { label: "Apple Music", url: "https://music.apple.com/us/artist/scootie-wop/1488283654" },
      { label: "YouTube", url: "https://www.youtube.com/channel/UCxiuNRFW37J9uXL6SGCW0MQ" },
    ],
  },
  singles: [
    { title: "HOLY HOLY HOLY", url: "https://symphony.to/scootie-wop/holy-holy-holy" },
    { title: "BLAKSTONE", url: "https://symphony.to/scootie-wop/blakstone" },
    { title: "SET UR EYES", note: "with Avery Doreen", url: "https://symphony.to/scootie-wop/avery-doreen-set-ur-eyes" },
    { title: "LEAGUE BOUND", note: "with Vennisay", url: "https://symphony.to/scootie-wop/league-bound-1" },
    { title: "TRICKY", note: "with De La Cruz", url: "https://symphony.to/scootie-wop/de-la-cruz-tricky" },
    { title: "GOD TIME", note: "with De La Cruz", url: "https://symphony.to/scootie-wop/god-time-1" },
    { title: "OLE BOY", url: "https://symphony.to/scootie-wop/ole-boy" },
  ],
  platforms: [
    { key: "spotify", label: "Spotify", url: "https://open.spotify.com/artist/1JAoqu34UmPWUUAjLMXt5I" },
    { key: "apple", label: "Apple Music", url: "https://music.apple.com/us/artist/scootie-wop/1488283654" },
    { key: "youtube", label: "YouTube", url: "https://www.youtube.com/channel/UCxiuNRFW37J9uXL6SGCW0MQ" },
    { key: "youtube-live", label: "Scootie Wop Live", url: "https://www.youtube.com/@ScootieWopLive" },
    { key: "even", label: "EVEN", url: "https://www.even.biz/artists/scootie-wop" },
  ],
} as const;

export const socials = [
  { key: "instagram", label: "Instagram", handle: "@scootiewop", url: "https://instagram.com/scootiewop" },
  { key: "tiktok", label: "TikTok", handle: "@scootiewop", url: "https://tiktok.com/@scootiewop" },
  { key: "youtube", label: "YouTube", handle: "Scootie Wop", url: "https://www.youtube.com/channel/UCxiuNRFW37J9uXL6SGCW0MQ" },
  { key: "facebook", label: "Facebook", handle: "ScootiewopOfficial", url: "https://facebook.com/ScootiewopOfficial" },
  { key: "discord", label: "Discord", handle: "SBF", url: "https://discord.gg/KPXHrHmq" },
] as const;

export type Photo = { src: string; thumb: string; alt: string; w: number; h: number };

export const gallery: Photo[] = [
  { src: "/gallery/g01-golden-portrait.webp", thumb: "/gallery/g01-golden-portrait-thumb.webp", alt: "Scootie Wop in a patterned shirt, golden window light", w: 1365, h: 2048 },
  { src: "/gallery/g05-jersey-yard.webp", thumb: "/gallery/g05-jersey-yard-thumb.webp", alt: "Scootie Wop in a brown number 5 jersey in the yard", w: 1400, h: 2100 },
  { src: "/gallery/g03-cap-portrait.webp", thumb: "/gallery/g03-cap-portrait-thumb.webp", alt: "Close portrait in a cap and brown jersey", w: 1400, h: 1400 },
  { src: "/gallery/g08-studio-bw.webp", thumb: "/gallery/g08-studio-bw-thumb.webp", alt: "Black and white portrait on the couch with a cross chain", w: 1400, h: 1020 },
  { src: "/gallery/g02-golden-portrait-2.webp", thumb: "/gallery/g02-golden-portrait-2-thumb.webp", alt: "Scootie Wop looking up, golden light", w: 1365, h: 2048 },
  { src: "/gallery/g06-jersey-reach.webp", thumb: "/gallery/g06-jersey-reach-thumb.webp", alt: "Hand on the cap, brown jersey, blue sky", w: 1400, h: 2100 },
  { src: "/gallery/g04-jersey-seated.webp", thumb: "/gallery/g04-jersey-seated-thumb.webp", alt: "Seated by the window blinds in the number 5 jersey", w: 1400, h: 2100 },
  { src: "/gallery/g07-jersey-arms.webp", thumb: "/gallery/g07-jersey-arms-thumb.webp", alt: "Arms crossed in the yard, brown jersey", w: 1400, h: 2100 },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "news", label: "News" },
  { id: "artists", label: "Artists" },
  { id: "music", label: "Music" },
  { id: "signup", label: "Sign Up" },
  { id: "gallery", label: "Gallery" },
] as const;
