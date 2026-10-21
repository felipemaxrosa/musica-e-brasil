import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Destaque do palco / eventos (prova de "você vai se apresentar de verdade"). */
export function StageHighlight() {
  return (
    <Section id="palco">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <Badge>O palco é seu</Badge>
          <Heading className="mt-3">
            No <em className="italic font-medium text-gold">Especial E-Brasil</em>, o aluno vira artista
          </Heading>
          <p className="mt-4 max-w-xl text-muted">
            Com estrutura de som, luz e gravação profissionais, nossos eventos
            colocam os alunos no palco de verdade — o momento mais esperado do
            ano por quem estuda aqui.
          </p>
          <div className="mt-7">
            <Button href="/a-escola" variant="ghost">
              Ver a estrutura e os eventos
            </Button>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="grid grid-cols-3 gap-3 text-center"
        >
          {[
            { v: "+3 mil", l: "alunos" },
            { v: "15+", l: "professores" },
            { v: "2 escolas", l: "+ loja" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-line bg-surface p-5">
              <div className="font-display text-2xl font-black text-gold">{s.v}</div>
              <div className="mt-1 text-xs text-muted">{s.l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
