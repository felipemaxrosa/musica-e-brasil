import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * /proposta — pitch comercial à E-Brasil (noindex).
 * PLACEHOLDER: conteúdo final a ser fornecido pelo Felipe.
 */

const VALOR = [
  { title: "Mais matrículas", text: "Um site pensado pra converter: quem chega por indicação encontra tudo e agenda a aula experimental em 2 cliques." },
  { title: "Credibilidade", text: "Visual premium e profissional, à altura da maior escola de música do Litoral Norte." },
  { title: "Você no controle", text: "Fotos, cursos, instrutores e depoimentos editáveis por você, sem depender de programador." },
  { title: "Achável no Google", text: "SEO local bem feito pra aparecer em buscas por escola de música em Caraguatatuba." },
];

const ENTREGA = [
  "5 páginas: Início, Cursos, Instrutores, A Escola e Contato",
  "Hero com carrossel das suas melhores fotos",
  "Formulário de agendamento que avisa a escola por e-mail + WhatsApp",
  "Painel de conteúdo (Sanity) pra você editar tudo",
  "100% responsivo (celular) e rápido",
];

export default function PropostaPage() {
  return (
    <main className="mx-auto">
      {/* topo */}
      <div className="border-b border-line">
        <Container className="flex items-center justify-between py-6">
          <span className="font-display text-xl font-black">
            E<span className="text-gold">-</span>Brasil
          </span>
          <span className="font-detail text-xs uppercase tracking-[0.2em] text-muted">
            Proposta
          </span>
        </Container>
      </div>

      {/* hero */}
      <section className="py-16 md:py-24">
        <Container>
          <Badge>Proposta de site · E-Brasil</Badge>
          <Heading as="h1" size="hero" className="mt-4 max-w-3xl">
            Um site à altura da sua escola
          </Heading>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Uma presença digital moderna, que transforma indicação em matrícula e
            coloca a E-Brasil onde ela merece estar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" variant="gold" size="lg">
              Ver a demonstração ao vivo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            <em>(Conteúdo desta proposta a finalizar — valores, prazo e condições.)</em>
          </p>
        </Container>
      </section>

      {/* valor */}
      <section className="border-t border-line py-16">
        <Container>
          <Heading className="max-w-2xl">Por que vale a pena</Heading>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {VALOR.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-gold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* entrega */}
      <section className="border-t border-line py-16">
        <Container>
          <Heading className="max-w-2xl">O que está incluído</Heading>
          <ul className="mt-8 grid max-w-2xl gap-3">
            {ENTREGA.map((e) => (
              <li key={e} className="flex items-start gap-3 text-ink/90">
                <span className="mt-1 text-gold">✓</span>
                {e}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* próximos passos */}
      <section className="border-t border-line py-16">
        <Container>
          <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-surface to-night p-10 text-center md:p-16">
            <Heading as="h2" size="section" className="mx-auto max-w-2xl">
              Vamos tirar do papel?
            </Heading>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Investimento, prazo e próximos passos — a combinar.
            </p>
            <div className="mt-8">
              <Button href="/" variant="gold" size="lg">
                Explorar a demonstração
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
