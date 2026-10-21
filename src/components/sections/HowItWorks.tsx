import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Fale com a gente",
    text: "Chame no WhatsApp ou preencha o formulário e diga o instrumento de interesse.",
  },
  {
    n: "02",
    title: "Agende um horário",
    text: "Combinamos o melhor dia e hora pra você conhecer a escola, sem compromisso.",
  },
  {
    n: "03",
    title: "Faça a aula experimental",
    text: "Uma aula gratuita pra você sentir como é tocar e cantar na E-Brasil.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" className="bg-surface/40">
      <Reveal>
        <Badge>Como funciona</Badge>
        <Heading className="mt-3">Sua aula experimental em 3 passos</Heading>
      </Reveal>

      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, idx) => (
          <Reveal key={s.n} as="li" delay={idx * 80} className="relative rounded-2xl border border-line bg-base p-7">
            <span className="font-display text-4xl font-black text-gold/30">{s.n}</span>
            <h3 className="mt-3 font-display text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
