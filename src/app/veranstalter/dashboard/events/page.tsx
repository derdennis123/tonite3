import Link from "next/link";
import { Plus, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

const orgEvents = [
  {
    id: "1",
    title: "Comedy Night Köln",
    category: "Comedy",
    dates: ["15. Mär 2026", "22. Mär 2026"],
    ticketsSold: 55,
    ticketsTotal: 100,
    revenue: "962,50 €",
    status: "live" as const,
  },
  {
    id: "5",
    title: "Stand-Up Special: Nachts im Museum",
    category: "Comedy",
    dates: ["18. Apr 2026"],
    ticketsSold: 55,
    ticketsTotal: 120,
    revenue: "1.078,00 €",
    status: "live" as const,
  },
  {
    id: "draft-1",
    title: "Comedy Open Mic Night",
    category: "Comedy",
    dates: ["10. Mai 2026"],
    ticketsSold: 0,
    ticketsTotal: 80,
    revenue: "0,00 €",
    status: "draft" as const,
  },
];

export default function EventsListPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meine Events</h1>
        <Link
          href="/veranstalter/dashboard/events/new"
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          <Plus size={16} />
          Neues Event
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {orgEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      event.status === "live"
                        ? "bg-success/10 text-success"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    {event.status === "live" ? "Live" : "Entwurf"}
                  </span>
                </div>
                <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded-full bg-background px-2 py-1">
                    {event.category}
                  </span>
                  {event.dates.map((d) => (
                    <span key={d} className="rounded-full bg-background px-2 py-1">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted">Tickets: </span>
                    <span className="font-medium">
                      {event.ticketsSold}/{event.ticketsTotal}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted">Umsatz: </span>
                    <span className="font-medium">{event.revenue}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground">
                  <Eye size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground">
                  <Edit size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:text-danger">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
