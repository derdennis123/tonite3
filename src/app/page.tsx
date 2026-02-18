import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import FilterBar from "@/components/FilterBar";
import { events } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Was machst du{" "}
              <span className="text-accent">heute Abend</span>?
            </h1>
            <p className="mb-8 text-lg text-muted">
              Entdecke Events in deiner Stadt — immer zum besten Preis.
            </p>
            <SearchBar large className="mx-auto max-w-xl" />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Entdecken</h2>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Alle Events <ArrowRight size={14} />
          </Link>
        </div>

        <FilterBar />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* CTA for organizers */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <h2 className="mb-3 text-2xl font-bold">Du veranstaltest Events?</h2>
            <p className="mb-6 text-muted">
              Erreiche tausende Eventbegeisterte und verkaufe deine Tickets über tonite.
            </p>
            <Link
              href="/veranstalter/register"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Kostenlos registrieren <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
