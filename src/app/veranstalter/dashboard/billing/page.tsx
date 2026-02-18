import {
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  FileText,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react";

const payouts = [
  { id: "PAY-001", date: "15. Feb 2026", amount: "2.450,00 €", status: "completed" as const, reference: "Comedy Night Köln — 08. Feb" },
  { id: "PAY-002", date: "01. Feb 2026", amount: "1.890,00 €", status: "completed" as const, reference: "Comedy Night Köln — 25. Jan" },
  { id: "PAY-003", date: "15. Jan 2026", amount: "3.120,00 €", status: "completed" as const, reference: "Silvester Comedy Special" },
  { id: "PAY-004", date: "01. Mär 2026", amount: "1.650,00 €", status: "pending" as const, reference: "Comedy Night Köln — 22. Feb" },
];

const invoices = [
  { id: "INV-2026-001", date: "Feb 2026", amount: "4.340,00 €", description: "Umsatz Februar 2026" },
  { id: "INV-2026-002", date: "Jan 2026", amount: "5.010,00 €", description: "Umsatz Januar 2026" },
  { id: "INV-2025-012", date: "Dez 2025", amount: "6.780,00 €", description: "Umsatz Dezember 2025" },
];

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 text-2xl font-bold">Abrechnungen</h1>

      {/* Revenue stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted">Umsatz (gesamt)</span>
            <TrendingUp size={16} className="text-muted" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">28.430 €</span>
            <span className="flex items-center text-xs text-success">
              <ArrowUpRight size={12} />
              +8%
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted">Ausgezahlt</span>
            <CreditCard size={16} className="text-muted" />
          </div>
          <span className="text-2xl font-bold">7.460 €</span>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted">Ausstehend</span>
            <Clock size={16} className="text-muted" />
          </div>
          <span className="text-2xl font-bold">1.650 €</span>
        </div>
      </div>

      {/* Stripe Connect status */}
      <div className="mb-8 rounded-xl border border-success/30 bg-success/5 p-4">
        <div className="flex items-center gap-3">
          <CheckCircle size={20} className="shrink-0 text-success" />
          <div>
            <h3 className="text-sm font-medium">Stripe Connect aktiv</h3>
            <p className="text-xs text-muted">
              Deine Auszahlungen werden automatisch auf dein verifiziertes Konto überwiesen.
            </p>
          </div>
        </div>
      </div>

      {/* Payout history */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Auszahlungs-Historie</h2>
        <div className="rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Datum</th>
                  <th className="px-4 py-3 font-medium">Referenz</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Betrag</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-sm text-muted">
                      {payout.id}
                    </td>
                    <td className="px-4 py-3 text-sm">{payout.date}</td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {payout.reference}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          payout.status === "completed"
                            ? "bg-success/10 text-success"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {payout.status === "completed" ? (
                          <>
                            <CheckCircle size={10} /> Ausgezahlt
                          </>
                        ) : (
                          <>
                            <Clock size={10} /> Ausstehend
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium">
                      {payout.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Rechnungen</h2>
        <div className="flex flex-col gap-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-muted" />
                <div>
                  <h3 className="text-sm font-medium">{invoice.description}</h3>
                  <p className="text-xs text-muted">
                    {invoice.id} · {invoice.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{invoice.amount}</span>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground">
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
