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
              Apparel &amp; <span className="text-neon">show merch</span>
            </span>
          }
          lead="Streetwear that pays homage to real life. Pick a piece, pick a size, and it goes straight to the STARRBABY cart."
        />

        {/* The shop screen: neon ground, white cards, black feature card */}
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] bg-neon p-3 text-ink sm:rounded-[2.5rem] sm:p-5 lg:p-8"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.18), 12px 16px 40px rgba(0,0,0,0.85), 0 0 90px -20px rgba(26,254,0,0.55)",
            }}
          >
            {/* Top bar: search and categories */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-md">
                <span className="sr-only">Search the drop</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" aria-hidden="true" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Find your piece"
                  className="h-12 w-full rounded-full border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/40 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                />
              </label>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1" role="tablist" aria-label="Categories">
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
                        "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-3 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] transition-colors",
                        on ? "text-ink" : "text-ink/55 hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border transition-[background-color,color,transform] duration-200",
                          on
                            ? "border-ink bg-ink text-neon shadow-[0_8px_18px_-8px_rgba(0,0,0,0.7)]"
                            : "border-black/10 bg-white text-ink shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)]",
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

            {/* Featured drop: the black card */}
            {cat !== "show" && !query ? (
              <article
                className="relative mt-5 overflow-hidden rounded-[1.5rem] bg-ink text-white sm:rounded-[2rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  <div className="flex flex-col justify-between gap-6 p-6 sm:col-span-3 sm:p-8">
                    <div>
                      <span className="chip-neon">Featured drop</span>
                      <h3 className="font-display mt-4 text-2xl font-extrabold uppercase leading-[0.98] sm:text-3xl lg:text-4xl">
                        {featured.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/60">
                        <span className="font-display text-xl text-neon">{money(featured.price)}</span>
                        <span className="ml-2">/ sizes S to 5XL</span>
                      </p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{featured.blurb}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex gap-2" aria-hidden="true">
                        {featured.images.slice(0, 3).map((im) => (
                          <span key={im.src} className="h-11 w-11 overflow-hidden rounded-xl bg-white">
                            <img src={im.src} alt="" width={88} height={88} loading="lazy" className="h-full w-full object-cover" />
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(featured)}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Buy now
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="relative min-h-[16rem] sm:col-span-2">
                    <div
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(60% 55% at 60% 55%, rgba(26,254,0,0.32) 0%, rgba(26,254,0,0) 70%)" }}
                      aria-hidden="true"
                    />
                    <img
                      src={featured.images[0].src}
                      alt={featured.images[0].alt}
                      width={1000}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="anim-float-soft absolute inset-x-6 bottom-0 top-4 mx-auto h-[calc(100%-1rem)] w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                </div>
              </article>
            ) : null}

            {/* Product grid */}
            {list.length + showList.length === 0 ? (
              <div className="mt-5 rounded-[1.5rem] bg-white/70 p-8 text-center">
                <p className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">Nothing matches &ldquo;{q}&rdquo;</p>
                <p className="mt-2 text-sm text-ink/60">Try tee, black, white, or Marked.</p>
                <button type="button" onClick={() => setQ("")} className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-ink underline">
                  Clear search
                </button>
              </div>
            ) : (
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Products">
                {list.map((p, i) => {
                  const fav = faves.has(p.id);
                  return (
                    <Reveal key={p.id} index={i} as="li" className="min-w-0">
                      <article className="group flex h-full flex-col rounded-[1.25rem] bg-white p-2.5 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:rounded-[1.5rem] sm:p-3 lg:hover:-translate-y-1">
                        <div className="relative overflow-hidden rounded-2xl bg-[#f3f4f2]">
                          <button
                            type="button"
                            onClick={() => toggleFave(p.id)}
                            aria-pressed={fav}
                            aria-label={fav ? `Remove ${p.name} from favorites` : `Save ${p.name}`}
                            className={cn(
                              "absolute left-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                              fav ? "border-ink bg-ink text-neon" : "border-black/10 bg-white text-ink hover:border-ink",
                            )}
                          >
                            <Heart className={cn("h-4 w-4", fav && "fill-current")} aria-hidden="true" />
                          </button>
                          {p.isNew ? <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-neon px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-ink">New</span> : null}
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
                          <h3 className="font-display text-[0.7rem] font-bold uppercase leading-snug text-ink sm:text-xs">{p.name}</h3>
                          <p className="mt-1 text-[0.68rem] text-ink/55 sm:text-xs">Sizes S to 5XL · {p.color}</p>
                          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                            <span className="font-display text-sm font-extrabold text-ink">{money(p.price)}</span>
                            <button
                              type="button"
                              onClick={() => setOpen(p)}
                              className="inline-flex h-9 items-center rounded-full bg-ink px-3.5 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-white transition-[transform,background-color] duration-150 hover:bg-black hover:-translate-y-0.5 active:translate-y-0 sm:text-[0.66rem]"
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
                    <article className="grid grid-cols-1 gap-4 rounded-[1.5rem] bg-white p-3 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] sm:grid-cols-5 sm:p-4">
                      <div className="overflow-hidden rounded-2xl bg-[#f3f4f2] sm:col-span-3">
                        <img src={m.image} alt={m.imageAlt} width={1440} height={810} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between gap-4 px-1 pb-1 sm:col-span-2 sm:py-2">
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-neon px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-ink">
                            <Sparkles className="h-3 w-3" aria-hidden="true" /> Show merch
                          </span>
                          <h3 className="font-display mt-3 text-base font-extrabold uppercase leading-tight text-ink sm:text-xl">{m.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.blurb}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-white transition-transform duration-150 hover:-translate-y-0.5"
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
            <ul className="mt-4 grid grid-cols-3 gap-2 sm:gap-3" aria-label="Shop facts">
              {[
                { icon: SwatchBook, k: "Colours", v: "Black and white" },
                { icon: Ruler, k: "Sizes", v: "S to 5XL, every piece" },
                { icon: Tag, k: "Cut", v: "Oversized 7.4 oz cotton" },
              ].map(({ icon: Icon, k, v }) => (
                <li key={k} className="min-w-0 rounded-2xl bg-white/85 px-3 py-3 sm:px-4">
                  <p className="flex items-center gap-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-ink">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {k}
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-snug text-ink/65 sm:text-xs">{v}</p>
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
