import { SITE, SITE_URL } from "@/lib/constants";

/** JSON-LD da escola (MusicSchool/LocalBusiness) com sinais de SEO local:
 *  endereço, geo, horários, área atendida e mapa. */
export function musicSchoolJsonLd(): Record<string, unknown> {
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: "SP",
    addressCountry: "BR",
  };
  if (SITE.street) address.streetAddress = SITE.street;
  if (SITE.postalCode) address.postalCode = SITE.postalCode;

  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: SITE.name,
    description: `A maior escola de música do ${SITE.region}. Aulas presenciais e online ao vivo desde ${SITE.foundedYear}.`,
    url: SITE_URL,
    image: `${SITE_URL}/logo.jpg`,
    telephone: SITE.phone,
    foundingDate: String(SITE.foundedYear),
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.googleMapsUrl,
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube],
  };
}

type FaqItem = { question: string; answer?: unknown };

/** Extrai texto puro de Portable Text (para o FAQPage). */
export function portableTextToPlain(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      const b = block as { _type?: string; children?: { text?: string }[] };
      if (b._type !== "block" || !Array.isArray(b.children)) return "";
      return b.children.map((c) => c.text ?? "").join("");
    })
    .filter(Boolean)
    .join("\n");
}

export function faqPageJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: portableTextToPlain(f.answer),
      },
    })),
  };
}
