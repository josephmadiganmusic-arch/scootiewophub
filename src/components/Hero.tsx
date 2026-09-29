import { ArrowDown, Play, ShoppingBag } from "lucide-react";
import ChromaTide from "@/components/ui/background-gradient-shader";
import { brand } from "@/data/site";

// Ramp for the tide: deep black at the low end, mid green in the middle,
// full neon at the peaks. The overlay gradients keep the type readable.
const TIDE = ["#030603", "#0b7a02", "#1AFE00"];

export function Hero() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      aria-label="STARRBABY WRLDWIDE"
    >
      {/* The tide */}
      <div className="absolute inset-0 -z-20">
        <ChromaTide colors={TIDE} speed={0.55} scale={0.9} className="absolute inset-0 h-full w-full" />
      </div>
      {/* Legibility: darken the left column and fade to the page black at the bottom */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.86) 0%, rgba(5,5,5,0.55) 42%, rgba(5,5,5,0.18) 100%), linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0) 30%, rgba(5,5,5,0) 60%, #050505 100%)",
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
              <span className="anim-blink inline-block h-1.5 w-1.5 rounded-full bg-neon" aria-hidden="true" />
              Est. {brand.founded}
            </span>
            <span className="text-white/60 tracking-[0.28em]">{brand.hometown}</span>
          </p>
          <h1 className="text-display-hero">
            <span className="block">Starrbaby</span>
            <span className="block text-neon neon-glow-text">Wrldwide</span>
          </h1>
          <p className="font-display mt-6 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
            {brand.pillars.join(" · ")}
          </p>
          <p className="lead mt-4 max-w-xl">
            Scootie Wop&rsquo;s brand out of Hilton Head. The clothes, the records, and the people making them.{" "}
            <span className="text-white">{brand.tagline}.</span>
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
            {/* Plinth: a raised glass disc so the tide still shows through */}
            <div
              className="anim-pulse-ring absolute inset-[8%] rounded-full border border-white/10 backdrop-blur-md"
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(30,30,30,0.55) 0%, rgba(5,5,5,0.45) 60%, rgba(5,5,5,0.6) 100%)",
                borderTopColor: "rgba(255,255,255,0.22)",
                borderBottomColor: "rgba(0,0,0,0.6)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-[22%] rounded-full opacity-80 blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(26,254,0,0.6) 0%, rgba(26,254,0,0) 70%)" }}
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
                  className="h-full w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
                  style={{ backfaceVisibility: "visible" }}
                />
              </div>
            </div>
            {/* Sticker */}
            <span
              className="sticker anim-float-soft absolute -right-1 bottom-[8%] rotate-[-8deg] sm:right-0"
              style={{ animationDelay: "0.8s" }}
            >
              Created
              <br />
              to Create
            </span>
            <span className="sticker absolute -left-1 top-[6%] rotate-[6deg] !bg-white !text-ink sm:left-2">
              Star smiley
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go("about")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-neon md:flex"
        aria-label="Scroll to the history of SB"
      >
        History of SB
        <ArrowDown className="anim-float-soft h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
