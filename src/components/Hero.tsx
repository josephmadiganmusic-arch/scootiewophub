import { useEffect, useState } from "react";
import { ArrowDown, Play, ShoppingBag } from "lucide-react";
import ChromaTide from "@/components/ui/background-gradient-shader";
import { brand } from "@/data/site";

// Ramp for the tide, cream edition: cream at the low end, a pale green in
// the middle, his neon at the peaks. Reads like the cream and green swirl
// reference, kept inside his hue.
const TIDE = ["#D9E6C2", "#6FC95A", "#12D200"];

export function Hero() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  // The shader compiles after the first frame has painted, so the type and
  // the star land first and the page never stalls on WebGL before showing.
  const [tideReady, setTideReady] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => window.requestAnimationFrame(() => setTideReady(true)));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      aria-label="STARRBABY WRLDWIDE"
    >
      {/* The tide */}
      <div
        className="absolute inset-0 -z-20"
        style={{ background: "radial-gradient(70% 60% at 70% 45%, #8FD97C 0%, #D9E6C2 70%)" }}
      >
        {tideReady ? (
          <div className="animate-in fade-in absolute inset-0 duration-700">
            <ChromaTide colors={TIDE} speed={0.5} scale={0.9} className="absolute inset-0 h-full w-full" />
          </div>
        ) : null}
      </div>
      {/* Legibility: a cream wash behind the copy and a fade into the page at the bottom */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(230,238,215,0.55) 0%, rgba(230,238,215,0.25) 40%, rgba(230,238,215,0) 70%), linear-gradient(180deg, rgba(230,238,215,0.2) 0%, rgba(230,238,215,0) 25%, rgba(230,238,215,0) 65%, #E6EED7 100%)",
        }}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div
        className="container-x relative grid w-full grid-cols-1 items-center gap-10 pb-20 pt-28 md:grid-cols-12 md:gap-6 md:pb-24 md:pt-32"
        style={{ paddingTop: "calc(7rem + var(--live-h, 0px))" }}
      >
        {/* Copy */}
        <div className="min-w-0 md:col-span-7 lg:col-span-7">
          <p className="eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="chip-neon">
              <span className="anim-blink inline-block h-1.5 w-1.5 rounded-full bg-neon-deep" aria-hidden="true" />
              Est. {brand.founded}
            </span>
            <span className="text-ink/55 tracking-[0.28em]">{brand.hometown}</span>
          </p>
          <h1 className="text-display-hero text-ink">
            <span className="block">Starrbaby</span>
            <span className="block text-neon-outline">Wrldwide</span>
          </h1>
          <p className="font-display mt-6 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-ink/65 sm:text-xs">
            {brand.pillars.join(" · ")}
          </p>
          <p className="lead mt-4 max-w-xl">
            Scootie Wop&rsquo;s brand out of Hilton Head. The clothes, the records, and the people making them.{" "}
            <span className="text-ink font-bold">{brand.tagline}.</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" className="btn3d-neon" onClick={() => go("products")}>
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Shop the drop
            </button>
            <button type="button" className="btn3d" onClick={() => go("music")}>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Listen
            </button>
          </div>
        </div>

        {/* The 3D star on a raised plinth */}
        <div className="relative mx-auto w-full max-w-[22rem] md:col-span-5 md:max-w-none">
          <div className="relative mx-auto aspect-square w-[min(78vw,22rem)] md:w-full md:max-w-[26rem] lg:max-w-[30rem]">
            {/* Plinth: a black disc so the star's edge reads clean, lit from the top left */}
            <div
              className="anim-pulse-ring absolute inset-[8%] rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 25%, #232a20 0%, #0b0f09 55%, #030403 100%)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderBottomColor: "rgba(0,0,0,0.7)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 14px 18px 40px rgba(52,72,36,0.4)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-[22%] rounded-full opacity-90 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(26,254,0,0.5) 0%, rgba(26,254,0,0) 70%)" }}
              aria-hidden="true"
            />
            {/* Star */}
            <div className="anim-float absolute inset-[14%]">
              <div className="anim-sway h-full w-full">
                <img
                  src="/brand/star-3d.webp"
                  alt="The STARRBABY star smiley, glossy neon green, floating"
                  width={640}
                  height={640}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(52,72,36,0.45)]"
                  style={{ backfaceVisibility: "visible" }}
                />
              </div>
            </div>
            {/* Stickers */}
            <span
              className="sticker anim-float-soft absolute -right-1 bottom-[8%] rotate-[-8deg] sm:right-0"
              style={{ animationDelay: "0.8s" }}
            >
              Created
              <br />
              to Create
            </span>
            <span className="sticker sticker-cream absolute -left-1 top-[6%] rotate-[6deg] sm:left-2">Star smiley</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.3em] text-ink/50 transition-colors hover:text-neon-deep md:flex"
        aria-label="Scroll to the history of SB"
      >
        History of SB
        <ArrowDown className="anim-float-soft h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
