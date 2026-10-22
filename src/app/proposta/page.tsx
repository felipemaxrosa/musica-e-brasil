import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/** /proposta — pitch comercial à E-Brasil (noindex, fora do menu). */

const VANTAGENS = [
  {
    title: "Design novo e profissional",
    text: "Um visual premium, no tom que a E-Brasil já tem: tradição desde 2006 + cara de quem é referência no Litoral Norte.",
  },
  {
    title: "Encontrável no Google (SEO)",
    text: "Preparado pra aparecer em buscas como “escola de música em Caraguatatuba” — quem procura, acha vocês.",
  },
  {
    title: "Feito pra converter",
    text: "Cada seção empurra o visitante pro próximo passo: agendar a aula experimental, pelo WhatsApp ou pelo formulário.",
  },
  {
    title: "Vocês no controle",
    text: "Fotos, textos, cursos e professores editáveis — o site acompanha a escola, sem depender de ninguém.",
  },
];

export default function PropostaPage() {
  return (
    <main>
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

      {/* hero amigável */}
      <section className="py-16 md:py-24">
        <Container>
          <Badge>Proposta · feita com carinho</Badge>
          <p className="mt-5 text-lg text-gold">Oi, Daniel e Kleber! 👋</p>
          <Heading as="h1" size="hero" className="mt-3 max-w-3xl">
            Um site à altura da maior escola de música do Litoral Norte
          </Heading>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Vocês já têm a estrutura, o nome e a história. Faltava a presença
            digital no mesmo nível — moderna, profissional e que transforma
            indicação em matrícula. Eu montei uma demonstração ao vivo pra
            vocês sentirem na prática.
          </p>
          <div className="mt-8">
            <Button href="/" variant="gold" size="lg">
              Ver o site ao vivo
            </Button>
          </div>
        </Container>
      </section>

      {/* vantagens */}
      <section className="border-t border-line py-16">
        <Container>
          <Heading className="max-w-2xl">Por que vale a pena ter esse site</Heading>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {VANTAGENS.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-gold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* o que é / o que não é */}
      <section className="border-t border-line py-16">
        <Container>
          <Badge>Pra deixar claro</Badge>
          <Heading className="mt-3 max-w-2xl">
            É uma <em className="italic font-medium text-gold">landing page</em> de conversão
          </Heading>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            O objetivo é apresentar a escola e trazer alunos — rápido, bonito e
            direto ao ponto. <strong className="text-ink">Não é uma plataforma
            de cursos online</strong>: não tem login de aluno, aulas gravadas
            nem venda de curso pela internet. É a vitrine da E-Brasil, que vende
            a experiência presencial e online ao vivo que vocês já oferecem tão bem.
          </p>
        </Container>
      </section>

      {/* e-mail de agendamento */}
      <section className="border-t border-line py-16">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Badge>Sem perder nenhum aluno</Badge>
              <Heading className="mt-3">Cada agendamento chega direto pra vocês</Heading>
              <p className="mt-4 leading-relaxed text-muted">
                Assim que alguém preenche o formulário, vocês recebem na hora um
                e-mail organizado com os dados do interessado — e um botão que já
                abre o WhatsApp dele pra responder em segundos.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Dados do aluno, instrumento e melhor horário, prontinhos.",
                  "Botão “Responder no WhatsApp” já com o número certo.",
                  "Nada se perde: cada pedido também fica salvo no painel.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-ink/90">
                    <span className="mt-0.5 text-gold">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <Image
                src="/proposta/email-exemplo.png"
                alt="Exemplo do e-mail que a escola recebe quando alguém agenda uma aula experimental"
                width={1360}
                height={1544}
                className="rounded-2xl border border-line shadow-2xl"
              />
              <p className="mt-3 text-center text-xs text-muted">
                Exemplo real do e-mail de agendamento.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* planos */}
      <section className="border-t border-line py-16">
        <Container>
          <Heading className="max-w-2xl">Dois jeitos de fazer</Heading>
          <p className="mt-3 max-w-2xl text-muted">
            Os dois já incluem ajustar o site com as fotos e os textos reais de vocês.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Plano 1 — com manutenção (destaque) */}
            <div className="relative rounded-3xl border-2 border-gold/60 bg-surface p-8">
              <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-xs font-bold text-[#1a1407]">
                Recomendado
              </span>
              <h3 className="font-display text-2xl font-bold text-ink">Site + Manutenção</h3>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-lg text-muted line-through">R$ 2.000</span>
                <span className="font-display text-4xl font-black text-gold">R$ 1.750</span>
              </div>
              <p className="mt-1 text-sm text-muted">pagamento único (entrega do site)</p>

              <div className="mt-5 rounded-xl border border-line bg-night p-4">
                <div className="font-display text-xl font-bold text-ink">+ R$ 140<span className="text-base font-normal text-muted">/mês</span></div>
                <p className="mt-1 text-sm text-muted">
                  Manutenção: pequenas atualizações (textos, fotos e ajustes), com
                  <strong className="text-ink"> uma rodada de ajustes por semana</strong> inclusa.
                </p>
              </div>

              <p className="mt-5 text-sm text-muted">
                Ideal pra manter o site sempre fresco, sem vocês se preocuparem com nada técnico.
              </p>
            </div>

            {/* Plano 2 — avulso */}
            <div className="rounded-3xl border border-line bg-surface p-8">
              <h3 className="font-display text-2xl font-bold text-ink">Site avulso</h3>
              <div className="mt-4">
                <span className="font-display text-4xl font-black text-ink">R$ 2.250</span>
              </div>
              <p className="mt-1 text-sm text-muted">pagamento único, sem mensalidade</p>

              <div className="mt-5 rounded-xl border border-line bg-night p-4">
                <div className="font-display text-xl font-bold text-ink">Ajustes avulsos</div>
                <p className="mt-1 text-sm text-muted">
                  Precisou mexer depois (textos, fotos, ajustes simples)? Cobro
                  <strong className="text-ink"> R$ 250</strong> por ajuste, só quando precisar.
                </p>
              </div>

              <p className="mt-5 text-sm text-muted">
                Ideal se vocês preferem mexer pouco e pagar só quando houver mudança.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* fechamento */}
      <section className="border-t border-line py-16">
        <Container>
          <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-surface to-night p-10 text-center md:p-16">
            <Heading as="h2" size="section" className="mx-auto max-w-2xl">
              Bora colocar a E-Brasil ainda mais no topo?
            </Heading>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Já trabalhei aí e sei o tamanho dessa escola. Dá uma navegada na
              demo, sente o resultado, e me chama — a gente ajusta o que for
              preciso. 🎸
            </p>
            <div className="mt-8">
              <Button href="/" variant="gold" size="lg">
                Explorar o site ao vivo
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
