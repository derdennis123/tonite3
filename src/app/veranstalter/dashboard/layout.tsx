"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarPlus,
  MapPin,
  Ticket,
  Receipt,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { href: "/veranstalter/dashboard", label: "Übersicht", icon: LayoutDashboard },
  { href: "/veranstalter/dashboard/events", label: "Events", icon: CalendarPlus },
  { href: "/veranstalter/dashboard/venue", label: "Venue-Profil", icon: MapPin },
  { href: "/veranstalter/dashboard/tickets", label: "Tickets", icon: Ticket },
  { href: "/veranstalter/dashboard/billing", label: "Abrechnungen", icon: Receipt },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:block">
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 rounded-xl bg-accent/10 p-3">
            <p className="text-xs font-medium text-accent">Veranstalter</p>
            <p className="text-sm font-semibold text-foreground">Köln Comedy Club</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {sidebarItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/veranstalter/dashboard" &&
                  pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-accent/10 font-medium text-accent"
                      : "text-muted hover:bg-card-hover hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-foreground"
            >
              <Settings size={18} />
              Einstellungen
            </Link>
            <Link
              href="/veranstalter"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-foreground"
            >
              <LogOut size={18} />
              Abmelden
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
        <div className="flex justify-around py-2">
          {sidebarItems.slice(0, 5).map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/veranstalter/dashboard" &&
                pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 pb-20 md:pb-6">{children}</div>
    </div>
  );
}
