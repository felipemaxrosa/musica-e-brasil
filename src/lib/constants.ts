import type { Route } from "next";

/** Dados da escola. Os de contato são provisórios/a confirmar (ver spec §9);
 *  em produção virão do `siteSettings` do Sanity. */
export const SITE = {
  name: "Escola de Música E-Brasil",
  shortName: "E-Brasil",
  city: "Caraguatatuba",
  region: "Litoral Norte de São Paulo",
  foundedYear: 2006,
  // WhatsApp oficial p/ CTA (a confirmar): (12) 99715-0806
  whatsapp: "5512997150806",
  phone: "+551238812335",
  email: "", // a confirmar com a escola
  // Endereço real (SEO local — PostalAddress).
  street: "R. Major Aires, 238 - Centro",
  postalCode: "11660-220",
  geo: { lat: -23.6202507, lng: -45.4093475 },
  googleMapsUrl: "https://maps.app.goo.gl/svMmGspqmGRLHCZi6",
  // Cidades atendidas (Litoral Norte) — sinal de área de atuação p/ busca local.
  areaServed: ["Caraguatatuba", "Ubatuba", "São Sebastião", "Ilhabela"],
  social: {
    instagram: "https://www.instagram.com/escola_ebrasil/",
    facebook: "https://www.facebook.com/escolaebrasil/",
    youtube: "https://www.youtube.com/channel/UCeJTCbeuoGimkQGXbV3ux7g",
  },
} as const;

/** Normaliza um candidato a URL base: tira espaços/aspas/barra final, adiciona
 *  `https://` se faltar protocolo e valida. Retorna "" se não der uma URL válida. */
function ensureUrl(raw?: string): string {
  const v = (raw ?? "").trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
  if (!v) return "";
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    return new URL(withProto).origin;
  } catch {
    return "";
  }
}

/** URL base do site, sempre absoluta e válida. Ordem: var pública → URL de
 *  produção da Vercel → URL do deploy da Vercel → localhost. Garante que
 *  `new URL(SITE_URL)` nunca quebre o build, mesmo com a var vazia ou sem `https://`. */
export const SITE_URL =
  ensureUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  ensureUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  ensureUrl(process.env.VERCEL_URL) ||
  "http://localhost:3000";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Tenho interesse em agendar uma aula experimental na E-Brasil.";

export const NAV_LINKS: ReadonlyArray<{ href: Route; label: string }> = [
  { href: "/", label: "Início" },
  { href: "/cursos", label: "Cursos" },
  { href: "/instrutores", label: "Instrutores" },
  { href: "/a-escola", label: "A Escola" },
  { href: "/contato", label: "Contato" },
];
