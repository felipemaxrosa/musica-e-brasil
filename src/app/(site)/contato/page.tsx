import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/fetch";
import { settingsQuery, faqQuery } from "@/sanity/lib/queries";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AgendarForm } from "@/components/sections/AgendarForm";
import { Faq } from "@/components/sections/Faq";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { JsonLd } from "@/components/seo/JsonLd";
import { musicSchoolJsonLd, faqPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Agende sua Aula",
  description:
    "Agende sua aula experimental gratuita na E-Brasil, em Caraguatatuba. Fale pelo WhatsApp ou pelo formulário.",
  alternates: { canonical: "/contato" },
};

type Settings = {
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  openingHours?: { day: string; opens?: string; closes?: string; closed?: boolean }[];
  social?: { instagram?: string; facebook?: string; youtube?: string };
};
type FaqItem = { _id: string; question: string; answer?: unknown[] };

export default async function ContatoPage() {
  const [settings, faq] = await Promise.all([
    safeFetch<Settings>({ query: settingsQuery }, {}),
    safeFetch<FaqItem[]>({ query: faqQuery }, []),
  ]);
  const whatsapp = settings.whatsapp ?? SITE.whatsapp;
  const waHref = buildWhatsappUrl(WHATSAPP_DEFAULT_MESSAGE, whatsapp);

  return (
    <>
      <JsonLd data={musicSchoolJsonLd()} />
      {faq.length > 0 && <JsonLd data={faqPageJsonLd(faq)} />}
      <PageHero
        eyebrow="Agende sua aula"
        title="Vamos marcar sua aula experimental?"
        subtitle="É gratuita e sem compromisso. Responda em poucos campos ou chame direto no WhatsApp."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Heading size="card" as="h2" className="mb-6">
              Preencha e a gente te chama
            </Heading>
            <AgendarForm waHref={waHref} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gold/25 bg-surface p-6">
              <h3 className="font-display text-lg font-bold text-ink">Prefere no WhatsApp?</h3>
              <p className="mt-2 text-sm text-muted">Resposta rápida, do jeito que você já fala com a gente.</p>
              <div className="mt-4">
                <Button href={waHref} external variant="whatsapp" size="lg">
                  Chamar no WhatsApp
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6 text-sm">
              <h3 className="font-display text-lg font-bold text-ink">Contato</h3>
              <ul className="mt-3 space-y-2 text-muted">
                {settings.phone && <li>Telefone: {settings.phone}</li>}
                {settings.address && <li>{settings.address}</li>}
                {settings.email && <li>{settings.email}</li>}
              </ul>
              {!!settings.openingHours?.length && (
                <>
                  <h4 className="mt-5 font-detail text-xs uppercase tracking-[0.18em] text-gold">Horários</h4>
                  <ul className="mt-2 space-y-1 text-muted">
                    {settings.openingHours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span>{h.closed ? "Fechado" : `${h.opens ?? ""}–${h.closes ?? ""}`}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {settings.social && (
                <div className="mt-5 flex gap-4 text-gold">
                  {settings.social.instagram && <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>}
                  {settings.social.facebook && <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>}
                  {settings.social.youtube && <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube</a>}
                </div>
              )}
            </div>

            <MapEmbed lat={SITE.geo.lat} lng={SITE.geo.lng} />
          </aside>
        </div>
      </Section>

      {faq.length > 0 && (
        <Section className="bg-surface/40">
          <Badge>Dúvidas frequentes</Badge>
          <Heading className="mb-0 mt-3">Perguntas de pais e alunos</Heading>
          <div className="mt-8 max-w-3xl">
            <Faq items={faq} />
          </div>
        </Section>
      )}
    </>
  );
}
