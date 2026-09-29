import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { nav } from "@/data/site";
import { InstallApp } from "./InstallApp";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const ids = nav.map((n) => n.id);

/**
 * Header. Section links from lg up. Below that there is no menu: phones get
 * the App button and the green Shop button on the right, and the tab bar at
 * the bottom carries the jumps (owner, 2026-09-29).
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    // The header itself never takes a tap. Only the pill does, so the fixed
    // box can never sit on top of buttons further down the page.
    <header
      className="pointer-events-none fixed inset-x-0 z-50 transition-[top] duration-300"
      style={{ top: "var(--live-h, 0px)" }}
    >
      <div className="container-x pt-3 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto flex h-14 items-center justify-between gap-3 rounded-full px-3 pr-2 transition-[background-color,box-shadow,border-color] duration-300 sm:h-16 sm:px-4 sm:pr-2.5",
            scrolled ? "nav-pill rounded-full backdrop-blur-xl" : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex min-w-0 items-center gap-2.5"
            aria-label="STARRBABY WRLDWIDE, back to top"
          >
            <img
              src="/brand/star-3d.webp"
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 drop-shadow-[0_0_14px_rgba(26,254,0,0.5)] sm:h-10 sm:w-10"
            />
            <span className="font-display hidden truncate text-[0.7rem] font-extrabold uppercase leading-[1.1] tracking-[0.08em] min-[360px]:block sm:text-[0.72rem]">
              Starrbaby
              <br />
              <span className="text-neon">Wrldwide</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => go(n.id)}
                className={cn(
                  "group relative rounded-full px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-colors duration-200",
                  active === n.id ? "text-fg" : "text-fg/50 hover:text-fg",
                )}
                aria-current={active === n.id ? "true" : undefined}
              >
                {n.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-neon transition-transform duration-300 origin-left",
                    active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrappers carry the responsive display: the raised button styles are unlayered and would beat a utility on the element itself. */}
            <span className="block sm:hidden">
              <InstallApp compact />
            </span>
            <span className="hidden sm:block">
              <InstallApp />
            </span>
            <span className="block sm:hidden">
              <button type="button" onClick={() => go("products")} className="btn3d-neon !min-h-10 !px-3 !py-2 !text-[0.7rem]">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Shop
              </button>
            </span>
            <span className="hidden sm:block">
              <button type="button" onClick={() => go("products")} className="btn3d-neon !min-h-11 !py-2.5">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Shop
              </button>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
