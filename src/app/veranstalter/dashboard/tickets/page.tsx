"use client";

import { useState } from "react";
import {
  Search,
  QrCode,
  CheckCircle,
  XCircle,
  Download,
  Filter,
} from "lucide-react";

const ticketData = [
  { id: "TKT-001", event: "Comedy Night Köln", buyer: "Max Schmidt", email: "max@email.de", ticket: "Standard", date: "15. Mär 2026", status: "valid" as const, checkedIn: false },
  { id: "TKT-002", event: "Comedy Night Köln", buyer: "Lisa Weber", email: "lisa@email.de", ticket: "VIP", date: "15. Mär 2026", status: "valid" as const, checkedIn: true },
  { id: "TKT-003", event: "Comedy Night Köln", buyer: "Tom Müller", email: "tom@email.de", ticket: "Standard", date: "15. Mär 2026", status: "valid" as const, checkedIn: false },
  { id: "TKT-004", event: "Comedy Night Köln", buyer: "Anna Koch", email: "anna@email.de", ticket: "Standard", date: "22. Mär 2026", status: "valid" as const, checkedIn: false },
  { id: "TKT-005", event: "Stand-Up Special", buyer: "Stefan Becker", email: "stefan@email.de", ticket: "Eintritt", date: "18. Apr 2026", status: "cancelled" as const, checkedIn: false },
  { id: "TKT-006", event: "Comedy Night Köln", buyer: "Sarah Fischer", email: "sarah@email.de", ticket: "VIP", date: "15. Mär 2026", status: "valid" as const, checkedIn: true },
];

export default function TicketManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [filterEvent, setFilterEvent] = useState("Alle");

  const filteredTickets = ticketData.filter((t) => {
    const matchesSearch =
      !searchQuery ||
      t.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = filterEvent === "Alle" || t.event === filterEvent;
    return matchesSearch && matchesEvent;
  });

  const checkedInCount = ticketData.filter((t) => t.checkedIn).length;
  const validCount = ticketData.filter((t) => t.status === "valid").length;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ticket-Management</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground">
            <Download size={16} />
            Exportieren
          </button>
          <button
            onClick={() => setShowScanner(!showScanner)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              showScanner
                ? "bg-accent text-white"
                : "bg-accent/10 text-accent hover:bg-accent/20"
            }`}
          >
            <QrCode size={16} />
            QR-Scanner
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Verkaufte Tickets</p>
          <p className="text-2xl font-bold">{ticketData.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Check-ins</p>
          <p className="text-2xl font-bold">
            {checkedInCount}/{validCount}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted">Storniert</p>
          <p className="text-2xl font-bold">
            {ticketData.filter((t) => t.status === "cancelled").length}
          </p>
        </div>
      </div>

      {/* QR Scanner area */}
      {showScanner && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
          <QrCode size={48} className="mx-auto mb-3 text-accent" />
          <p className="text-sm font-medium">QR-Scanner aktiv</p>
          <p className="text-xs text-muted">
            Halte den QR-Code des Tickets vor die Kamera
          </p>
          <div className="mx-auto mt-4 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-accent/30 bg-background">
            <p className="text-xs text-muted">Kamera-Vorschau</p>
          </div>
        </div>
      )}

      {/* Search and filter */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ticket-ID, Name oder E-Mail suchen..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted" />
          <select
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            <option>Alle</option>
            <option>Comedy Night Köln</option>
            <option>Stand-Up Special</option>
          </select>
        </div>
      </div>

      {/* Ticket table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-4 py-3 font-medium">Ticket-ID</th>
                <th className="px-4 py-3 font-medium">Käufer</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Kategorie</th>
                <th className="px-4 py-3 font-medium">Datum</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Check-in</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 text-sm font-mono text-muted">
                    {ticket.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{ticket.buyer}</div>
                    <div className="text-xs text-muted">{ticket.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{ticket.event}</td>
                  <td className="px-4 py-3 text-sm text-muted">{ticket.ticket}</td>
                  <td className="px-4 py-3 text-sm text-muted">{ticket.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        ticket.status === "valid"
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      }`}
                    >
                      {ticket.status === "valid" ? (
                        <>
                          <CheckCircle size={10} /> Gültig
                        </>
                      ) : (
                        <>
                          <XCircle size={10} /> Storniert
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {ticket.status === "valid" && (
                      <button
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          ticket.checkedIn
                            ? "bg-success/10 text-success"
                            : "border border-border text-muted hover:border-success hover:text-success"
                        }`}
                      >
                        {ticket.checkedIn ? "Eingecheckt" : "Einchecken"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
