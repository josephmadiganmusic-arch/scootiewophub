import { ArrowUpRight, Check, Mail } from "lucide-react";
import { brand } from "@/data/site";
import { useConsultationAvailability } from "@/hooks/useConsultationAvailability";

const checkoutBase = import.meta.env.VITE_SERVICES_URL || "https://rolloutheaven.com/starrbaby/services";

const services = [
  { id: "feature", name: "Hooks & verses", price: "$500", unit: "one hook or one verse", bundlePrice: "$700", image: "scootie-microphone", position: "50% 39%", description: "Bring Scootie Wop onto your next record. Choose one part or get both together.", action: "Choose your feature", wide: true },
  { id: "collaboration", name: "Collaborations", price: "$1,000", unit: "per collaboration", image: "scootie-crowd", position: "50% 37%", description: "Make your next project a collaboration with Scootie.", action: "Start a collaboration", wide: true },
  { id: "consultation", name: "One-on-one consultations", price: "See current price", unit: "on the booking page", image: "scootie-portrait", position: "50% 34%", description: "A one-on-one session with Scootie in his Rollout Heaven studio. Choose an available time before payment.", action: "Choose a time" },
  { id: "production", name: "Custom production", price: "$750", unit: "per production", image: "scootie-seated", position: "50% 37%", description: "Production for your next record. MP3, WAV and stems included.", action: "Start your production" },
  { id: "booking", name: "Show bookings", price: "Let’s talk", unit: "pricing to be confirmed", image: "scootie-stage", position: "50% 34%", description: "Bring Scootie to your stage. Share your date, location and event details.", action: "Inquire about a show" },
] as const;

export function Services() {
  const consultation = useConsultationAvailability(checkoutBase);
  const available = consultation.data;
  const nextDay = available?.days.find(day => day.slots.length > 0);
  const consultationPrice = available ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(available.priceCents / 100) : consultation.status === "loading" ? "Checking availability" : "See current price";
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
                <div className="service-price"><strong>{service.id === "consultation" ? consultationPrice : service.price}</strong><span>{service.id === "consultation" && available ? `per ${available.minutes} minutes` : service.unit}</span></div>
                {service.id === "consultation" && available && <div className="service-description" aria-live="polite">
                  <p>{available.hoursLine}. All times are {available.tzLabel}.</p>
                  <p>{nextDay ? `Next available: ${nextDay.date} at ${nextDay.slots[0].label} ${available.tzLabel}.` : "No open times in the next two months. Check back soon."}</p>
                </div>}
                {"bundlePrice" in service && <div className="service-bundle"><strong>{service.bundlePrice}</strong><span>hook + verse together</span></div>}
                {service.id === "consultation" && consultation.status === "closed" ? <p className="service-description" role="status">Bookings are paused.</p> : <a
                  className={service.id === "booking" ? "btn3d service-action" : "btn3d-neon service-action"}
                  href={service.id === "booking"
                    ? `mailto:${brand.contactEmail}?subject=${encodeURIComponent("Scootie Wop show booking")}&body=${encodeURIComponent("Event name:\nDate:\nCity and venue:\nBudget:\nContact name and phone:\n\nEvent details:\n")}`
                    : `${checkoutBase}?service=${service.id}`}
                >
                  {service.action}
                  {service.id === "booking" ? <Mail size={17} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
                </a>}
              </div>
            </article>
          ))}
        </div>
        <div className="services-footnote">
          <span><Check size={16} aria-hidden="true" /> Service checkout through Rollout Heaven</span>
          <p>All prices in USD. For one-on-one consultations, choose an available time before payment. Connect through Scootie's Rollout Heaven guest link.</p>
        </div>
      </div>
    </section>
  );
}
