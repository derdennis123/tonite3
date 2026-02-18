"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Minus,
  Plus,
  CreditCard,
  Lock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { getEvent, formatPrice, formatDate } from "@/lib/mock-data";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const event = getEvent(id);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [step, setStep] = useState<"tickets" | "payment" | "confirmation">("tickets");
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!event) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Event nicht gefunden.</p>
      </div>
    );
  }

  const updateQuantity = (ticketId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const newVal = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [ticketId]: newVal };
    });
  };

  const totalTickets = Object.values(quantities).reduce((s, q) => s + q, 0);
  const subtotal = event.tickets.reduce(
    (sum, t) => sum + (quantities[t.id] || 0) * t.reducedPrice,
    0
  );
  const serviceFee = totalTickets > 0 ? 1.99 + subtotal * 0.05 : 0;
  const total = subtotal + serviceFee;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Back link */}
      <Link
        href={`/events/${event.id}`}
        className="mb-6 flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={16} /> Zurück zum Event
      </Link>

      {/* Progress steps */}
      <div className="mb-8 flex items-center gap-4">
        {["Tickets", "Bezahlung", "Bestätigung"].map((label, i) => {
          const stepIndex = ["tickets", "payment", "confirmation"].indexOf(step);
          const isActive = i === stepIndex;
          const isDone = i < stepIndex;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                  isDone
                    ? "bg-success text-white"
                    : isActive
                    ? "bg-accent text-white"
                    : "bg-card text-muted"
                }`}
              >
                {isDone ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-sm ${isActive ? "text-foreground" : "text-muted"}`}>
                {label}
              </span>
              {i < 2 && <div className="mx-2 h-px w-8 bg-border" />}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Main content */}
        <div className="lg:col-span-3">
          {step === "tickets" && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Tickets auswählen</h1>

              {/* Event summary */}
              <div className="mb-6 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{event.title}</h2>
                  <p className="text-sm text-muted">
                    {event.venue.name} · {formatDate(event.dates[0].date)}
                  </p>
                </div>
              </div>

              {/* Ticket selection */}
              <div className="flex flex-col gap-3">
                {event.tickets.map((ticket) => {
                  const qty = quantities[ticket.id] || 0;
                  const soldOut = ticket.available === 0;
                  return (
                    <div
                      key={ticket.id}
                      className={`rounded-xl border p-4 ${
                        soldOut
                          ? "border-border bg-card/50 opacity-50"
                          : qty > 0
                          ? "border-accent/50 bg-accent/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{ticket.name}</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium">
                              {formatPrice(ticket.reducedPrice)}
                            </span>
                            <span className="text-xs text-muted line-through">
                              {formatPrice(ticket.originalPrice)}
                            </span>
                            <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-medium text-danger">
                              -{ticket.discount}%
                            </span>
                          </div>
                          {!soldOut && ticket.available < 20 && (
                            <span className="text-xs text-yellow-500">
                              Noch {ticket.available} verfügbar
                            </span>
                          )}
                        </div>
                        {soldOut ? (
                          <span className="text-sm text-danger">Ausverkauft</span>
                        ) : (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(ticket.id, -1)}
                              disabled={qty === 0}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted hover:text-foreground disabled:opacity-30"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-5 text-center text-sm font-medium">{qty}</span>
                            <button
                              onClick={() => updateQuantity(ticket.id, 1)}
                              disabled={qty >= ticket.available}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted hover:text-foreground disabled:opacity-30"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep("payment")}
                disabled={totalTickets === 0}
                className="mt-6 w-full rounded-full bg-white py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-30"
              >
                Weiter zur Bezahlung
              </button>
            </div>
          )}

          {step === "payment" && (
            <div>
              <h1 className="mb-6 text-2xl font-bold">Bezahlung</h1>

              {/* Payment method selection */}
              <div className="mb-6">
                <h2 className="mb-3 text-sm font-medium text-muted">Zahlungsmethode</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { id: "card", label: "Kreditkarte" },
                    { id: "sepa", label: "SEPA" },
                    { id: "apple", label: "Apple Pay" },
                    { id: "google", label: "Google Pay" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`rounded-xl border p-3 text-center text-sm ${
                        paymentMethod === method.id
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted hover:border-accent/30"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card form */}
              {paymentMethod === "card" && (
                <div className="mb-6 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Kartennummer
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
                      <CreditCard size={16} className="text-muted" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">
                        Gültig bis
                      </label>
                      <input
                        type="text"
                        placeholder="MM/JJ"
                        className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Name auf der Karte
                    </label>
                    <input
                      type="text"
                      placeholder="Max Mustermann"
                      className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "sepa" && (
                <div className="mb-6 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">IBAN</label>
                    <input
                      type="text"
                      placeholder="DE89 3704 0044 0532 0130 00"
                      className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Kontoinhaber
                    </label>
                    <input
                      type="text"
                      placeholder="Max Mustermann"
                      className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {(paymentMethod === "apple" || paymentMethod === "google") && (
                <div className="mb-6 rounded-xl border border-border bg-card p-8 text-center">
                  <p className="text-sm text-muted">
                    {paymentMethod === "apple" ? "Apple Pay" : "Google Pay"} wird beim Kauf
                    automatisch geöffnet.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("tickets")}
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium text-muted hover:text-foreground"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep("confirmation")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black hover:bg-white/90"
                >
                  <Lock size={14} />
                  Jetzt bezahlen · {formatPrice(total)}
                </button>
              </div>
            </div>
          )}

          {step === "confirmation" && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                  <CheckCircle size={32} className="text-success" />
                </div>
              </div>
              <h1 className="mb-2 text-2xl font-bold">Buchung bestätigt!</h1>
              <p className="mb-6 text-muted">
                Dein Ticket wurde per E-Mail verschickt. Zeige den QR-Code am Einlass.
              </p>

              {/* QR Code placeholder */}
              <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-2xl border border-border bg-white">
                <div className="grid grid-cols-5 gap-1">
                  {[1,1,1,1,1, 1,0,1,0,1, 1,1,0,1,0, 0,1,1,0,1, 1,0,1,1,1].map((v, i) => (
                    <div
                      key={i}
                      className={`h-6 w-6 ${v ? "bg-black" : "bg-white"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8 rounded-xl border border-border bg-card p-4 text-left">
                <h3 className="mb-2 text-sm font-semibold">Buchungsdetails</h3>
                <div className="flex flex-col gap-1 text-sm text-muted">
                  <p>{event.title}</p>
                  <p>{event.venue.name}</p>
                  <p>{formatDate(event.dates[0].date)} · {event.dates[0].time} Uhr</p>
                  <p className="font-medium text-foreground">
                    {totalTickets} Ticket{totalTickets !== 1 && "s"} · {formatPrice(total)}
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
              >
                Weitere Events entdecken
              </Link>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold">Zusammenfassung</h2>

            {/* Event info */}
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium">{event.title}</h3>
                <p className="text-xs text-muted">{event.venue.name}</p>
              </div>
            </div>

            {/* Ticket breakdown */}
            <div className="mb-4 flex flex-col gap-2 border-b border-border pb-4">
              {event.tickets.map((ticket) => {
                const qty = quantities[ticket.id] || 0;
                if (qty === 0) return null;
                return (
                  <div key={ticket.id} className="flex justify-between text-sm">
                    <span className="text-muted">
                      {qty}x {ticket.name}
                    </span>
                    <span>{formatPrice(qty * ticket.reducedPrice)}</span>
                  </div>
                );
              })}
              {totalTickets === 0 && (
                <p className="text-xs text-muted">Noch keine Tickets ausgewählt</p>
              )}
            </div>

            {/* Fees */}
            {totalTickets > 0 && (
              <div className="mb-4 flex flex-col gap-2 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Zwischensumme</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Servicegebühr (1,99€ + 5%)</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between text-sm font-semibold">
              <span>Gesamt</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
