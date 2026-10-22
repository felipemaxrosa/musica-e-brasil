import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Escola de Música E-Brasil coleta, usa e protege seus dados pessoais (LGPD).",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero eyebrow="LGPD" title="Política de Privacidade" />
      <Section>
        <article className="max-w-3xl space-y-6 leading-relaxed text-ink/80 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-8">
          <p className="text-sm text-muted">
            <strong>Modelo inicial</strong> — recomendamos revisão jurídica antes da publicação definitiva.
          </p>

          <p>
            A {SITE.name} (&quot;E-Brasil&quot;, &quot;nós&quot;) valoriza a sua privacidade. Esta política
            explica como tratamos os dados pessoais coletados neste site, em conformidade com a
            Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>Quais dados coletamos</h2>
          <p>
            Coletamos os dados que você informa no formulário de agendamento: nome do responsável,
            nome do aluno (quando aplicável), telefone/WhatsApp, e-mail (opcional), instrumento de
            interesse, modalidade, melhor horário e mensagem. Quando o aluno é criança ou
            adolescente, os dados são fornecidos e consentidos pelo responsável legal.
          </p>

          <h2>Para que usamos</h2>
          <p>
            Usamos seus dados exclusivamente para entrar em contato, agendar a aula experimental e
            responder à sua solicitação. Não vendemos nem compartilhamos seus dados para fins de
            marketing de terceiros.
          </p>

          <h2>Base legal</h2>
          <p>
            O tratamento é feito com base no seu <strong>consentimento</strong> (art. 7º, I da LGPD),
            manifestado ao enviar o formulário, e no legítimo interesse de responder ao seu contato.
          </p>

          <h2>Com quem compartilhamos</h2>
          <p>
            Utilizamos provedores que atuam como operadores de dados apenas para viabilizar o serviço
            (por exemplo, armazenamento do pedido e envio de e-mail de notificação à escola). Esses
            provedores tratam os dados sob nossas instruções.
          </p>

          <h2>Dados de crianças e adolescentes</h2>
          <p>
            Dados de menores são coletados no melhor interesse do titular e somente com o
            consentimento do responsável legal, conforme o art. 14 da LGPD.
          </p>

          <h2>Seus direitos</h2>
          <p>
            Você pode solicitar a qualquer momento o acesso, a correção, a exclusão ou a portabilidade
            dos seus dados, bem como revogar o consentimento. Para isso, fale com a gente pelos canais
            de contato abaixo.
          </p>

          <h2>Contato</h2>
          <p>
            Dúvidas sobre esta política ou sobre seus dados? Fale com a E-Brasil pelo WhatsApp
            {SITE.phone ? ` ou pelo telefone ${SITE.phone}` : ""}.
          </p>

          <p className="text-sm text-muted">Última atualização: outubro de 2026.</p>
        </article>
      </Section>
    </>
  );
}
