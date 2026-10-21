import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

type Testimonial = {
  _id: string;
  name: string;
  relation?: string;
  quote: string;
  rating?: number;
};

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null;

  return (
    <Section id="depoimentos">
      <Reveal>
        <Badge>Depoimentos</Badge>
        <Heading className="mt-3">Quem estuda aqui, recomenda</Heading>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <Reveal
            key={t._id}
            delay={idx * 70}
            className="flex flex-col rounded-2xl border border-line bg-surface p-7"
          >
            <div className="text-gold" aria-label={`${t.rating ?? 5} de 5 estrelas`}>
              {"★".repeat(Math.round(t.rating ?? 5))}
            </div>
            <blockquote className="mt-4 flex-1 text-ink/90">“{t.quote}”</blockquote>
            <div className="mt-5">
              <div className="font-display font-bold text-ink">{t.name}</div>
              {t.relation && <div className="text-sm text-muted">{t.relation}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
