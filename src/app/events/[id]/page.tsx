import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ChevronRight,
  Share2,
  Heart,
  CheckCircle,
} from "lucide-react";
import { events, getEvent, formatDate, formatPrice } from "@/lib/mock-data";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);

  if (!event) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Event nicht gefunden.</p>
      </div>
    );
  }

  const cheapestTicket = event.tickets.reduce((min, t) =>
    t.reducedPrice < min.reducedPrice ? t : min
  );

  return (
    <div>
      {/* Hero image */}
      <div className="relative h-[40vh] w-full md:h-[50vh]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60">
            <Share2 size={18} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60">
            <Heart size={18} />
          </button>
        </div>

        {/* Discount badge */}
        <div className="absolute top-4 left-4 rounded-full bg-danger/80 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm">
          -{cheapestTicket.discount}%
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Category & Title */}
            <span className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {event.category}
            </span>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{event.title}</h1>

            {/* Organizer */}
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                {event.organizer.company.charAt(0)}
              </div>
              <span className="text-sm text-muted">{event.organizer.company}</span>
              {event.organizer.verified && (
                <CheckCircle size={14} className="text-accent" />
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold">Über das Event</h2>
              <p className="leading-relaxed text-muted">{event.description}</p>
            </div>

            {/* Dates */}
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold">Termine</h2>
              <div className="flex flex-col gap-3">
                {event.dates.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <span className="text-xs font-medium">
                          {new Date(d.date).toLocaleDateString("de-DE", { weekday: "short" })}
                        </span>
                        <span className="text-lg font-bold leading-none">
                          {new Date(d.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{formatDate(d.date)}</div>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Clock size={12} />
                          {d.time} Uhr
                          {d.doorsOpen && (
                            <span className="text-muted">· Einlass {d.doorsOpen} Uhr</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/checkout/${event.id}?date=${d.id}`}
                      className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-foreground hover:bg-white/20"
                    >
                      Auswählen
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue */}
            <div className="mb-8">
              <h2 className="mb-3 text-lg font-semibold">Venue</h2>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-medium">{event.venue.name}</h3>
                    <p className="text-sm text-muted">{event.venue.address}</p>
                  </div>
                </div>
                <p className="text-sm text-muted">{event.venue.description}</p>
                {/* Map placeholder */}
                <div className="mt-4 flex h-40 items-center justify-center rounded-lg bg-background text-sm text-muted">
                  Kartenansicht
                </div>
              </div>
            </div>

            {/* Additional images */}
            {event.images.length > 1 && (
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold">Weitere Bilder</h2>
                <div className="grid grid-cols-2 gap-3">
                  {event.images.slice(1).map((img, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={img}
                        alt={`${event.title} Bild ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {event.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-3 text-lg font-semibold">Häufige Fragen</h2>
                <div className="flex flex-col gap-3">
                  {event.faqs.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-4">
                      <h3 className="mb-1 text-sm font-medium">{faq.question}</h3>
                      <p className="text-sm text-muted">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-border bg-card p-6">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">
                    {formatPrice(cheapestTicket.reducedPrice)}
                  </span>
                  <span className="text-sm text-muted line-through">
                    {formatPrice(cheapestTicket.originalPrice)}
                  </span>
                </div>
                <p className="text-xs text-muted">pro Ticket · inkl. MwSt.</p>
              </div>

              {/* Ticket categories */}
              <div className="mb-4 flex flex-col gap-2">
                {event.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <div className="text-sm font-medium">{ticket.name}</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-medium text-foreground">
                          {formatPrice(ticket.reducedPrice)}
                        </span>
                        <span className="text-[10px] text-muted line-through">
                          {formatPrice(ticket.originalPrice)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs ${
                        ticket.available === 0
                          ? "text-danger"
                          : ticket.available < 10
                          ? "text-yellow-500"
                          : "text-success"
                      }`}
                    >
                      {ticket.available === 0
                        ? "Ausverkauft"
                        : ticket.available < 10
                        ? `Noch ${ticket.available}`
                        : "Verfügbar"}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/checkout/${event.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black hover:bg-white/90"
              >
                Tickets sichern <ChevronRight size={16} />
              </Link>

              <p className="mt-3 text-center text-[10px] text-muted">
                Sichere Zahlung via Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
