import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { brand } from "@/data/site";

type Props = { live: boolean; title?: string | null };

/**
 * The live strip. Sits above the nav while Scootie is live on Rollout Heaven
 * and the whole strip is one link into the show. It publishes its height as
 * --live-h on the root so the nav and section anchors move down with it.
 */
export function LiveBanner({ live, title }: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty("--live-h", live ? "2.75rem" : "0px");
    return () => document.documentElement.style.setProperty("--live-h", "0px");
  }, [live]);

  if (!live) return null;

  return (
    <a
      href={brand.liveUrl}
      target="_blank"
      rel="noopener"
      className="live-strip group fixed inset-x-0 top-0 z-[60] flex h-11 items-center justify-center gap-2.5 px-3 text-[0.7rem] font-black uppercase tracking-[0.18em] text-ink sm:text-xs"
      aria-label="Scootie Wop is live on Rollout Heaven. Watch now."
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b3b] opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff3b3b]" />
      </span>
      <span className="truncate">
        Scootie Wop is live
        <span className="hidden sm:inline"> on Rollout Heaven</span>
        {title ? <span className="hidden text-ink/60 md:inline"> · {title}</span> : null}
      </span>
      <span className="ml-1 inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-ink px-3 text-[0.7rem] text-neon transition-transform duration-150 group-hover:translate-x-0.5">
        Watch
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </a>
  );
}
