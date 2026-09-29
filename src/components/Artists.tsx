import { ArrowUpRight, Plus } from "lucide-react";
import { artists, featuredOn } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Artists() {
  const featured = artists.find((a) => a.featured) ?? artists[0];
  const rest = artists.filter((a) => a !== featured);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="artists" className="section-pad relative" aria-labelledby="artists-title">
      <div className="container-x">
        <SectionHeader
          eyebrow="Artist"
          title={
            <span id="artists-title">
              Scootie <span className="text-neon-outline">&amp; more</span>
            </span>
          }
          lead="The founder, the roster, and the artists who show up on STARRBABY WRLDWIDE records."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {/* Featured artist */}
          <Reveal className="md:col-span-7 lg:col-span-8">
            <article className="neu tilt relative grid grid-cols-1 overflow-hidden sm:grid-cols-5">
              <div className="relative aspect-[4/5] sm:col-span-2 sm:aspect-auto sm:min-h-[26rem]">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  width={1365}
                  height={2048}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 sm:hidden"
                  style={{ background: "linear-gradient(180deg, rgba(237,236,227,0) 55%, rgba(237,236,227,1) 100%)" }}
                  aria-hidden="true"
                />
                <span className="sticker absolute left-4 top-4 rotate-[-5deg]">Founder</span>
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 sm:col-span-3 sm:p-8">
                <div>
                  <p className="eyebrow">{featured.role}</p>
                  <h3 className="font-display mt-3 text-3xl font-extrabold uppercase leading-[0.95] text-ink sm:text-4xl lg:text-5xl">
                    {featured.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">{featured.bio}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {featured.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener" className="btn3d !min-h-10 !px-4 !py-2 !text-[0.7rem]">
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Roster and features */}
          <div className="flex flex-col gap-4 md:col-span-5 lg:col-span-4">
            {rest.map((a, i) => (
              <Reveal key={a.slug} index={i + 1} as="article">
                <div className="neu-sm neu-lift flex items-center gap-4 p-4">
                  <img src={a.image} alt={a.imageAlt} width={80} height={80} loading="lazy" className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <h3 className="font-display truncate text-sm font-bold uppercase text-ink">{a.name}</h3>
                    <p className="text-xs text-ink/55">{a.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal index={1}>
              <div className="neu-sm flex items-center gap-4 border-dashed p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon-deep">
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold uppercase text-ink">More on the way</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink/55">
                    Building up artists he believes in. New names land here as they join the family.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className="neu p-5 sm:p-6">
                <p className="eyebrow">On SB WRLDWIDE records</p>
                <ul className="mt-4 divide-y divide-ink/10">
                  {featuredOn.map((f) => (
                    <li key={f.name}>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener"
                        className="group flex items-center justify-between gap-3 py-3 transition-colors hover:text-neon-deep"
                      >
                        <span className="min-w-0">
                          <span className="font-display block truncate text-sm font-bold uppercase text-ink group-hover:text-neon-deep-deep">
                            {f.name}
                          </span>
                          <span className="block text-xs text-ink/50">on {f.release}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-deep-deep" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => go("music")} className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-neon-deep">
                  Hear the records
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
