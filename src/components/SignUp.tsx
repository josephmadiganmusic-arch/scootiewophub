import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Mail, Megaphone } from "lucide-react";
import { brand, socials } from "@/data/site";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "done" | "error" | "handoff";

const discord = socials.find((s) => s.key === "discord");

export function SignUp() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      return;
    }
    if (brand.signupEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(brand.signupEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: value, source: "starrbaby-site" }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("done");
        setEmail("");
      } catch {
        setStatus("error");
      }
      return;
    }
    if (brand.contactEmail) {
      window.location.href = `mailto:${brand.contactEmail}?subject=${encodeURIComponent("Add me to the STARRBABY list")}&body=${encodeURIComponent(value)}`;
      setStatus("done");
      return;
    }
    // No list endpoint wired yet: finish on the existing STARRBABY FAMILY page.
    window.open(brand.familyUrl, "_blank", "noopener");
    setStatus("handoff");
  };

  return (
    <section id="signup" className="section-pad relative" aria-labelledby="signup-title">
      <div className="container-x">
        <Reveal>
          <div className="neu neu-neon relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            {/* Big faded star behind */}
            <img
              src="/brand/star-smiley.webp"
              alt=""
              width={800}
              height={769}
              loading="lazy"
              className="pointer-events-none absolute -right-16 -top-16 w-72 rotate-12 opacity-[0.07] sm:w-96"
            />
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-6">
                <p className="eyebrow flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neon text-ink">
                    <Megaphone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  The Megaphone
                </p>
                <h2 id="signup-title" className="text-display-h2 mt-5">
                  Join the <span className="text-neon">family</span> list
                </h2>
                <p className="lead mt-4 max-w-lg">
                  Shows, new music and merch drops. You hear first. No spam.
                </p>
              </div>

              <div className="min-w-0 lg:col-span-6">
                <form onSubmit={submit} noValidate className="neu-sm p-4 sm:p-5">
                  <label htmlFor="signup-email" className="eyebrow !text-white/60">
                    Email
                  </label>
                  <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                      <input
                        id="signup-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="you@email.com"
                        aria-invalid={status === "error"}
                        aria-describedby="signup-status"
                        className="neu-in h-12 w-full pl-11 pr-4 text-sm"
                      />
                    </div>
                    <button type="submit" className="btn3d-neon shrink-0" disabled={status === "sending"}>
                      {status === "sending" ? "Sending" : "Sign me up"}
                    </button>
                  </div>
                  <p id="signup-status" className="mt-3 min-h-5 text-xs" aria-live="polite">
                    {status === "error" ? (
                      <span className="text-[#ff7b7b]">Check the email address and try again.</span>
                    ) : status === "done" ? (
                      <span className="flex items-center gap-1.5 text-neon">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" /> You are on the list.
                      </span>
                    ) : status === "handoff" ? (
                      <span className="text-white/70">Finish signing up on the STARRBABY FAMILY page that just opened.</span>
                    ) : (
                      <span className="text-white/40">One email when something drops. Unsubscribe any time.</span>
                    )}
                  </p>
                </form>

                <div className="mt-3 flex flex-wrap gap-2.5">
                  <a href={brand.familyUrl} target="_blank" rel="noopener" className="btn3d !min-h-10 !px-4 !py-2 !text-[0.64rem]">
                    STARRBABY FAMILY <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  {discord ? (
                    <a href={discord.url} target="_blank" rel="noopener" className="btn3d !min-h-10 !px-4 !py-2 !text-[0.64rem]">
                      SBF Discord <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
