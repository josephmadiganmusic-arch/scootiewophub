import { ArrowUpRight, Disc3, Play, Radio } from "lucide-react";
import { brand, music } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Music() {
  const f = music.featured;
  return (
    <section id="music" className="section-pad relative overflow-hidden" aria-labelledby="music-title">
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(26,254,0,0.26) 0%, rgba(26,254,0,0) 70%)" }}
        aria-hidden="true"
      />
      <div className="container-x">
        <SectionHeader
          eyebrow="Music"
          title={
            <span id="music-title">
              Listen <span className="text-neon">everywhere</span>
            </span>
          }
          lead="One link for every platform. The album, the singles, and the weekly live."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Featured album */}
          <Reveal className="lg:col-span-7">
            <article className="neu neu-neon grid grid-cols-1 gap-6 p-4 sm:grid-cols-5 sm:p-6">
              <div className="tilt relative sm:col-span-2">
                <img
                  src={f.cover}
                  alt={f.coverAlt}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-2xl object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]"
                />
                <span className="sticker absolute -left-2 -top-3 rotate-[-6deg]">{f.kind}</span>
              </div>
              <div className="flex flex-col justify-between gap-6 sm:col-span-3">
                <div>
                  <p className="eyebrow flex items-center gap-2">
                    <Disc3 className="h-3.5 w-3.5" aria-hidden="true" /> Out now
                  </p>
                  <h3 className="font-display mt-3 break-words text-2xl font-extrabold uppercase leading-[0.95] text-white sm:text-3xl xl:text-4xl">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                    Scootie Wop&rsquo;s album, out now everywhere you stream.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {f.links.map((l, i) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener" className={i === 0 ? "btn3d-neon" : "btn3d"}>
                        {i === 0 ? <Play className="h-4 w-4 fill-current" aria-hidden="true" /> : null}
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Singles, fan link style */}
          <Reveal index={1} className="lg:col-span-5">
            <div className="neu h-full p-5 sm:p-6">
              <p className="eyebrow">Singles</p>
              <ul className="mt-3 divide-y divide-white/8">
                {music.singles.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center gap-3 py-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors group-hover:bg-neon group-hover:text-ink">
                        <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-display block truncate text-[0.78rem] font-bold uppercase text-white transition-colors group-hover:text-neon">
                          {s.title}
                        </span>
                        {"note" in s && s.note ? <span className="block text-xs text-white/45">{s.note}</span> : null}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Platforms */}
          <Reveal index={2} className="lg:col-span-8">
            <div className="neu-sm flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="eyebrow !text-white/50">Streaming on</p>
              <ul className="flex flex-wrap gap-2">
                {music.platforms.map((p) => (
                  <li key={p.key}>
                    <a href={p.url} target="_blank" rel="noopener" className="btn3d !min-h-10 !px-4 !py-2 !text-[0.64rem]">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Submit to the live */}
          <Reveal index={3} className="lg:col-span-4">
            <a
              href={brand.liveUrl}
              target="_blank"
              rel="noopener"
              className="neu-sm neu-lift flex h-full items-center gap-4 p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neon text-ink">
                <Radio className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="font-display block text-sm font-bold uppercase text-white">Get your song reviewed</span>
                <span className="mt-1 block text-xs leading-relaxed text-white/55">Submit to STARR WARS, live every Thursday.</span>
              </span>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-neon" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
