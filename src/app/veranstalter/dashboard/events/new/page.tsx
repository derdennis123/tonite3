"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Calendar,
  Clock,
  X,
} from "lucide-react";
import { categories } from "@/lib/mock-data";

interface TicketCat {
  id: string;
  name: string;
  originalPrice: string;
  discount: string;
  contingent: string;
}

interface EventDateEntry {
  id: string;
  date: string;
  time: string;
  doorsOpen: string;
}

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tickets, setTickets] = useState<TicketCat[]>([
    { id: "1", name: "", originalPrice: "", discount: "30", contingent: "" },
  ]);
  const [dates, setDates] = useState<EventDateEntry[]>([
    { id: "1", date: "", time: "", doorsOpen: "" },
  ]);
  const [scheduleType, setScheduleType] = useState<"single" | "series" | "range">("single");
  const [visibleFrom, setVisibleFrom] = useState("");
  const [bookableUntil, setBookableUntil] = useState("");

  const addTicket = () => {
    setTickets((prev) => [
      ...prev,
      { id: String(Date.now()), name: "", originalPrice: "", discount: "30", contingent: "" },
    ]);
  };

  const removeTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTicket = (id: string, key: keyof TicketCat, value: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [key]: value } : t))
    );
  };

  const addDate = () => {
    setDates((prev) => [
      ...prev,
      { id: String(Date.now()), date: "", time: "", doorsOpen: "" },
    ]);
  };

  const removeDate = (id: string) => {
    setDates((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDate = (id: string, key: keyof EventDateEntry, value: string) => {
    setDates((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [key]: value } : d))
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/veranstalter/dashboard/events"
        className="mb-6 flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={16} /> Zurück zu Events
      </Link>

      <h1 className="mb-8 text-2xl font-bold">Neues Event erstellen</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/veranstalter/dashboard/events";
        }}
        className="flex flex-col gap-8"
      >
        {/* Basic info */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Grundinformationen</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Titel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Comedy Night Köln"
                required
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Beschreibung
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschreibe dein Event..."
                rows={4}
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Kategorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
              >
                <option value="">Kategorie wählen</option>
                {categories.filter((c) => c !== "Alle").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Images/Videos */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Bilder & Videos</h2>
          <div className="rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
            <Upload size={32} className="mx-auto mb-3 text-muted" />
            <p className="mb-1 text-sm font-medium">
              Dateien hierher ziehen oder klicken zum Hochladen
            </p>
            <p className="text-xs text-muted">
              JPG, PNG, MP4 — max. 10 MB pro Datei, bis zu 10 Dateien
            </p>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="mt-4 inline-block cursor-pointer rounded-full border border-border px-4 py-2 text-sm text-muted hover:border-accent hover:text-accent"
            >
              Dateien auswählen
            </label>
          </div>
        </section>

        {/* Schedule */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Termine</h2>

          {/* Schedule type */}
          <div className="mb-4 flex gap-2">
            {[
              { id: "single" as const, label: "Einzeltermine" },
              { id: "series" as const, label: "Serie (wöchentlich/monatlich)" },
              { id: "range" as const, label: "Zeitraum" },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setScheduleType(type.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  scheduleType === type.id
                    ? "bg-accent text-white"
                    : "border border-border text-muted hover:text-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {scheduleType === "single" && (
            <div className="flex flex-col gap-3">
              {dates.map((date) => (
                <div
                  key={date.id}
                  className="flex items-end gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex-1">
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      <Calendar size={12} className="mr-1 inline" />
                      Datum
                    </label>
                    <input
                      type="date"
                      value={date.date}
                      onChange={(e) => updateDate(date.id, "date", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="w-28">
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      <Clock size={12} className="mr-1 inline" />
                      Uhrzeit
                    </label>
                    <input
                      type="time"
                      value={date.time}
                      onChange={(e) => updateDate(date.id, "time", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="w-28">
                    <label className="mb-1.5 block text-xs font-medium text-muted">Einlass</label>
                    <input
                      type="time"
                      value={date.doorsOpen}
                      onChange={(e) => updateDate(date.id, "doorsOpen", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                  {dates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDate(date.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:text-danger"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDate}
                className="flex items-center gap-1 text-sm text-accent hover:underline"
              >
                <Plus size={14} /> Termin hinzufügen
              </button>
            </div>
          )}

          {scheduleType === "series" && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Startdatum</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Enddatum</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Wiederholung</label>
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none">
                    <option>Wöchentlich</option>
                    <option>Alle 2 Wochen</option>
                    <option>Monatlich</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Uhrzeit</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {scheduleType === "range" && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Von</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Bis</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Uhrzeit</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Einlass</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Tickets */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Ticketkategorien</h2>
          <div className="flex flex-col gap-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-medium text-muted">Name</label>
                    <input
                      type="text"
                      value={ticket.name}
                      onChange={(e) => updateTicket(ticket.id, "name", e.target.value)}
                      placeholder="z.B. Standard"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Originalpreis (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={ticket.originalPrice}
                      onChange={(e) => updateTicket(ticket.id, "originalPrice", e.target.value)}
                      placeholder="25,00"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Rabatt (min. 25%)
                    </label>
                    <input
                      type="number"
                      min="25"
                      max="90"
                      value={ticket.discount}
                      onChange={(e) => updateTicket(ticket.id, "discount", e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Kontingent
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={ticket.contingent}
                        onChange={(e) => updateTicket(ticket.id, "contingent", e.target.value)}
                        placeholder="100"
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                      />
                      {tickets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTicket(ticket.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:text-danger"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {ticket.originalPrice && ticket.discount && (
                  <div className="mt-2 text-xs text-muted">
                    Reduzierter Preis:{" "}
                    <span className="font-medium text-foreground">
                      {(
                        parseFloat(ticket.originalPrice) *
                        (1 - parseInt(ticket.discount) / 100)
                      ).toFixed(2)}{" "}
                      €
                    </span>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTicket}
              className="flex items-center gap-1 text-sm text-accent hover:underline"
            >
              <Plus size={14} /> Ticketkategorie hinzufügen
            </button>
          </div>
        </section>

        {/* Availability */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Verfügbarkeit</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Sichtbar ab
              </label>
              <input
                type="datetime-local"
                value={visibleFrom}
                onChange={(e) => setVisibleFrom(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Buchbar bis
              </label>
              <input
                type="datetime-local"
                value={bookableUntil}
                onChange={(e) => setBookableUntil(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3 border-t border-border pt-6">
          <button
            type="button"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted hover:text-foreground"
          >
            Als Entwurf speichern
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full bg-accent py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Event veröffentlichen
          </button>
        </div>
      </form>
    </div>
  );
}
