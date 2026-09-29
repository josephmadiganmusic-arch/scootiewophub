import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { nav } from "@/data/site";
import { InstallApp } from "./InstallApp";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const ids = nav.map((n) => n.id);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    // The header itself never takes a tap. Only the pill and the open sheet do,
    // so the fixed box can never sit on top of buttons further down the page.
    <header
      className="pointer-events-none fixed inset-x-0 z-50 transition-[top] duration-300"
      style={{ top: "var(--live-h, 0px)" }}
    >
      <div className="container-x pt-3 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto flex h-14 items-center justify-between gap-3 rounded-full px-3 pr-2 transition-[background-color,box-shadow,border-color] duration-300 sm:h-16 sm:px-4 sm:pr-2.5",
            scrolled || open
              ? "nav-pill rounded-full backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
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
            <span className="hidden sm:block">
              <button type="button" onClick={() => go("products")} className="btn3d-neon !min-h-11 !py-2.5">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Shop
              </button>
            </span>
            <span className="block lg:hidden">
              <button
                type="button"
                className="btn3d btn3d-icon"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </span>
          </div>
        </div>

        {/* Mobile sheet: absolute under the pill so it never adds to the header's box */}
        <div
          id="mobile-nav"
          className={cn(
            "absolute inset-x-0 top-full lg:hidden transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
            open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2",
          )}
          aria-hidden={!open}
        >
          <div className="container-x">
            <div className="neu mt-3 p-3">
              <ul className="grid grid-cols-2 gap-2">
                {nav.map((n) => (
                  <li key={n.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => go(n.id)}
                      tabIndex={open ? 0 : -1}
                      className={cn("btn3d w-full !justify-start !px-4 !text-[0.7rem]", active === n.id && "is-on")}
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
                <li className="col-span-2">
                  <button type="button" onClick={() => go("products")} tabIndex={open ? 0 : -1} className="btn3d-neon w-full">
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    Shop the drop
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
