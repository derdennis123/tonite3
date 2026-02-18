import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">
              <span className="text-accent">t</span>onite
            </h3>
            <p className="text-sm text-muted">
              Entdecke die besten Events in deiner Stadt — günstiger als anderswo.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Entdecken</h4>
            <div className="flex flex-col gap-2">
              <Link href="/search" className="text-sm text-muted hover:text-foreground">Events</Link>
              <Link href="/search?category=Party" className="text-sm text-muted hover:text-foreground">Partys</Link>
              <Link href="/search?category=Konzert" className="text-sm text-muted hover:text-foreground">Konzerte</Link>
              <Link href="/search?category=Comedy" className="text-sm text-muted hover:text-foreground">Comedy</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Veranstalter</h4>
            <div className="flex flex-col gap-2">
              <Link href="/veranstalter" className="text-sm text-muted hover:text-foreground">Login</Link>
              <Link href="/veranstalter/register" className="text-sm text-muted hover:text-foreground">Registrierung</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Rechtliches</h4>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted hover:text-foreground">Impressum</Link>
              <Link href="#" className="text-sm text-muted hover:text-foreground">Datenschutz</Link>
              <Link href="#" className="text-sm text-muted hover:text-foreground">AGB</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} tonite. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
