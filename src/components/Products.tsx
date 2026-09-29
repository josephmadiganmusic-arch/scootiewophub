import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Heart, LayoutGrid, Ruler, Search, Shirt, Sparkles, SwatchBook, Tag } from "lucide-react";
import { money, shopProducts, showMerch, type ShopProduct } from "@/data/shop";
import { cn } from "@/lib/utils";
import { ProductSheet } from "./ProductSheet";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

type Cat = "all" | "tees" | "show";

const cats: { key: Cat; label: string; icon: typeof Shirt }[] = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "tees", label: "Tees", icon: Shirt },
  { key: "show", label: "Show merch", icon: Sparkles },
];

export function Products() {
  const [cat, setCat] = useState<Cat>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<ShopProduct | null>(null);
  const [faves, setFaves] = useState<Set<string>>(() => new Set());
  // Stable so the sheet's effect only re-runs when the product changes.
  const closeSheet = useCallback(() => setOpen(null), []);

  const query = q.trim().toLowerCase();
  const list = useMemo(
    () =>
      shopProducts.filter((p) => {
        if (cat === "show") return false;
        if (cat === "tees" && p.category !== "tees") return false;
        if (!query) return true;
        return `${p.name} ${p.collection} ${p.color}`.toLowerCase().includes(query);
      }),
    [cat, query],
  );
  const showList = useMemo(
    () =>
      cat === "tees"
        ? []
        : showMerch.filter((m) => !query || `${m.name} ${m.blurb}`.toLowerCase().includes(query)),
    [cat, query],
  );
  const featured = shopProducts.find((p) => p.featured) ?? shopProducts[0];

  const toggleFave = (id: string) =>
    setFaves((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <section id="products" className="section-pad relative" aria-labelledby="products-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Products"
          title={
            <span id="products-title">
              Apparel &amp; <span className="text-neon-outline">show merch</span>
            </span>
          }
          lead="Streetwear that pays homage to real life. Pick a piece, pick a size, and it goes straight to the STARRBABY cart."
        />

        {/* The shop screen: green felt ground, black plush cards, the featured drop in black glass */}
        <Reveal>
          <div className="neu neu-green overflow-hidden !rounded-[2rem] p-3 sm:!rounded-[2.5rem] sm:p-5 lg:p-8">
            {/* Top bar: search and categories */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-md">
                <span className="sr-only">Search the drop</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/45" aria-hidden="true" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Find your piece"
                  className="neu-in h-12 w-full pl-11 pr-4 text-sm font-semibold"
                />
              </label>
              <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 py-1" role="tablist" aria-label="Categories">
                {cats.map((c) => {
                  const Icon = c.icon;
                  const on = cat === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setCat(c.key)}
                      className={cn(
                        "flex shrink-0 flex-col items-center gap-2 rounded-2xl px-3 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] transition-colors",
                        on ? "text-fg" : "text-fg/60 hover:text-fg",
                      )}
                    >
                      <span
                        className={cn(
                          "neu-xs neu-round flex h-12 w-12 items-center justify-center transition-[color,transform] duration-200",
                          on ? "neu-neon text-neon" : "text-fg/75",
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured drop: black glass in a chrome rim */}
            {cat !== "show" && !query ? (
              <article className="chrome mt-6">
                <div className="chrome-face grid grid-cols-1 sm:grid-cols-5">
                  <div className="flex flex-col justify-between gap-6 p-6 sm:col-span-3 sm:p-8">
                    <div>
                      <span className="chip-neon">Featured drop</span>
                      <h3 className="font-display text-stitch mt-4 text-2xl font-extrabold uppercase leading-[0.98] sm:text-3xl lg:text-4xl">
                        {featured.name}
                      </h3>
                      <p className="mt-2 text-sm text-fg/60">
                        <span className="font-display text-xl text-neon">{money(featured.price)}</span>
                        <span className="ml-2">/ sizes S to 5XL</span>
                      </p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-fg/70">{featured.blurb}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex gap-2" aria-hidden="true">
                        {featured.images.slice(0, 3).map((im) => (
                          <span key={im.src} className="well-light h-11 w-11 overflow-hidden rounded-xl">
                            <img src={im.src} alt="" width={88} height={88} loading="lazy" className="h-full w-full object-cover" />
                          </span>
                        ))}
                      </div>
                      <button type="button" onClick={() => setOpen(featured)} className="btn3d-chrome !min-h-11 !py-2.5">
                        Buy now
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="relative min-h-[16rem] sm:col-span-2">
                    <div
                      className="anim-glow absolute inset-0"
                      style={{ background: "radial-gradient(60% 55% at 60% 55%, rgba(26,254,0,0.34) 0%, rgba(26,254,0,0) 70%)" }}
                      aria-hidden="true"
                    />
                    <img
                      src={featured.images[0].src}
                      alt={featured.images[0].alt}
                      width={1000}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="anim-float-soft absolute inset-x-6 bottom-0 top-4 mx-auto h-[calc(100%-1rem)] w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.85)]"
                    />
                  </div>
                </div>
                <span className="sparkle left-3 top-3" aria-hidden="true" />
              </article>
            ) : null}

            {/* Product grid */}
            {list.length + showList.length === 0 ? (
              <div className="neu-sm mt-6 p-8 text-center">
                <p className="font-display text-sm font-extrabold uppercase tracking-wide text-fg">Nothing matches &ldquo;{q}&rdquo;</p>
                <p className="mt-2 text-sm text-fg/60">Try tee, black, white, or Marked.</p>
                <button type="button" onClick={() => setQ("")} className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-neon underline underline-offset-4">
                  Clear search
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6" aria-label="Products">
                {list.map((p, i) => {
                  const fav = faves.has(p.id);
                  return (
                    <Reveal key={p.id} index={i} as="li" className="min-w-0">
                      <article className="neu-sm neu-lift group flex h-full flex-col p-2.5 sm:p-3">
                        <div className="well-light relative overflow-hidden rounded-2xl">
                          <button
                            type="button"
                            onClick={() => toggleFave(p.id)}
                            aria-pressed={fav}
                            aria-label={fav ? `Remove ${p.name} from favorites` : `Save ${p.name}`}
                            className={cn(
                              "absolute left-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                              fav ? "border-neon bg-neon text-ink" : "border-white/15 bg-black/70 text-white hover:border-neon",
                            )}
                          >
                            <Heart className={cn("h-4 w-4", fav && "fill-current")} aria-hidden="true" />
                          </button>
                          {p.isNew ? <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-neon px-2.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-ink">New</span> : null}
                          <button type="button" onClick={() => setOpen(p)} className="block w-full" aria-label={`Open ${p.name}`}>
                            <span className="relative block aspect-[4/5] w-full">
                              <img
                                src={p.images[0].src}
                                alt={p.images[0].alt}
                                width={1000}
                                height={1000}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 lg:group-hover:opacity-0"
                              />
                              {p.images[1] ? (
                                <img
                                  src={p.images[1].src}
                                  alt=""
                                  width={1000}
                                  height={1000}
                                  loading="lazy"
                                  decoding="async"
                                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100"
                                />
                              ) : null}
                            </span>
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
                          <h3 className="font-display text-[0.7rem] font-bold uppercase leading-snug text-fg sm:text-xs">{p.name}</h3>
                          <p className="mt-1 text-[0.7rem] text-fg/55 sm:text-xs">Sizes S to 5XL · {p.color}</p>
                          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                            <span className="font-display text-sm font-extrabold text-neon">{money(p.price)}</span>
                            <button
                              type="button"
                              onClick={() => setOpen(p)}
                              className="inline-flex h-9 items-center rounded-full bg-neon px-3.5 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-ink shadow-[0_8px_18px_-8px_rgba(26,254,0,0.8)] transition-[transform,filter] duration-150 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:text-[0.7rem]"
                            >
                              Buy now
                            </button>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}

                {showList.map((m, i) => (
                  <Reveal key={m.id} index={list.length + i} as="li" className="col-span-2 min-w-0 lg:col-span-4">
                    <article className="neu-sm grid grid-cols-1 gap-4 p-3 sm:grid-cols-5 sm:p-4">
                      <div className="well-light overflow-hidden rounded-2xl sm:col-span-3">
                        <img src={m.image} alt={m.imageAlt} width={1440} height={810} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between gap-4 px-1 pb-1 sm:col-span-2 sm:py-2">
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-neon px-2.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-ink">
                            <Sparkles className="h-3 w-3" aria-hidden="true" /> Show merch
                          </span>
                          <h3 className="font-display mt-3 text-base font-extrabold uppercase leading-tight text-fg sm:text-xl">{m.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-fg/65">{m.blurb}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
                          className="btn3d-neon !min-h-11 !py-2.5 !text-[0.7rem]"
                        >
                          Hear about the next drop
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </ul>
            )}

            {/* Info tiles */}
            <ul className="mt-5 grid grid-cols-3 gap-3 sm:gap-4" aria-label="Shop facts">
              {[
                { icon: SwatchBook, k: "Colours", v: "Black and white" },
                { icon: Ruler, k: "Sizes", v: "S to 5XL, every piece" },
                { icon: Tag, k: "Cut", v: "Oversized 7.4 oz cotton" },
              ].map(({ icon: Icon, k, v }) => (
                <li key={k} className="neu-xs min-w-0 px-3 py-3 sm:px-4">
                  <p className="flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-fg">
                    <Icon className="h-3.5 w-3.5 text-neon" aria-hidden="true" /> {k}
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-snug text-fg/65 sm:text-xs">{v}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <ProductSheet product={open} onClose={closeSheet} />
    </section>
  );
}
