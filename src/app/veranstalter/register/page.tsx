"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Building2, User, Lock, ArrowRight, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    email: "",
    password: "",
    company: "",
    contact: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (step === "success") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <CheckCircle size={32} className="text-success" />
            </div>
          </div>
          <h1 className="mb-2 text-2xl font-bold">Registrierung erfolgreich!</h1>
          <p className="mb-2 text-muted">
            Dein Veranstalter-Konto wurde erstellt. Du hast sofort Zugang zum Dashboard.
          </p>
          <p className="mb-6 text-sm text-muted">
            Im nächsten Schritt kannst du dein Stripe Connect Konto einrichten, um Auszahlungen zu erhalten.
          </p>
          <Link
            href="/veranstalter/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Zum Dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Veranstalter werden</h1>
          <p className="text-muted">
            Erstelle ein kostenloses Konto und starte sofort.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep("success");
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                E-Mail
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <Mail size={16} className="text-muted" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="info@veranstalter.de"
                  required
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Firmenname
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <Building2 size={16} className="text-muted" />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Mein Event-Unternehmen GmbH"
                  required
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Ansprechpartner
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <User size={16} className="text-muted" />
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) => update("contact", e.target.value)}
                  placeholder="Max Mustermann"
                  required
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Passwort
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <Lock size={16} className="text-muted" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min. 8 Zeichen"
                  required
                  minLength={8}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Kostenlos registrieren <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted">
            Mit der Registrierung akzeptierst du unsere{" "}
            <Link href="#" className="text-accent hover:underline">AGB</Link> und{" "}
            <Link href="#" className="text-accent hover:underline">Datenschutzrichtlinie</Link>.
          </p>

          <div className="mt-4 text-center">
            <Link
              href="/veranstalter"
              className="text-sm text-accent hover:underline"
            >
              Bereits registriert? Anmelden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
