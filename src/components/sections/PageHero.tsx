import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";

/** Cabeçalho padrão das páginas internas. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-surface/50 to-night py-14 md:py-20">
      <Container>
        {eyebrow && <Badge>{eyebrow}</Badge>}
        <Heading as="h1" size="hero" className="mt-4 max-w-3xl">
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
