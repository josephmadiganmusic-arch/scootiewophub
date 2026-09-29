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
