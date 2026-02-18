"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function VeranstalterLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">
            <span className="text-accent">t</span>onite für Veranstalter
          </h1>
          <p className="text-muted">
            Melde dich an, um deine Events zu verwalten.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/veranstalter/dashboard";
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@veranstalter.de"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Anmelden <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/veranstalter/register"
              className="text-sm text-accent hover:underline"
            >
              Noch kein Konto? Jetzt registrieren
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
