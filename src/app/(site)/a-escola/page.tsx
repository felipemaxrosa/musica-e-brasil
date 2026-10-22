import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { safeFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { sectionTextQuery, galleryQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "A Escola",
  description:
    "A história da E-Brasil desde 2006: quase 3 mil alunos, professores experientes, estúdio profissional e eventos que colocam o aluno no palco.",
  alternates: { canonical: "/a-escola" },
};

const DIFERENCIAIS = [
  { title: "Tradição desde 2006", text: "Quase 3 mil alunos já passaram pela E-Brasil." },
  { title: "Estrutura profissional", text: "Salas individuais e em grupo + estúdio de ensaio e gravação." },
  { title: "O palco é seu", text: "Eventos como o Especial E-Brasil colocam o aluno para se apresentar." },
  { title: "Equipe experiente", text: "Mais de 15 professores apaixonados pelo que fazem." },
];

const YOUTUBE_ID = "Ig6LiYaaq70";

type Gallery = { _id: string; image: Parameters<typeof urlFor>[0]; alt?: string; caption?: string };

export default async function AEscolaPage() {
  const [hist, gallery, settings] = await Promise.all([
    safeFetch<{ title?: string; body?: unknown[] } | null>(
      { query: sectionTextQuery, params: { key: "historia" } },
      null,
    ),
    safeFetch<Gallery[]>({ query: galleryQuery }, []),
    safeFetch<{ whatsapp?: string } | null>({ query: settingsQuery }, null),
  ]);

  const waHref = buildWhatsappUrl(
    WHATSAPP_DEFAULT_MESSAGE,
    settings?.whatsapp ?? SITE.whatsapp,
  );

  return (
    <>
      <PageHero
        eyebrow="A Escola"
        title="Desde 2006, transformando sonhos em música"
        subtitle="A maior escola de música do Litoral Norte Paulista, em Caraguatatuba."
      />

      {hist?.body && (
        <Section>
          <Reveal className="max-w-3xl">
            {hist.title && <Heading className="mb-5">{hist.title}</Heading>}
            <div className="space-y-4 text-lg leading-relaxed text-ink/80">
              <PortableText value={hist.body as never} />
            </div>
          </Reveal>
        </Section>
      )}

      <Section className="bg-surface/40">
        <Reveal>
          <Badge>Por que a E-Brasil</Badge>
          <Heading className="mt-3">Diferenciais que fazem a diferença</Heading>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIFERENCIAIS.map((d, idx) => (
            <Reveal key={d.title} delay={idx * 50} className="rounded-2xl border border-line bg-night p-6">
              <h3 className="font-display text-lg font-bold text-gold">{d.title}</h3>
              <p className="mt-2 text-sm text-muted">{d.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Badge>Vídeo institucional</Badge>
          <Heading className="mt-3">Conheça a E-Brasil por dentro</Heading>
          <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-line">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
              title="Vídeo institucional E-Brasil"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Reveal>
      </Section>

      {gallery.length > 0 && (
        <Section className="bg-surface/40">
          <Reveal>
            <Badge>Galeria</Badge>
            <Heading className="mt-3">Aqui na E-Brasil você faz o show</Heading>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((g) => (
              <div key={g._id} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                <Image
                  src={urlFor(g.image).width(800).height(600).fit("crop").url()}
                  alt={g.alt ?? g.caption ?? "Foto da E-Brasil"}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      <FinalCTA waHref={waHref} />
    </>
  );
}
