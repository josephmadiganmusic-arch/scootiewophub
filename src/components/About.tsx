import { about, brand } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden" aria-labelledby="about-title">
      {/* Soft green wash behind the character */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(26,254,0,0.28) 0%, rgba(26,254,0,0) 70%)" }}
        aria-hidden="true"
      />
      <div className="container-x">
        <SectionHeader
          eyebrow={about.eyebrow}
          title={
            <span id="about-title">
              The story of <span className="text-neon-outline">SB</span>
            </span>
          }
          lead={`Founded ${brand.founded} in ${brand.hometown}. Music, fashion, lifestyle.`}
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Character */}
          <Reveal className="order-2 md:order-1 md:col-span-4 lg:col-span-4">
            {/* The character gets the whole tile to himself; the stickers sit under it. */}
            <div className="neu relative mx-auto flex max-w-xs items-end justify-center overflow-hidden px-8 pt-14 md:max-w-none">
              <div
                className="anim-glow absolute inset-x-8 bottom-6 h-12 rounded-[100%] bg-neon/45 blur-xl"
                aria-hidden="true"
              />
              <img
                src="/brand/star-character.webp"
                alt="The STARRBABY star head character, hands in his jacket pockets"
                width={700}
                height={1623}
                loading="lazy"
                decoding="async"
                className="anim-float-soft relative h-auto w-[58%] max-w-[230px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)]"
              />
              <div className="groove absolute inset-x-6 bottom-0" aria-hidden="true" />
            </div>
            <div className="mx-auto mt-6 flex max-w-xs flex-wrap items-center justify-center gap-4 md:max-w-none">
              <span className="sticker rotate-[-3deg]">Est. {brand.founded}</span>
              <span className="sticker sticker-black rotate-[2deg]">Hilton Head, SC</span>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 min-w-0 md:order-2 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} index={i} as="div">
                  <p className={i === 0 ? "lead text-fg/85" : "text-base leading-[1.75] text-fg/70 sm:text-lg"}>
                    {i === 0 ? (
                      <>
                        <span className="font-display text-neon text-[0.85em] uppercase tracking-wide">{brand.name}</span>
                        {p.slice(brand.name.length)}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal index={3} className="mt-8">
              <blockquote className="neu-sm neu-green relative px-6 py-6 sm:px-8">
                <img
                  src="/brand/star-smiley.webp"
                  alt=""
                  width={64}
                  height={62}
                  loading="lazy"
                  className="absolute -top-5 right-6 h-12 w-12 rotate-12 drop-shadow-[0_0_14px_rgba(26,254,0,0.6)]"
                />
                <p className="font-display text-[0.95rem] font-bold uppercase leading-[1.5] tracking-wide text-fg sm:text-lg">
                  {brand.name} is music, it&rsquo;s fashion, it&rsquo;s a lifestyle.
                </p>
                <p className="mt-2 font-display text-neon neon-glow-text text-sm font-extrabold uppercase tracking-[0.2em] sm:text-base">
                  {brand.tagline}
                </p>
              </blockquote>
            </Reveal>

            {/* Milestones */}
            <ol className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {about.milestones.map((m, i) => (
                <Reveal key={m.title} index={i} as="li" className="min-w-0">
                  <div className="neu-xs neu-lift h-full px-5 py-4">
                    <p className="eyebrow !text-[0.7rem]">{m.year}</p>
                    <p className="font-display mt-1 text-[0.8rem] font-bold uppercase leading-tight text-fg">{m.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg/72">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal index={2} className="mt-8">
              <p className="eyebrow mb-3 !text-fg/50">Inspired by</p>
              <ul className="flex flex-wrap gap-2">
                {about.influences.map((n) => (
                  <li key={n} className="chip-neon !normal-case !tracking-[0.08em] !text-[0.72rem]">
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
