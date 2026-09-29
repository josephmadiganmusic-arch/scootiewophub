import { ArrowUpRight } from "lucide-react";
import { brand, nav, socials } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const line = `${brand.name} · ${brand.tagline} · `;

  return (
    <footer className="relative overflow-hidden border-t border-white/8 pt-10">
      {/* Marquee */}
      <div className="overflow-hidden whitespace-nowrap" aria-hidden="true">
        <div className="anim-marquee inline-block will-change-transform">
          {[0, 1].map((k) => (
            <span key={k} className="font-display inline-block pr-4 text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-none tracking-tight text-white/[0.07]">
              {line.repeat(2)}
            </span>
          ))}
        </div>
      </div>

      <div className="container-x pb-10 pt-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/brand/star-3d.webp" alt="" width={48} height={48} className="h-12 w-12 drop-shadow-[0_0_16px_rgba(26,254,0,0.5)]" />
              <p className="font-display text-sm font-extrabold uppercase leading-tight tracking-[0.08em]">
                Starrbaby
                <br />
                <span className="text-neon">Wrldwide</span>
              </p>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Music, fashion, lifestyle. Founded {brand.founded} by Scootie Wop in {brand.hometown}.
            </p>
            <p className="font-display mt-4 text-xs font-bold uppercase tracking-[0.24em] text-neon">{brand.tagline}</p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer sections">
            <p className="eyebrow !text-white/45">Site</p>
            <ul className="mt-3 space-y-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => go(n.id)} className="text-sm text-white/70 transition-colors hover:text-neon">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow !text-white/45">Follow</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="neu-xs neu-lift flex items-center justify-between gap-2 px-3.5 py-2.5 text-sm text-white/80"
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">{s.label}</span>
                      <span className="block truncate">{s.handle}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-neon" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a href={brand.shopUrl} target="_blank" rel="noopener" className="btn3d-neon w-full !min-h-[3.1rem]">
                  Shop
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="groove mt-10" aria-hidden="true" />
        <div className="flex flex-col gap-2 pt-5 text-[0.66rem] uppercase tracking-[0.18em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {brand.name}. All rights reserved.</p>
          <p>{brand.hometown}</p>
        </div>
      </div>
    </footer>
  );
}
