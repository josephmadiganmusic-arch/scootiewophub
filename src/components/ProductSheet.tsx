import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { SIZES, addToBagUrl, buyNowUrl, money, productUrl, type ShopProduct, type Size } from "@/data/shop";
import { cn } from "@/lib/utils";

type Props = { product: ShopProduct | null; onClose: () => void };

/**
 * Product detail sheet. Bottom sheet on phones, centered dialog on desktop.
 * Size and quantity build real Shopify cart links, so the pick here is the
 * pick that lands in the bag.
 */
export function ProductSheet({ product, onClose }: Props) {
  const [size, setSize] = useState<Size>("M");
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!product) return;
    setSize("M");
    setQty(1);
    setImg(0);
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;
  const variant = product.variants[size];
  const total = product.price * qty;
  const hero = product.images[img] ?? product.images[0];

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close product"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="relative flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] bg-white text-ink shadow-[0_-20px_60px_rgba(0,0,0,0.6)] sm:rounded-[2rem] sm:shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        style={{ animation: "sheet-in 0.32s cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        <style>{`@keyframes sheet-in { from { opacity: 0; transform: translate3d(0, 24px, 0); } to { opacity: 1; transform: none; } } @media (prefers-reduced-motion: reduce) { @keyframes sheet-in { from { opacity: 0 } to { opacity: 1 } } }`}</style>

        <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5">
          <span className="sm:hidden" aria-hidden="true">
            <span className="block h-1.5 w-10 rounded-full bg-black/15" />
          </span>
          <a
            href={productUrl(product)}
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-ink/60 hover:text-ink sm:inline-flex"
          >
            View on the shop <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto px-4 pb-6 pt-3 sm:grid-cols-2 sm:px-6 sm:pb-8">
          {/* Product on the pedestal */}
          <div className="flex gap-3">
            <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#f3f4f2] p-4 sm:min-h-[26rem]">
              <div
                className="pointer-events-none absolute bottom-[12%] left-1/2 h-8 w-[68%] -translate-x-1/2 rounded-[100%] border-[3px] border-neon/70"
                style={{ boxShadow: "0 0 30px rgba(26,254,0,0.35), inset 0 0 20px rgba(26,254,0,0.15)" }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute bottom-[13%] left-1/2 h-6 w-[50%] -translate-x-1/2 rounded-[100%] bg-black/20 blur-md" aria-hidden="true" />
              <img
                key={hero.src}
                src={hero.src}
                alt={hero.alt}
                width={1000}
                height={1000}
                decoding="async"
                className={cn(
                  "anim-float-soft relative z-10 max-h-[22rem] w-auto max-w-full object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)] sm:max-h-[24rem]",
                  hero.kind === "life" && "rounded-2xl",
                )}
              />
            </div>
            {product.images.length > 1 ? (
              <ul className="flex shrink-0 flex-col gap-2" aria-label="Photos">
                {product.images.map((im, i) => (
                  <li key={im.src}>
                    <button
                      type="button"
                      onClick={() => setImg(i)}
                      aria-label={im.alt}
                      aria-pressed={img === i}
                      className={cn(
                        "block h-14 w-14 overflow-hidden rounded-xl border-2 bg-[#f3f4f2] transition-colors",
                        img === i ? "border-ink" : "border-transparent hover:border-black/30",
                      )}
                    >
                      <img src={im.src} alt="" width={112} height={112} loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {product.isNew ? <span className="rounded-full bg-ink px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-neon">New</span> : null}
              <span className="rounded-full bg-neon px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-ink">{product.collection} collection</span>
            </div>
            <h2 id="sheet-title" className="font-display mt-3 text-xl font-extrabold uppercase leading-tight sm:text-2xl">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-ink/55">{product.details.join(" · ")}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{product.blurb}</p>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em]">Select size</p>
              <a href={productUrl(product)} target="_blank" rel="noopener" className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-ink/55 underline underline-offset-4 hover:text-ink">
                Size guide
              </a>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
              {SIZES.map((s) => {
                const on = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSize(s)}
                    className={cn(
                      "flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-xs font-extrabold transition-[background-color,color,border-color,transform] duration-150",
                      on ? "border-ink bg-ink text-neon" : "border-black/10 bg-[#f3f4f2] text-ink hover:border-ink",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em]">Qty</p>
                <div className="mt-2 inline-flex h-11 items-center rounded-full bg-[#f3f4f2]">
                  <button
                    type="button"
                    onClick={() => setQty((n) => Math.max(1, n - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5 disabled:opacity-30"
                    disabled={qty <= 1}
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-extrabold" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((n) => Math.min(10, n + 1))}
                    aria-label="Increase quantity"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5 disabled:opacity-30"
                    disabled={qty >= 10}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-ink/55">Total price</p>
                <p className="font-display text-2xl font-extrabold leading-none">{money(total)}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={addToBagUrl(variant, qty)}
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-ink text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)] active:translate-y-0"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Add to bag · {size} · {money(total)}
              </a>
              <a
                href={buyNowUrl(variant, qty)}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink bg-neon text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
              >
                Buy now, straight to checkout
              </a>
              <p className="text-center text-[0.66rem] text-ink/45">Checkout runs on the STARRBABY shop. Opens in a new tab.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
