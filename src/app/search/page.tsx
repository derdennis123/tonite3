"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import FilterBar, { type Filters } from "@/components/FilterBar";
import { events } from "@/lib/mock-data";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [filters, setFilters] = useState<Filters>({
    city: "Alle Städte",
    category: "Alle",
    dateRange: "",
    priceRange: "",
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Text search
      if (query) {
        const q = query.toLowerCase();
        const matchesText =
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.category.toLowerCase().includes(q) ||
          event.venue.name.toLowerCase().includes(q) ||
          event.venue.city.toLowerCase().includes(q);
        if (!matchesText) return false;
      }

      // City filter
      if (filters.city !== "Alle Städte" && event.venue.city !== filters.city) {
        return false;
      }

      // Category filter
      if (filters.category !== "Alle" && event.category !== filters.category) {
        return false;
      }

      // Price filter
      if (filters.priceRange) {
        const cheapest = Math.min(...event.tickets.map((t) => t.reducedPrice));
        if (filters.priceRange === "Unter 15€" && cheapest >= 15) return false;
        if (filters.priceRange === "15–30€" && (cheapest < 15 || cheapest > 30)) return false;
        if (filters.priceRange === "30–50€" && (cheapest < 30 || cheapest > 50)) return false;
        if (filters.priceRange === "Über 50€" && cheapest <= 50) return false;
      }

      return true;
    });
  }, [query, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">
          {query ? `Ergebnisse für "${query}"` : "Alle Events"}
        </h1>
        <SearchBar
          placeholder={'z.B. \u201EComedy unter 20\u20AC\u201C oder \u201EWas geht heute in K\u00F6ln?\u201C'}
          className="max-w-xl"
        />
      </div>

      <FilterBar onFilter={setFilters} />

      {filteredEvents.length === 0 ? (
        <div className="flex min-h-[30vh] flex-col items-center justify-center text-center">
          <p className="mb-2 text-lg font-medium">Keine Events gefunden</p>
          <p className="text-sm text-muted">
            Versuche andere Suchbegriffe oder passe deine Filter an.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">
            {filteredEvents.length} Event{filteredEvents.length !== 1 && "s"} gefunden
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted">Laden...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
