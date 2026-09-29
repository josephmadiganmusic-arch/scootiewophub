import { Home, Megaphone, Music2, Radio, ShoppingBag } from "lucide-react";
import { brand } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

type Props = { live: boolean };

const watched = ["products", "music", "signup"] as const;

/**
 * Phone tab bar, attached to the bottom edge. Home, Shop, Music and Sign up
 * on the rail, the Live button raised in the middle on top of it. Hidden
 * from lg up where the nav carries the same jumps.
 */
export function MobileBar({ live }: Props) {
  const active = useActiveSection(watched);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const item =
    "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.7rem] font-black uppercase tracking-[0.14em] transition-colors duration-200";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden" aria-label="Quick jumps">
      <div
        className="tabbar relative flex items-end px-2 pt-2"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <button type="button" onClick={top} className={cn(item, "text-ink/60")}>
          <Home className="h-5 w-5" aria-hidden="true" />
          Home
        </button>
        <button
          type="button"
          onClick={() => go("products")}
          className={cn(item, active === "products" ? "text-neon-deep" : "text-ink/60")}
          aria-current={active === "products" ? "true" : undefined}
        >
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          Shop
        </button>

        {/* Live, centered and raised above the rail */}
        <div className="flex min-w-0 flex-1 flex-col items-center justify-end">
          <a
            href={brand.liveUrl}
            target="_blank"
            rel="noopener"
            className="tab-live relative -mt-8 flex h-16 w-16 items-center justify-center rounded-full text-ink"
            aria-label={live ? "Scootie Wop is live now on Rollout Heaven. Watch." : "Rollout Heaven live page"}
          >
            <Radio className="h-7 w-7" aria-hidden="true" />
            {live ? (
              <span className="absolute right-1 top-1 flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b3b] opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#F2F4EA] bg-[#ff3b3b]" />
              </span>
            ) : null}
          </a>
          <span className={cn("mt-1 text-[0.7rem] font-black uppercase tracking-[0.14em]", live ? "text-[#c81e1e]" : "text-ink/70")}>
            {live ? "Live now" : "Live"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => go("music")}
          className={cn(item, active === "music" ? "text-neon-deep" : "text-ink/60")}
          aria-current={active === "music" ? "true" : undefined}
        >
          <Music2 className="h-5 w-5" aria-hidden="true" />
          Music
        </button>
        <button
          type="button"
          onClick={() => go("signup")}
          className={cn(item, active === "signup" ? "text-neon-deep" : "text-ink/60")}
          aria-current={active === "signup" ? "true" : undefined}
        >
          <Megaphone className="h-5 w-5" aria-hidden="true" />
          Sign up
        </button>
      </div>
    </nav>
  );
}
