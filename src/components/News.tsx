import { ArrowUpRight, CalendarDays, MapPin, Megaphone, Radio } from "lucide-react";
import { events } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const kindLabel: Record<string, string> = {
  show: "Show",
  popup: "Pop up",
  live: "Live show",
};

export function News({ live: liveNow = false }: { live?: boolean }) {
  const live = events.filter((e) => e.kind === "live");
  const dated = events.filter((e) => e.kind !== "live");
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="news" className="section-pad relative" aria-labelledby="news-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="News"
          title={
            <span id="news-title">
              Shows &amp; <span className="text-neon-outline">pop ups</span>
            </span>
          }
          lead="Where to catch Scootie and the family next. Shows, pop up events, and the weekly live."
          aside={
            <button type="button" className="btn3d" onClick={() => go("signup")}>
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              Get alerts
            </button>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* The weekly live, pinned */}
          {live.map((e) => (
            <Reveal key={e.id} className="lg:col-span-7">
              <article className="neu neu-neon relative flex h-full flex-col justify-between gap-8 overflow-hidden p-6 sm:p-8">
                <img
                  src="/brand/starrwars-logo.webp"
                  alt=""
                  width={557}
                  height={241}
                  loading="lazy"
                  className="pointer-events-none absolute -right-6 -top-4 w-44 opacity-25 sm:w-56"
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2">
                    {liveNow ? (
                      <span className="chip-neon !border-[#ff3b3b]/50 !bg-[#ff3b3b]/15 !text-ink">
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b3b] opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff3b3b]" />
                        </span>
                        Live now
                      </span>
                    ) : (
                      <span className="chip-neon">
                        <span className="anim-blink inline-block h-1.5 w-1.5 rounded-full bg-neon" aria-hidden="true" />
                        {kindLabel[e.kind]}
                      </span>
                    )}
                    {e.recurring ? <span className="chip-neon !border-ink/15 !bg-ink/5 !text-ink/70">Weekly</span> : null}
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-extrabold uppercase leading-[1] text-ink sm:text-4xl">
                    {e.title}
                  </h3>
                  <dl className="mt-5 grid grid-cols-1 gap-3 text-sm text-ink/70 sm:grid-cols-2">
                    <div className="flex items-center gap-2.5">
                      <CalendarDays className="h-4 w-4 shrink-0 text-neon-deep" aria-hidden="true" />
                      <dt className="sr-only">When</dt>
                      <dd>{e.when}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Radio className="h-4 w-4 shrink-0 text-neon-deep" aria-hidden="true" />
                      <dt className="sr-only">Where</dt>
                      <dd>{e.where}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60">
                    Scootie reacts to fan submitted songs live. A 10 out of 10 takes the STARR WARS champion tile. Hold
                    it four weeks and the STARRBUCKS pot pays out.
                  </p>
                </div>
                {e.url ? (
                  <div className="relative flex flex-wrap gap-3">
                    <a href={e.url} target="_blank" rel="noopener" className="btn3d-neon">
                      {liveNow ? "Watch live now" : (e.cta ?? "Watch")}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a href={e.url} target="_blank" rel="noopener" className="btn3d">
                      {liveNow ? "Submit a song" : "Watch live"}
                    </a>
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}

          {/* Dated shows and pop ups */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {dated.length === 0 ? (
              <Reveal index={1} className="h-full">
                <div className="neu flex h-full flex-col items-start justify-between gap-6 p-6 sm:p-8">
                  <div>
                    <p className="eyebrow">Next up</p>
                    <h3 className="font-display mt-3 text-xl font-extrabold uppercase leading-tight text-ink sm:text-2xl">
                      Nothing on the calendar yet
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/60">
                      Shows and pop ups land here the moment they get booked. Join the list and you hear first.
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon-deep">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <button type="button" className="btn3d-neon flex-1" onClick={() => go("signup")}>
                      Join the list
                    </button>
                  </div>
                </div>
              </Reveal>
            ) : (
              dated.map((e, i) => (
                <Reveal key={e.id} index={i + 1} as="article">
                  <div className="neu-sm neu-lift flex items-start gap-4 p-5">
                    <div className="neu-xs flex h-14 w-14 shrink-0 flex-col items-center justify-center text-center">
                      <span className="eyebrow !text-[0.7rem]">{kindLabel[e.kind]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-bold uppercase leading-tight text-ink">{e.title}</h3>
                      <p className="mt-1 text-sm text-ink/65">{e.when}</p>
                      <p className="text-sm text-ink/45">{e.where}</p>
                    </div>
                    {e.url ? (
                      <a href={e.url} target="_blank" rel="noopener" className="btn3d btn3d-icon shrink-0" aria-label={e.cta ?? "Details"}>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
