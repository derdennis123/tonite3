import {
  TrendingUp,
  Ticket,
  Eye,
  CalendarDays,
  ArrowUpRight,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Verkaufte Tickets",
    value: "1.247",
    change: "+12%",
    icon: Ticket,
  },
  {
    label: "Einnahmen",
    value: "28.430 €",
    change: "+8%",
    icon: TrendingUp,
  },
  {
    label: "Seitenaufrufe",
    value: "15.892",
    change: "+23%",
    icon: Eye,
  },
  {
    label: "Aktive Events",
    value: "3",
    change: "",
    icon: CalendarDays,
  },
];

const recentSales = [
  { ticket: "Comedy Night Köln — Standard", buyer: "M. Schmidt", date: "Heute, 14:32", amount: "17,50 €" },
  { ticket: "Comedy Night Köln — VIP", buyer: "L. Weber", date: "Heute, 13:15", amount: "31,50 €" },
  { ticket: "Stand-Up Special — Eintritt", buyer: "T. Müller", date: "Heute, 11:48", amount: "19,60 €" },
  { ticket: "Comedy Night Köln — Standard", buyer: "A. Koch", date: "Gestern, 22:03", amount: "17,50 €" },
  { ticket: "Comedy Night Köln — Standard", buyer: "S. Becker", date: "Gestern, 19:21", amount: "17,50 €" },
];

export default function DashboardOverview() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted">Willkommen zurück, Max!</p>
        </div>
        <Link
          href="/veranstalter/dashboard/events/new"
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Event erstellen
        </Link>
      </div>

      {/* Stripe Connect notice */}
      <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-4">
        <div className="flex items-start gap-3">
          <CreditCard size={20} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <h3 className="text-sm font-medium text-foreground">
              Stripe Connect einrichten
            </h3>
            <p className="mt-1 text-xs text-muted">
              Verifiziere deine Identität und Bankdaten, um automatische Auszahlungen zu aktivieren.
            </p>
            <button className="mt-2 text-xs font-medium text-accent hover:underline">
              Jetzt einrichten
            </button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs text-muted">{stat.label}</span>
                <Icon size={16} className="text-muted" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.change && (
                  <span className="flex items-center text-xs text-success">
                    <ArrowUpRight size={12} />
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming events */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Anstehende Events</h2>
        <div className="flex flex-col gap-3">
          {[
            { title: "Comedy Night Köln", date: "15. Mär 2026", tickets: "55/100", status: "live" },
            { title: "Stand-Up Special: Nachts im Museum", date: "18. Apr 2026", tickets: "55/120", status: "live" },
            { title: "Comedy Night Köln", date: "22. Mär 2026", tickets: "12/100", status: "geplant" },
          ].map((event, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div>
                <h3 className="text-sm font-medium">{event.title}</h3>
                <p className="text-xs text-muted">{event.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{event.tickets}</p>
                  <p className="text-[10px] text-muted">Tickets</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    event.status === "live"
                      ? "bg-success/10 text-success"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {event.status === "live" ? "Live" : "Geplant"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent sales */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Letzte Verkäufe</h2>
        <div className="rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">Ticket</th>
                  <th className="px-4 py-3 font-medium">Käufer</th>
                  <th className="px-4 py-3 font-medium">Datum</th>
                  <th className="px-4 py-3 text-right font-medium">Betrag</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-sm">{sale.ticket}</td>
                    <td className="px-4 py-3 text-sm text-muted">{sale.buyer}</td>
                    <td className="px-4 py-3 text-sm text-muted">{sale.date}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium">{sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
