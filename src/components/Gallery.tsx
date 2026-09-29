import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback((d: number) => {
    setIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [idx, close, step]);

  const current = idx === null ? null : gallery[idx];

  return (
    <section id="gallery" className="section-pad relative" aria-labelledby="gallery-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Photo gallery"
          title={
            <span id="gallery-title">
              In the <span className="text-neon">frame</span>
            </span>
          }
          lead="Eight photos of Scootie. Tap one to open it."
        />
        <ul className="columns-2 gap-3 sm:gap-4 lg:columns-4" aria-label="Photos">
          {gallery.map((p, i) => (
            <Reveal key={p.src} index={i % 4} as="li" className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setIdx(i)}
                className="neu-sm neu-lift group block w-full overflow-hidden p-1.5 text-left sm:p-2"
                aria-label={`Open photo: ${p.alt}`}
              >
                <span className="block overflow-hidden rounded-[0.9rem]">
                  <img
                    src={p.thumb}
                    alt={p.alt}
                    width={Math.round(p.w / 2)}
                    height={Math.round(p.h / 2)}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover"
                    style={{ aspectRatio: `${p.w} / ${p.h}` }}
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {current ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={current.alt}>
          <button type="button" className="absolute inset-0 bg-black/85 backdrop-blur-sm" aria-label="Close photo" onClick={close} />
          <figure className="relative max-h-full max-w-5xl">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.w}
              height={current.h}
              className="max-h-[86svh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
              style={{ animation: "lb-in 0.25s cubic-bezier(0.23,1,0.32,1)" }}
            />
            <style>{`@keyframes lb-in { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: none } }`}</style>
            <figcaption className="mt-3 text-center text-xs text-white/60">
              {current.alt} · {idx! + 1} of {gallery.length}
            </figcaption>
          </figure>
          <button type="button" onClick={close} aria-label="Close" className="btn3d btn3d-icon absolute right-3 top-3 sm:right-6 sm:top-6">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="btn3d btn3d-icon absolute left-3 top-1/2 -translate-y-1/2 sm:left-6">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="btn3d btn3d-icon absolute right-3 top-1/2 -translate-y-1/2 sm:right-6">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
