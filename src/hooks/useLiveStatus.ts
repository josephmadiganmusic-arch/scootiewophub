import { useEffect, useState } from "react";
import { brand } from "@/data/site";

export type LiveStatus = { live: boolean; title: string | null; checked: boolean };

const POLL_MS = 30_000;

/**
 * Is Scootie live on Rollout Heaven right now? Polls the public live status
 * route every 30 seconds while the tab is visible. A failed fetch reads as
 * offline, so the banner never shows on a guess. `?live=1` on the URL forces
 * the live state for a visual check.
 */
export function useLiveStatus(): LiveStatus {
  const [state, setState] = useState<LiveStatus>({ live: false, title: null, checked: false });

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("live");
    if (forced === "1") {
      setState({ live: true, title: "STARR WARS Music Reviews", checked: true });
      return;
    }
    if (!brand.liveStatusUrl) return;

    let timer = 0;
    let cancelled = false;
    const check = async () => {
      try {
        const ctrl = new AbortController();
        const t = window.setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(brand.liveStatusUrl, { cache: "no-store", signal: ctrl.signal });
        window.clearTimeout(t);
        const data = (await res.json()) as { live?: boolean; title?: string | null };
        if (!cancelled) setState({ live: !!data.live, title: data.title ?? null, checked: true });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, live: false, checked: true }));
      }
    };
    const schedule = () => {
      window.clearTimeout(timer);
      if (document.hidden) return;
      timer = window.setTimeout(async () => {
        await check();
        schedule();
      }, POLL_MS);
    };
    const onVis = () => {
      if (!document.hidden) {
        void check().then(schedule);
      } else {
        window.clearTimeout(timer);
      }
    };
    void check().then(schedule);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return state;
}
