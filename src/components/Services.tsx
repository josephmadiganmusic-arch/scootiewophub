import { ArrowUpRight, Check, Mail } from "lucide-react";
import { brand } from "@/data/site";

const checkoutBase = import.meta.env.VITE_SERVICES_URL || "https://rolloutheaven.com/starrbaby/services";

const services = [
  { id: "feature", name: "Hooks & verses", price: "$500", unit: "one hook or one verse", bundlePrice: "$700", image: "scootie-microphone", position: "50% 39%", description: "Bring Scootie Wop onto your next record. Choose one part or get both together.", action: "Choose your feature", wide: true },
  { id: "collaboration", name: "Collaborations", price: "$1,000", unit: "per collaboration", image: "scootie-crowd", position: "50% 37%", description: "Make your next project a collaboration with Scootie.", action: "Start a collaboration", wide: true },
  { id: "consultation", name: "1 on 1 consultation", price: "$100", unit: "per hour", image: "scootie-portrait", position: "50% 34%", description: "One hour with Scootie in his Rollout Heaven studio.", action: "Book a consultation" },
  { id: "production", name: "Custom production", price: "$750", unit: "per production", image: "scootie-seated", position: "50% 37%", description: "Production for your next record. MP3, WAV and stems included.", action: "Start your production" },
  { id: "booking", name: "Show bookings", price: "Let’s talk", unit: "pricing to be confirmed", image: "scootie-stage", position: "50% 34%", description: "Bring Scootie to your stage. Share your date, location and event details.", action: "Inquire about a show" },
] as const;

export function Services() {
  return (
    <section id="services" className="services-section relative" aria-labelledby="services-title">
      <div className="container-x">
        <div className="services-heading">
          <div>
            <h2 id="services-title" className="font-display services-title">Work with<br /><span className="text-neon">Scootie Wop.</span></h2>
            <p className="services-lead">Your next record. Your next move. Let’s create it.</p>
          </div>
          <div className="services-signature" aria-hidden="true">
            <img src="/brand/star-3d.webp" alt="" width={72} height={72} />
            <span>Created<br />to create.</span>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className={`service-card neu-sm ${"wide" in service ? "service-card-wide" : ""}`} key={service.id}>
              <div className="service-photo">
                <img
                  src={`/gallery/${service.image}-thumb.webp`}
                  srcSet={`/gallery/${service.image}-thumb.webp 640w, /gallery/${service.image}.webp ${service.image === "scootie-stage" || service.image === "scootie-crowd" ? 1170 : 1600}w`}
                  sizes="(min-width: 1024px) 550px, (min-width: 640px) 50vw, 100vw"
                  alt={service.id === "booking" || service.id === "collaboration" ? "Scootie Wop performing live" : "Scootie Wop at the studio"}
                  width={640} height={800} loading="lazy" decoding="async"
                  style={{ objectPosition: service.position }}
                />
                <span className="service-photo-label">STARRBABY WRLDWIDE</span>
              </div>
              <div className="service-body">
                <h3 className="font-display">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price"><strong>{service.price}</strong><span>{service.unit}</span></div>
                {"bundlePrice" in service && <div className="service-bundle"><strong>{service.bundlePrice}</strong><span>hook + verse together</span></div>}
                <a
                  className={service.id === "booking" ? "btn3d service-action" : "btn3d-neon service-action"}
                  href={service.id === "booking"
                    ? `mailto:${brand.contactEmail}?subject=${encodeURIComponent("Scootie Wop show booking")}&body=${encodeURIComponent("Event name:\nDate:\nCity and venue:\nBudget:\nContact name and phone:\n\nEvent details:\n")}`
                    : `${checkoutBase}?service=${service.id}`}
                >
                  {service.action}
                  {service.id === "booking" ? <Mail size={17} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="services-footnote">
          <span><Check size={16} aria-hidden="true" /> Service checkout through Rollout Heaven</span>
          <p>All prices in USD. Pay upfront, then connect through Scootie's Rollout Heaven guest link.</p>
        </div>
      </div>
    </section>
  );
}
