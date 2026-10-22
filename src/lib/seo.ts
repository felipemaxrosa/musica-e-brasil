import { SITE, SITE_URL } from "@/lib/constants";

/** JSON-LD da escola (MusicSchool/LocalBusiness). Nome oficial do site. */
export function musicSchoolJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: SITE.name,
    description: `A maior escola de música do ${SITE.region}. Aulas presenciais e online ao vivo desde ${SITE.foundedYear}.`,
    url: SITE_URL,
    telephone: SITE.phone,
    foundingDate: String(SITE.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: "SP",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
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
