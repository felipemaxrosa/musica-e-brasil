import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;

const STATS = [
  { value: "+3 mil", label: "alunos formados" },
  { value: "18 anos", label: "no Litoral Norte" },
  { value: "6+", label: "instrumentos" },
];

/**
 * Home — placeholder do shell (Task 1). O hero com carrossel de fundo e as
 * demais seções vêm do Sanity na Task 4.
 */
export default function Home() {
  return (
    <Section className="pt-16 md:pt-24">
      <Reveal className="max-w-2xl">
        <Badge>Escola de Música · desde {SITE.foundedYear}</Badge>
        <Heading as="h1" size="hero" className="mt-5">
          Aqui, você vai <em className="italic font-medium text-gold">brilhar</em>
        </Heading>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          A maior escola de música do {SITE.region}. Aulas com professores de
          verdade e palco pra mostrar o que você aprendeu.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={waHref} external variant="whatsapp" size="lg">
            Agendar aula experimental
          </Button>
          <Button href="/a-escola" variant="ghost" size="lg">
            Conhecer a escola
          </Button>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-2xl font-bold text-ink">{s.value}</dt>
              <dd className="text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
