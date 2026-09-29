import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Share, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    __sbInstallPrompt?: { prompt: () => void; userChoice?: Promise<{ outcome: string }> } | null;
  }
}

/**
 * "Add as app". Chrome and Android get the real install prompt, which
 * index.html captures before React loads. Everyone else gets the steps for
 * their own browser, because Safari has no install API. The button goes away
 * once the site is running as an installed app.
 */
export function InstallApp({ compact = false, className }: { compact?: boolean; className?: string }) {
  const [standalone, setStandalone] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    setStandalone(window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true);
    const onInstalled = () => {
      setInstalled(true);
      setOpen(false);
      window.__sbInstallPrompt = null;
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (standalone || installed) return null;

  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const iosSafari = iOS && /WebKit/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  const android = /Android/.test(ua);
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  const steps: ReactNode[] = iosSafari
    ? [
        <>Tap the share button <Share className="-mt-0.5 inline h-3.5 w-3.5 text-neon-deep" aria-hidden="true" /> at the bottom of Safari.</>,
        <>Scroll down and tap <strong>Add to Home Screen</strong>.</>,
        <>Tap <strong>Add</strong>. STARRBABY lands on your home screen.</>,
      ]
    : iOS
      ? [
          <>Open this page in <strong>Safari</strong>. Only Safari can add an app on iPhone.</>,
          <>Tap the share button, then <strong>Add to Home Screen</strong>.</>,
          <>Tap <strong>Add</strong>.</>,
        ]
      : android
        ? [
            <>Tap the <strong>&#8942;</strong> menu at the top right of the browser.</>,
            <>Tap <strong>Add to Home screen</strong>, or <strong>Install app</strong>.</>,
            <>Confirm. STARRBABY lands on your home screen.</>,
          ]
        : [
            <>Look for the install icon at the right of the address bar.</>,
            <>Click it, then click <strong>Install</strong>.</>,
            <>It opens in its own window.</>,
          ];

  const handleClick = () => {
    const p = window.__sbInstallPrompt;
    if (p && typeof p.prompt === "function") {
      p.prompt();
      p.userChoice
        ?.then((r) => {
          if (r.outcome === "accepted") setInstalled(true);
          window.__sbInstallPrompt = null;
        })
        .catch(() => {});
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Add STARRBABY WRLDWIDE as an app on your phone"
        className={cn("btn3d whitespace-nowrap !min-h-10 !py-2", compact ? "!px-3 !text-[0.7rem]" : "!px-4 !text-[0.7rem]", className)}
      >
        <Smartphone className="h-4 w-4 text-neon-deep" aria-hidden="true" />
        <span>{compact ? "App" : "Add as app"}</span>
      </button>

      {/* Portalled to body: the button lives in the fixed nav, whose backdrop blur would trap a fixed sheet inside the bar. */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[95] flex items-end justify-center bg-ink/45 p-4 backdrop-blur-sm sm:items-center" onClick={() => setOpen(false)}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="install-title"
              className="neu relative w-full max-w-md p-6 text-center sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="btn3d btn3d-icon absolute right-4 top-4 !h-9 !w-9">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <img src="/icons/icon-192.png" alt="" width={72} height={72} className="neu-xs mx-auto mb-4 h-[72px] w-[72px] p-1.5" />
              <h3 id="install-title" className="font-display text-lg font-extrabold uppercase leading-tight text-ink">
                Add STARRBABY to your home screen
              </h3>
              <ol className="mt-5 list-none space-y-3 text-left text-sm text-ink/75">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="neu-xs neu-round flex h-7 w-7 shrink-0 items-center justify-center text-[11px] font-black text-neon-deep">{i + 1}</span>
                    <span className="pt-1">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs text-ink/50">{coarse ? "It opens full screen, with no browser bar." : "It opens in its own window, with no browser bar."}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
