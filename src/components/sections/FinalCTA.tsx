import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA({ waHref }: { waHref: string }) {
  return (
    <Section id="cta">
      <Reveal className="overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-surface to-base p-10 text-center md:p-16">
        <Heading as="h2" size="section" className="mx-auto max-w-2xl">
          Pronto pra realizar seu sonho de{" "}
          <em className="italic font-medium text-gold">tocar ou cantar</em>?
        </Heading>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Agende sua aula experimental gratuita. É rápido e sem compromisso.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={waHref} external variant="whatsapp" size="lg">
            Chamar no WhatsApp
          </Button>
          <Button href="/contato" variant="gold" size="lg">
            Agendar pelo formulário
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
