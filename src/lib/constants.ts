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
  geo: { lat: -23.6202507, lng: -45.4093475 },
  social: {
    instagram: "https://www.instagram.com/escola_ebrasil/",
    facebook: "https://www.facebook.com/escolaebrasil/",
    youtube: "https://www.youtube.com/channel/UCeJTCbeuoGimkQGXbV3ux7g",
  },
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Tenho interesse em agendar uma aula experimental na E-Brasil.";

export const NAV_LINKS: ReadonlyArray<{ href: Route; label: string }> = [
  { href: "/", label: "Início" },
  { href: "/cursos", label: "Cursos" },
  { href: "/instrutores", label: "Instrutores" },
  { href: "/a-escola", label: "A Escola" },
  { href: "/contato", label: "Contato" },
];
