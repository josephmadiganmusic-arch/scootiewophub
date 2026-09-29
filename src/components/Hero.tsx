import { useEffect, useState } from "react";
import { ArrowDown, Play, ShoppingBag } from "lucide-react";
import ChromaTide from "@/components/ui/background-gradient-shader";
import { brand } from "@/data/site";

// Ramp for the tide, black edition: black at the low end, a deep felt green
// through the middle, his neon only at the peaks, so the smoke reads as green
// light moving through a dark room rather than a green wall.
const TIDE = ["#050605", "#082F06", "#12AC05"];

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
        style={{ background: "radial-gradient(70% 60% at 68% 45%, #0D2C0A 0%, #0A0A0A 70%)" }}
      >
        {tideReady ? (
          <div className="animate-in fade-in absolute inset-0 duration-700">
            <ChromaTide colors={TIDE} speed={0.45} scale={0.9} className="absolute inset-0 h-full w-full" />
          </div>
        ) : null}
      </div>
      {/* Legibility: dark behind the copy, a vignette at the edges, a fade into the page at the bottom */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,10,0.84) 0%, rgba(10,10,10,0.55) 36%, rgba(10,10,10,0.12) 68%), radial-gradient(120% 90% at 50% 50%, rgba(10,10,10,0) 42%, rgba(10,10,10,0.72) 100%), linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0) 24%, rgba(10,10,10,0) 60%, #0A0A0A 100%)",
        }}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <div
        className="container-x relative grid w-full grid-cols-1 items-center gap-12 pb-20 pt-28 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-32"
        style={{ paddingTop: "calc(7rem + var(--live-h, 0px))" }}
      >
        {/* Copy */}
        <div className="min-w-0 md:col-span-7 lg:col-span-7">
          <p className="eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="chip-neon">
              <span className="anim-blink inline-block h-1.5 w-1.5 rounded-full bg-neon" aria-hidden="true" />
              Est. {brand.founded}
            </span>
            <span className="text-fg/50 tracking-[0.28em]">{brand.hometown}</span>
          </p>
          <h1 className="text-display-hero text-fg">
            <span className="text-stitch block">Starrbaby</span>
            <span className="block text-neon-outline">Wrldwide</span>
          </h1>
          <p className="font-display mt-6 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-fg/60 sm:text-xs">
            {brand.pillars.join(" · ")}
          </p>
          <p className="lead mt-4 max-w-xl">
            Scootie Wop&rsquo;s brand out of Hilton Head. The clothes, the records, and the people making them.{" "}
            <span className="text-fg font-bold">{brand.tagline}.</span>
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

        {/* The star in the black glass tile: chrome rim, hard reflection, neon light behind */}
        <div className="relative mx-auto w-full max-w-[22rem] md:col-span-5 md:max-w-none">
          <div className="relative mx-auto aspect-square w-[min(76vw,22rem)] md:w-full md:max-w-[26rem] lg:max-w-[30rem]">
            <div className="anim-pulse-ring absolute inset-0 rounded-[2rem]" aria-hidden="true" />
            <div className="absolute inset-0">
              <div className="chrome h-full w-full">
                <div className="chrome-face h-full w-full">
                  <div
                    className="anim-glow absolute inset-[16%] rounded-full blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(26,254,0,0.55) 0%, rgba(26,254,0,0) 70%)" }}
                    aria-hidden="true"
                  />
                  <div className="anim-float absolute inset-[13%]">
                    <div className="anim-sway h-full w-full">
                      <img
                        src="/brand/star-3d.webp"
                        alt="The STARRBABY star smiley, glossy neon green, floating"
                        width={640}
                        height={640}
                        fetchPriority="high"
                        decoding="async"
                        className="h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.85)]"
                        style={{ backfaceVisibility: "visible" }}
                      />
                    </div>
                  </div>
                </div>
                <span className="sparkle left-[5%] top-[5%]" aria-hidden="true" />
                <span className="sparkle bottom-[6%] right-[6%] !h-2.5 !w-2.5" aria-hidden="true" />
              </div>
            </div>
            {/* One sticker, off the corner, so the tile keeps its air */}
            <span
              className="sticker anim-float-soft absolute -bottom-4 -right-2 rotate-[-7deg] sm:-right-5"
              style={{ animationDelay: "0.8s" }}
            >
              Created
              <br />
              to Create
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.3em] text-fg/50 transition-colors hover:text-neon md:flex"
        aria-label="Scroll to the history of SB"
      >
        History of SB
        <ArrowDown className="anim-float-soft h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
