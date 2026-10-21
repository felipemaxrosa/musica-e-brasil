import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { coursesQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Cursos e Modalidades",
  description:
    "Canto, violão, guitarra, teclado, contrabaixo e bateria — presencial ou online ao vivo, em grupo ou personal, na maior escola de música do Litoral Norte.",
};

const MODALITIES = [
  { title: "Presencial", text: "Na nossa estrutura em Caraguatatuba, com salas e estúdio." },
  { title: "Online ao vivo", text: "Aulas em tempo real com professor, de onde você estiver." },
  { title: "Personal", text: "Aula individual, no seu ritmo e foco." },
  { title: "Em grupo", text: "Aprenda junto, divida o palco e faça amigos." },
];

const EXTRAS = [
  { title: "Prática de bandas", text: "Toque junto e viva a experiência de uma banda de verdade." },
  { title: "Teoria e leitura musical", text: "Entenda a música que você toca e evolua mais rápido." },
  { title: "Minha Banda é Top", text: "Projeto que coloca os alunos para tocar em conjunto." },
];

type Course = {
  _id: string;
  name: string;
  description?: string;
  modalities?: string[];
};

export default async function CursosPage() {
  const [{ data: coursesData }, { data: settings }] = await Promise.all([
    sanityFetch({ query: coursesQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);
  const courses = (coursesData ?? []) as Course[];
  const waHref = buildWhatsappUrl(
    WHATSAPP_DEFAULT_MESSAGE,
    (settings as { whatsapp?: string } | null)?.whatsapp ?? SITE.whatsapp,
  );

  return (
    <>
      <PageHero
        eyebrow="Cursos & Modalidades"
        title="Encontre o instrumento do seu sonho"
        subtitle="Aulas para crianças, adolescentes e adultos — do primeiro contato ao palco."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, idx) => (
            <Reveal
              key={c._id}
              delay={idx * 50}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <h2 className="font-display text-xl font-bold text-ink">{c.name}</h2>
              {c.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
              )}
              {!!c.modalities?.length && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.modalities.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/40">
        <Reveal>
          <Badge>Como você aprende</Badge>
          <Heading className="mt-3">Modalidades pra todo jeito de estudar</Heading>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODALITIES.map((m, idx) => (
            <Reveal key={m.title} delay={idx * 50} className="rounded-2xl border border-line bg-night p-5">
              <h3 className="font-display text-lg font-bold text-gold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Badge>Além das aulas</Badge>
          <Heading className="mt-3">Experiências que aceleram sua evolução</Heading>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {EXTRAS.map((e, idx) => (
            <Reveal key={e.title} delay={idx * 60} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-bold text-ink">{e.title}</h3>
              <p className="mt-2 text-sm text-muted">{e.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCTA waHref={waHref} />
    </>
  );
}
