"use client";

import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  large?: boolean;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  large = false,
  placeholder = "Was willst du heute erleben?",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div
        className={`flex items-center gap-3 rounded-2xl border border-border bg-card px-4 transition-all focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/20 ${
          large ? "py-4" : "py-3"
        }`}
      >
        <Sparkles size={large ? 20 : 16} className="shrink-0 text-accent" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-foreground placeholder:text-muted focus:outline-none ${
            large ? "text-lg" : "text-sm"
          }`}
        />
        <button
          type="submit"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover"
        >
          <Search size={16} />
        </button>
      </div>
      {large && (
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Comedy unter 20€",
            "Heute Abend in Köln",
            "Partys am Wochenende",
            "Live-Musik",
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setQuery(suggestion);
                router.push(`/search?q=${encodeURIComponent(suggestion)}`);
              }}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:border-accent/50 hover:text-accent"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
