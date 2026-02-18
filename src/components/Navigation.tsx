"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const isOrganizer = pathname.startsWith("/veranstalter");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="text-accent">t</span>onite
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm ${pathname === "/" ? "text-foreground" : "text-muted hover:text-foreground"}`}
          >
            Entdecken
          </Link>
          <Link
            href="/search"
            className={`text-sm ${pathname === "/search" ? "text-foreground" : "text-muted hover:text-foreground"}`}
          >
            Suche
          </Link>
          <Link
            href="/veranstalter"
            className={`text-sm ${isOrganizer ? "text-foreground" : "text-muted hover:text-foreground"}`}
          >
            Für Veranstalter
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
          >
            <Search size={16} />
          </Link>
          {!isOrganizer && (
            <Link
              href="/veranstalter"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted hover:text-foreground md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted hover:text-foreground"
            >
              Entdecken
            </Link>
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted hover:text-foreground"
            >
              Suche
            </Link>
            <Link
              href="/veranstalter"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted hover:text-foreground"
            >
              Für Veranstalter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
