export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  images: string[];
  venue: Venue;
  dates: EventDate[];
  tickets: TicketCategory[];
  organizer: Organizer;
  faqs: FAQ[];
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  description: string;
  lat: number;
  lng: number;
  openingHours: string;
}

export interface EventDate {
  id: string;
  date: string;
  time: string;
  doorsOpen?: string;
}

export interface TicketCategory {
  id: string;
  name: string;
  originalPrice: number;
  reducedPrice: number;
  discount: number;
  available: number;
  total: number;
}

export interface Organizer {
  id: string;
  name: string;
  company: string;
  email: string;
  verified: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Comedy Night Köln",
    description:
      "Ein Abend voller Lacher mit den besten Stand-up-Comedians aus NRW. Erlebe drei Stunden pure Unterhaltung in einem der angesagtesten Venues Kölns. Unsere sorgfältig ausgewählten Comedians bringen dich garantiert zum Lachen — von scharfzüngiger Satire bis hin zu urkomischen Alltagsgeschichten.",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=500&fit=crop",
    ],
    venue: {
      name: "Stadtgarten",
      address: "Venloer Str. 40, 50672 Köln",
      city: "Köln",
      description: "Legendärer Club und Kulturort im Herzen von Köln mit einzigartiger Atmosphäre.",
      lat: 50.9413,
      lng: 6.9326,
      openingHours: "Mi–Sa 19:00–02:00",
    },
    dates: [
      { id: "d1", date: "2026-03-15", time: "20:00", doorsOpen: "19:00" },
      { id: "d2", date: "2026-03-22", time: "20:00", doorsOpen: "19:00" },
    ],
    tickets: [
      {
        id: "t1",
        name: "Standard",
        originalPrice: 25,
        reducedPrice: 17.5,
        discount: 30,
        available: 45,
        total: 100,
      },
      {
        id: "t2",
        name: "VIP (inkl. Getränk)",
        originalPrice: 45,
        reducedPrice: 31.5,
        discount: 30,
        available: 12,
        total: 20,
      },
    ],
    organizer: {
      id: "o1",
      name: "Max Müller",
      company: "Köln Comedy Club",
      email: "info@koelncomedy.de",
      verified: true,
    },
    faqs: [
      { question: "Gibt es Parkplätze?", answer: "Ja, Parkhaus Mediapark (5 Min. Fußweg)." },
      { question: "Ab welchem Alter?", answer: "Ab 16 Jahren in Begleitung, ab 18 alleine." },
      { question: "Dresscode?", answer: "Casual — komm wie du dich wohlfühlst." },
    ],
  },
  {
    id: "2",
    title: "Techno Warehouse Party",
    description:
      "Die ultimative Warehouse-Erfahrung mit internationalen DJs und einem Sound-System, das du fühlen wirst. Tauche ein in eine Nacht voller treibender Beats, Lichtinstallationen und einer Community, die für die Musik lebt.",
    category: "Party",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=500&fit=crop",
    ],
    venue: {
      name: "Carlswerk Victoria",
      address: "Schanzenstr. 6–20, 51063 Köln",
      city: "Köln",
      description: "Industrielle Event-Location in Köln-Mülheim mit riesiger Halle und perfekter Akustik.",
      lat: 50.9589,
      lng: 7.0134,
      openingHours: "Fr–Sa 23:00–08:00",
    },
    dates: [
      { id: "d3", date: "2026-03-21", time: "23:00", doorsOpen: "22:30" },
    ],
    tickets: [
      {
        id: "t3",
        name: "Early Bird",
        originalPrice: 20,
        reducedPrice: 14,
        discount: 30,
        available: 0,
        total: 200,
      },
      {
        id: "t4",
        name: "Regular",
        originalPrice: 30,
        reducedPrice: 21,
        discount: 30,
        available: 150,
        total: 300,
      },
      {
        id: "t5",
        name: "VIP Table (4 Personen)",
        originalPrice: 200,
        reducedPrice: 140,
        discount: 30,
        available: 5,
        total: 10,
      },
    ],
    organizer: {
      id: "o2",
      name: "Lisa Weber",
      company: "Nachtwerk Events",
      email: "booking@nachtwerk.de",
      verified: true,
    },
    faqs: [
      { question: "Gibt es eine Garderobe?", answer: "Ja, für 2€ pro Stück." },
      { question: "Ist Rauchen erlaubt?", answer: "Nur im Außenbereich." },
    ],
  },
  {
    id: "3",
    title: "Jazz & Wine Abend",
    description:
      "Genieße erstklassigen Live-Jazz in Kombination mit ausgewählten Weinen aus der Region. Ein Abend für Genießer — entspannt, stilvoll und mit Musik, die unter die Haut geht.",
    category: "Konzert",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop",
    ],
    venue: {
      name: "Altes Pfandhaus",
      address: "Kartäuserwall 20, 50678 Köln",
      city: "Köln",
      description: "Charmante Location in historischem Gebäude, perfekt für intime Konzerte.",
      lat: 50.9251,
      lng: 6.957,
      openingHours: "Do–Sa 18:00–00:00",
    },
    dates: [
      { id: "d4", date: "2026-03-14", time: "19:30", doorsOpen: "18:30" },
      { id: "d5", date: "2026-03-28", time: "19:30", doorsOpen: "18:30" },
      { id: "d6", date: "2026-04-11", time: "19:30", doorsOpen: "18:30" },
    ],
    tickets: [
      {
        id: "t6",
        name: "Standard (inkl. 1 Glas Wein)",
        originalPrice: 35,
        reducedPrice: 24.5,
        discount: 30,
        available: 30,
        total: 60,
      },
      {
        id: "t7",
        name: "Premium (inkl. Weinbegleitung)",
        originalPrice: 65,
        reducedPrice: 45.5,
        discount: 30,
        available: 8,
        total: 15,
      },
    ],
    organizer: {
      id: "o3",
      name: "Thomas Braun",
      company: "Kulturwerk Köln",
      email: "events@kulturwerk-koeln.de",
      verified: true,
    },
    faqs: [
      { question: "Barrierefreiheit?", answer: "Ja, der Veranstaltungsort ist barrierefrei zugänglich." },
      { question: "Dresscode?", answer: "Smart Casual empfohlen." },
    ],
  },
  {
    id: "4",
    title: "Rooftop Sunset Session",
    description:
      "Chillout-Beats auf einer der schönsten Dachterrassen Düsseldorfs. Genieße den Sonnenuntergang über der Skyline mit kühlen Drinks und entspannter Musik. Die perfekte Location für einen unvergesslichen Abend.",
    category: "Party",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop",
    ],
    venue: {
      name: "Sky Lounge",
      address: "Königsallee 59, 40215 Düsseldorf",
      city: "Düsseldorf",
      description: "Exklusive Rooftop-Bar mit 360° Blick über Düsseldorf.",
      lat: 51.2277,
      lng: 6.7835,
      openingHours: "Mi–So 17:00–01:00",
    },
    dates: [
      { id: "d7", date: "2026-04-05", time: "18:00", doorsOpen: "17:30" },
    ],
    tickets: [
      {
        id: "t8",
        name: "General Admission",
        originalPrice: 15,
        reducedPrice: 10.5,
        discount: 30,
        available: 80,
        total: 150,
      },
    ],
    organizer: {
      id: "o4",
      name: "Sarah Fischer",
      company: "Sunset Events GmbH",
      email: "hello@sunset-events.de",
      verified: true,
    },
    faqs: [
      { question: "Was bei Regen?", answer: "Die Location hat eine überdachte Fläche. Das Event findet bei jedem Wetter statt." },
    ],
  },
  {
    id: "5",
    title: "Stand-Up Special: Nachts im Museum",
    description:
      "Comedy im Museum — eine einzigartige Show in den Räumen des Museum Ludwig. Drei Comedians, ein unvergessliches Setting. Kulturell, komisch und ein bisschen verrückt.",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop",
    ],
    venue: {
      name: "Museum Ludwig",
      address: "Heinrich-Böll-Platz, 50667 Köln",
      city: "Köln",
      description: "Weltberühmtes Kunstmuseum direkt neben dem Kölner Dom.",
      lat: 50.9408,
      lng: 6.9592,
      openingHours: "Di–So 10:00–18:00",
    },
    dates: [
      { id: "d8", date: "2026-04-18", time: "21:00", doorsOpen: "20:00" },
    ],
    tickets: [
      {
        id: "t9",
        name: "Eintritt",
        originalPrice: 28,
        reducedPrice: 19.6,
        discount: 30,
        available: 65,
        total: 120,
      },
    ],
    organizer: {
      id: "o1",
      name: "Max Müller",
      company: "Köln Comedy Club",
      email: "info@koelncomedy.de",
      verified: true,
    },
    faqs: [
      { question: "Darf ich Fotos machen?", answer: "Ja, aber bitte ohne Blitz in den Ausstellungsräumen." },
    ],
  },
  {
    id: "6",
    title: "Salsa Night Fiesta",
    description:
      "Heiße Rhythmen, kalte Cocktails! Die größte Salsa-Party im Rheinland — mit Live-Band, Tanzfläche und Anfänger-Workshop. Ob Profi oder Einsteiger, hier tanzt jeder!",
    category: "Tanz",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=500&fit=crop",
    ],
    venue: {
      name: "Gloria Theater",
      address: "Apostelnstr. 11, 50667 Köln",
      city: "Köln",
      description: "Historisches Theater mit vielseitigem Programm und einzigartiger Atmosphäre.",
      lat: 50.9355,
      lng: 6.9458,
      openingHours: "Eventabhängig",
    },
    dates: [
      { id: "d9", date: "2026-03-29", time: "20:00", doorsOpen: "19:30" },
      { id: "d10", date: "2026-04-26", time: "20:00", doorsOpen: "19:30" },
    ],
    tickets: [
      {
        id: "t10",
        name: "Eintritt (inkl. Workshop)",
        originalPrice: 22,
        reducedPrice: 15.4,
        discount: 30,
        available: 90,
        total: 200,
      },
      {
        id: "t11",
        name: "Nur Party",
        originalPrice: 15,
        reducedPrice: 10.5,
        discount: 30,
        available: 120,
        total: 200,
      },
    ],
    organizer: {
      id: "o5",
      name: "Carlos Rodriguez",
      company: "Ritmo Latino Events",
      email: "carlos@ritmolatino.de",
      verified: true,
    },
    faqs: [
      { question: "Muss ich tanzen können?", answer: "Nein! Der Workshop ist für Anfänger gedacht." },
      { question: "Dresscode?", answer: "Bequeme Schuhe zum Tanzen empfohlen." },
    ],
  },
];

export const categories = [
  "Alle",
  "Party",
  "Konzert",
  "Comedy",
  "Tanz",
  "Kultur",
  "Sport",
  "Food & Drinks",
];

export const cities = ["Alle Städte", "Köln", "Düsseldorf", "Bonn", "Essen", "Dortmund"];

export function getEvent(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + " €";
}
