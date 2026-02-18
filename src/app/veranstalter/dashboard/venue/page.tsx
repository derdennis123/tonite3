"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Upload,
  Save,
  Plus,
  X,
} from "lucide-react";

export default function VenueProfilePage() {
  const [name, setName] = useState("Stadtgarten");
  const [address, setAddress] = useState("Venloer Str. 40, 50672 Köln");
  const [description, setDescription] = useState(
    "Legendärer Club und Kulturort im Herzen von Köln mit einzigartiger Atmosphäre."
  );
  const [openingHours, setOpeningHours] = useState("Mi–Sa 19:00–02:00");
  const [faqs, setFaqs] = useState([
    { id: "1", question: "Gibt es Parkplätze?", answer: "Ja, Parkhaus Mediapark (5 Min. Fußweg)." },
    { id: "2", question: "Barrierefreiheit?", answer: "Ja, der Veranstaltungsort ist barrierefrei zugänglich." },
    { id: "3", question: "Dresscode?", answer: "Casual — komm wie du dich wohlfühlst." },
  ]);

  const addFaq = () => {
    setFaqs((prev) => [...prev, { id: String(Date.now()), question: "", answer: "" }]);
  };

  const removeFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFaq = (id: string, key: "question" | "answer", value: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Venue-Profil</h1>
        <button className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover">
          <Save size={16} />
          Speichern
        </button>
      </div>

      <form className="flex flex-col gap-8">
        {/* Basic venue info */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Venue-Details</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Name der Location
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                <MapPin size={12} className="mr-1 inline" />
                Adresse
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
              />
              {/* Map placeholder */}
              <div className="mt-3 flex h-40 items-center justify-center rounded-lg border border-border bg-card text-sm text-muted">
                Kartenvorschau
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Beschreibung
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                <Clock size={12} className="mr-1 inline" />
                Öffnungszeiten
              </label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="z.B. Mi–Sa 19:00–02:00"
                className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Venue images */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Bilder der Location</h2>
          <div className="rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
            <Upload size={32} className="mx-auto mb-3 text-muted" />
            <p className="mb-1 text-sm font-medium">
              Bilder hierher ziehen oder klicken
            </p>
            <p className="text-xs text-muted">JPG, PNG — max. 10 MB pro Datei</p>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">FAQs & Infos</h2>
          <p className="mb-4 text-sm text-muted">
            Beantworte häufig gestellte Fragen (Parkplätze, Barrierefreiheit, Dresscode etc.)
          </p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                      placeholder="Frage"
                      className="mb-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                      placeholder="Antwort"
                      rows={2}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFaq(faq.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:text-danger"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-1 text-sm text-accent hover:underline"
            >
              <Plus size={14} /> FAQ hinzufügen
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
