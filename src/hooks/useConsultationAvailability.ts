import { useEffect, useState } from "react";

type Availability = {
  bookingEnabled: boolean;
  priceCents: number;
  minutes: number;
  hoursLine: string;
  tzLabel: string;
  days: { day: string; date: string; slots: { start: number; label: string }[] }[];
};
type State = { status: "loading" | "ready" | "closed" | "unavailable"; data: Availability | null };

export function useConsultationAvailability(checkoutBase: string): State {
  const [state, setState] = useState<State>({ status: "loading", data: null });
  useEffect(() => {
    const url = new URL(checkoutBase);
    url.pathname = url.pathname.replace(/\/services\/?$/, "/api/services/consultation/slots");
    url.search = ""; url.hash = "";
    let cancelled = false;
    let active: AbortController | null = null;
    const check = async () => {
      if (document.hidden || active) return;
      const controller = new AbortController(); active = controller;
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      try {
        const response = await fetch(url, { cache: "no-store", credentials: "omit", signal: controller.signal });
        if (response.status === 404) {
          if (!cancelled) setState({ status: "closed", data: null });
          return;
        }
        if (!response.ok) throw new Error("Availability unavailable");
        const data = await response.json() as Availability;
        if (!Number.isFinite(data.priceCents) || data.priceCents <= 0 || !Number.isFinite(data.minutes) || !Array.isArray(data.days)) throw new Error("Invalid availability");
        if (!cancelled) setState({ status: data.bookingEnabled ? "ready" : "closed", data: data.bookingEnabled ? data : null });
      } catch {
        if (!cancelled) setState({ status: "unavailable", data: null });
      } finally { window.clearTimeout(timeout); active = null; }
    };
    const refresh = () => { void check(); };
    refresh();
    const timer = window.setInterval(refresh, 30_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      cancelled = true; active?.abort(); window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [checkoutBase]);
  return state;
}
