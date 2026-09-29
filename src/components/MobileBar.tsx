import { Home, Music2, Radio, ShoppingBag } from "lucide-react";
import { brand } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

type Props = { live: boolean };

const watched = ["products", "music"] as const;

/**
 * Phone tab bar. Four jumps that matter on a phone: home, the shop, the
 * music, and the live show. Hidden from lg up where the nav carries it.
 */
export function MobileBar({ live }: Props) {
  const active = useActiveSection(watched);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const item = "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] transition-colors duration-200";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      aria-label="Quick jumps"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="container-x">
        <div className="neu-sm neu-round flex items-stretch gap-1 p-1.5 backdrop-blur-xl">
          <button type="button" onClick={top} className={cn(item, "text-white/60 hover:text-white")}>
            <Home className="h-5 w-5" aria-hidden="true" />
            Home
          </button>
          <button
            type="button"
            onClick={() => go("products")}
            className={cn(item, active === "products" ? "bg-white/[0.06] text-neon" : "text-white/60")}
            aria-current={active === "products" ? "true" : undefined}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            Shop
          </button>
          <button
            type="button"
            onClick={() => go("music")}
            className={cn(item, active === "music" ? "bg-white/[0.06] text-neon" : "text-white/60")}
            aria-current={active === "music" ? "true" : undefined}
          >
            <Music2 className="h-5 w-5" aria-hidden="true" />
            Music
          </button>
          <a
            href={brand.liveUrl}
            target="_blank"
            rel="noopener"
            className={cn(item, live ? "bg-neon text-ink" : "text-white/60")}
            aria-label={live ? "Scootie Wop is live now on Rollout Heaven" : "Rollout Heaven live page"}
          >
            <span className="relative">
              <Radio className="h-5 w-5" aria-hidden="true" />
              {live ? (
                <span className="absolute -right-1.5 -top-1 flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b3b] opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3b3b]" />
                </span>
              ) : null}
            </span>
            {live ? "Live now" : "Live"}
          </a>
        </div>
      </div>
    </nav>
  );
}
