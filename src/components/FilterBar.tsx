"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, cities } from "@/lib/mock-data";

interface FilterBarProps {
  onFilter?: (filters: Filters) => void;
}

export interface Filters {
  city: string;
  category: string;
  dateRange: string;
  priceRange: string;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({
    city: "Alle Städte",
    category: "Alle",
    dateRange: "",
    priceRange: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = ["Alle Preise", "Unter 15€", "15–30€", "30–50€", "Über 50€"];
  const dateRanges = ["Alle Termine", "Heute", "Diese Woche", "Dieses Wochenende", "Nächste Woche"];

  const updateFilter = (key: keyof Filters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter?.(updated);
  };

  const hasActiveFilters =
    filters.city !== "Alle Städte" ||
    filters.category !== "Alle" ||
    filters.dateRange !== "" ||
    filters.priceRange !== "";

  const clearFilters = () => {
    const cleared = { city: "Alle Städte", category: "Alle", dateRange: "", priceRange: "" };
    setFilters(cleared);
    onFilter?.(cleared);
  };

  return (
    <div>
      {/* Category pills (always visible) */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateFilter("category", cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filters.category === cat
                ? "bg-accent text-white"
                : "border border-border text-muted hover:border-accent/50 hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? "bg-accent/10 text-accent"
              : "border border-border text-muted hover:text-foreground"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filter
          {hasActiveFilters && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
              !
            </span>
          )}
        </button>
      </div>

      {/* Extended filters */}
      {showFilters && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-medium text-muted">Stadt</label>
              <select
                value={filters.city}
                onChange={(e) => updateFilter("city", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted">Zeitraum</label>
              <select
                value={filters.dateRange}
                onChange={(e) => updateFilter("dateRange", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range === "Alle Termine" ? "" : range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-muted">Preisspanne</label>
              <select
                value={filters.priceRange}
                onChange={(e) => updateFilter("priceRange", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range === "Alle Preise" ? "" : range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <X size={12} />
              Filter zurücksetzen
            </button>
          )}
        </div>
      )}
    </div>
  );
}
