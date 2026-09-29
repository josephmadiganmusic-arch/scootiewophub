import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  aside?: ReactNode;
};

export function SectionHeader({ eyebrow, title, lead, align = "left", className, aside }: Props) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-3xl min-w-0", align === "center" && "mx-auto")}>
        <p className="eyebrow mb-3 flex items-center gap-3">
          <span className="inline-block h-[2px] w-6 bg-neon" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="text-display-h2">{title}</h2>
        {lead ? <p className="lead mt-4 max-w-2xl">{lead}</p> : null}
      </Reveal>
      {aside ? <Reveal index={2} className="shrink-0">{aside}</Reveal> : null}
    </div>
  );
}
