import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { type Event, formatDate, formatPrice } from "@/lib/mock-data";

export default function EventCard({ event }: { event: Event }) {
  const nextDate = event.dates[0];
  const cheapestTicket = event.tickets.reduce((min, t) =>
    t.reducedPrice < min.reducedPrice ? t : min
  );

  return (
    <Link href={`/events/${event.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border hover:bg-card-hover">
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Discount badge */}
          <div className="absolute top-3 right-3 rounded-full bg-danger/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            -{cheapestTicket.discount}%
          </div>
          {/* Category */}
          <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground group-hover:text-accent">
            {event.title}
          </h3>

          <div className="mb-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{event.venue.name}</span>
            </div>
            {nextDate && (
              <div className="flex items-center gap-1.5 text-sm text-muted">
                <Calendar size={14} className="shrink-0" />
                <span>{formatDate(nextDate.date)} · {nextDate.time} Uhr</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-foreground">
              ab {formatPrice(cheapestTicket.reducedPrice)}
            </span>
            <span className="text-xs text-muted line-through">
              {formatPrice(cheapestTicket.originalPrice)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
