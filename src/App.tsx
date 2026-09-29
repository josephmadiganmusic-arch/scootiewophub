import { About } from "@/components/About";
import { Artists } from "@/components/Artists";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { LiveBanner } from "@/components/LiveBanner";
import { MobileBar } from "@/components/MobileBar";
import { Music } from "@/components/Music";
import { Nav } from "@/components/Nav";
import { News } from "@/components/News";
import { Products } from "@/components/Products";
import { SignUp } from "@/components/SignUp";
import { useLiveStatus } from "@/hooks/useLiveStatus";

export default function App() {
  const status = useLiveStatus();
  return (
    <>
      {/* The fur filter every pill and chip runs its fill through: a fine
          noise field nudges the edge a few pixels so it reads as felt, not
          plastic. Defined once here, referenced from the stylesheet. */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="sb-fur" x="-8%" y="-14%" width="116%" height="128%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.16" numOctaves="3" seed="9" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="fur" />
            <feGaussianBlur in="fur" stdDeviation="0.3" />
          </filter>
        </defs>
      </svg>
      <LiveBanner live={status.live} title={status.title} />
      <Nav />
      <main id="main" className="relative pb-24 lg:pb-0">
        <Hero />
        <About />
        <Products />
        <News live={status.live} />
        <Artists />
        <Music />
        <SignUp />
        <Gallery />
      </main>
      <Footer />
      <MobileBar live={status.live} />
    </>
  );
}
