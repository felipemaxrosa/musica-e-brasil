# Design — Novo site da Escola de Música E-Brasil

**Data:** 2026-10-21
**Autor:** Felipe (frontend engineer) + Claude (brainstorming)
**Status:** aguardando aprovação

---

## 1. Intenção e o "porquê"

A E-Brasil é a maior escola de música do Litoral Norte Paulista (Caraguatatuba),
fundada em 2006, com ~3 mil alunos ao longo da história. O site atual é um
one-pager WordPress (tema OnePress) datado e pouco orientado à conversão.

Queremos um **site novo, moderno e focado em conversão de leads**. O público
principal são **pais que chegam por indicação** (de outro aluno, de um pai, ou
boca a boca) — ou seja, um público **"morno"**: já chega com confiança. O site
não precisa convencer do zero; precisa **dar segurança rápida** ("sim, é isso
que me falaram") e **tornar o próximo passo óbvio e fácil**.

**Resultado esperado:** mais agendamentos de **aula experimental**, via
**WhatsApp (CTA principal)** e via **formulário que dispara um e-mail** (CTA
secundário). O conteúdo (principalmente fotos) deve ser **editável pela escola
no Sanity**, sem depender de programador.

> Nota de escopo: este projeto é da **E-Brasil (todas as idades)**. A
> **E-Brasil Kids** será um projeto separado no futuro.

## 2. Goals / Non-goals / Anti-goals

**Goals**
- Converter visitantes mornos em agendamentos de aula experimental (WhatsApp + formulário→e-mail).
- Transmitir credibilidade/tradição (desde 2006, +3 mil alunos, palco/eventos, professores).
- Conteúdo editável no Sanity (fotos do hero, cursos, instrutores, depoimentos, galeria, FAQ, textos, dados de contato).
- Excelente **SEO** (busca local "escola de música Caraguatatuba") e **performance** (Lighthouse 90+).
- Visual moderno com transições suaves entre seções.

**Non-goals (v1)**
- E-Brasil Kids (projeto futuro).
- Loja E-Brasil Instrumentos / e-commerce.
- Área do aluno / login / pagamento online.
- Multi-idioma (só pt-BR).
- Blog (pode entrar em fase 2 por SEO; fora do v1).
- Página por instrumento (seções/cards por ora; dá pra criar depois p/ SEO).

**Anti-goals (o que tornaria isto um fracasso mesmo "funcionando")**
- Carrossel que desloca texto+CTA e esconde a conversão.
- Site bonito mas lento (hero pesado, imagens não otimizadas) → perde no mobile e no SEO.
- CMS confuso que a escola não consegue editar sozinha.
- Excesso de animação que distrai do CTA ou ignora `prefers-reduced-motion`.

## 3. Direção visual (decidida)

**Direção C — "Palco escuro / sofisticado".** Clima premium, "aqui você vai brilhar".

- **Paleta:** near-black `#0A0A0C` base; dourado `#E8C87E`/`#CDA948` (acento); texto claro `#F4EFE3`; verde WhatsApp `#1F9D55` nos CTAs de conversão.
- **Tipografia (Google Fonts, otimizadas via `next/font`):**
  - Títulos: **Playfair Display** (serifada elegante, expressiva).
  - Detalhes/kickers: **Marcellus** (romana, clima de "cartaz de show").
  - Corpo/UI: **Inter**.
- **Hero da home:** **carrossel de fundo** com crossfade (fade + leve Ken Burns)
  entre **4 fotos**; **texto e CTA ficam fixos**. Troca ~5s, pausa no hover,
  dots + setas, respeita `prefers-reduced-motion` (estático). Imagens vêm do
  **Sanity** (lista ordenável). **Fonte inicial:** fotos existentes (Instagram
  @escola_ebrasil + galeria atual), tratadas/recortadas com o scrim escuro
  dourado p/ uniformizar; se o material for fraco demais, recomendo um ensaio
  antes do launch (a direção C depende de imagem forte, que é o LCP do hero).
- **Transições de seção:** reveal suave ao rolar (fade/translate curto),
  reduced-motion-aware, com custo de JS mínimo.

Protótipos validados pelo cliente estão em `.superpowers/brainstorm/` (hero-C-carousel-v2, sitemap-v2).

## 4. Arquitetura de informação (decidida)

5 páginas públicas (cada uma com um trabalho só) + `/proposta` separada. Header
fixo com **WhatsApp** + **Agendar aula** em todas; toda página termina puxando pro CTA.

| Rota | Página | Trabalho |
|------|--------|----------|
| `/` | Início | Convencer rápido → agendar. Hero, números, resumo de cursos, "como funciona a experimental", destaque palco/eventos, instrutores em destaque, depoimentos, CTA final. |
| `/cursos` | Cursos & Modalidades | Canto, Violão, Guitarra, Teclado, Contrabaixo, Bateria + extras (bandas, teoria, "Minha Banda é Top") + presencial×online, personal×grupo. |
| `/instrutores` | Instrutores | Grid de professores (foto, nome, instrumento, mini bio), filtro por instrumento, "+15 professores". |
| `/a-escola` | A Escola | História (desde 2006), diferenciais, estrutura, eventos "Especial E-Brasil", vídeo institucional, galeria. |
| `/contato` | Agende sua Aula | Formulário→e-mail, WhatsApp, FAQ (idade/valores/horários), endereço+mapa, horários, redes. |
| `/proposta` | Proposta comercial | **Fora do menu, `noindex`.** Detalhes a definir (seção 9). |

Menu: Início · Cursos · Instrutores · A Escola · Contato + [WhatsApp] [Agendar aula].

**Páginas utilitárias (fora do menu principal, link no rodapé):**
- `/privacidade` — **Política de Privacidade (LGPD)**. Necessária porque o formulário coleta dados pessoais, inclusive de menores. Linkada no rodapé e no checkbox de consentimento do formulário. Texto jurídico fornecido/revisado pelo cliente (começo com um modelo).

## 5. Stack e decisões técnicas (defaults do builder — minhas chamadas)

- **Next.js (App Router, v15+) + TypeScript + Tailwind CSS.** Escolhido por SEO (Metadata API, SSG/ISR, RSC) e performance (RSC, streaming, `next/image`).
- **Sanity** como CMS headless, **projeto novo e dedicado** à E-Brasil (schema limpo; não compartilhar dataset/schema com o outro projeto do cliente). Studio **embarcado em `/studio`** no mesmo app. Dados via `next-sanity` + GROQ. Imagens via **Sanity CDN + `next/image`** (loader do Sanity, `sizes` responsivos, blur placeholder via LQIP). Revalidação por **ISR + webhook** do Sanity.
- **Formulário → lead + e-mail:** Route Handler `app/api/agendar/route.ts`. Validação com **Zod**; anti-spam com **honeypot + rate-limit** simples. Como o domínio é **temporário (Vercel)** por ora e o Resend exige domínio verificado, **a fonte primária do agendamento é um doc `lead` no Sanity** (nada se perde), e o **Resend** envia a notificação via remetente de teste (`onboarding@resend.dev`) até apontarmos o domínio real — aí verificamos SPF/DKIM, trocamos o `From` e `CONTACT_TO_EMAIL` passa a receber com boa entregabilidade.
- **Hospedagem:** **Vercel** (hobby/free), melhor fit p/ Next (edge, ISR, imagens, analytics).
- **Animações:** CSS/IntersectionObserver para reveals; **Framer Motion (`motion`)** pontual onde agrega. Sempre reduced-motion-aware. Client components mínimos (hero carousel, menu mobile, formulário, reveals).
- **Analytics:** Vercel Analytics (privacy-friendly) + evento de conversão nos cliques de WhatsApp e no submit do formulário.

## 6. SEO (requisito)

- `generateMetadata` por página: `<title>`, description, canonical, Open Graph + Twitter Card, imagem OG.
- `lang="pt-BR"`; HTML semântico (`header/main/section/footer`, headings hierárquicos, `alt` em todas as imagens vindas do Sanity).
- **JSON-LD structured data:** `MusicSchool`/`LocalBusiness` com `name` = **"Escola de Música E-Brasil"** (nome oficial do site; o rótulo "E-Brazil - Studio and Music School" do Google Maps é usado só p/ geolocalizar o pino, nunca como marca), `address` (Caraguatatuba), `geo` (-23.6202507, -45.4093475), `telephone`, `openingHours`, `sameAs` (Instagram/Facebook/YouTube). `BreadcrumbList` nas internas. `FAQPage` na seção de FAQ.
  - **Não** marcar depoimentos próprios como `review`/`aggregateRating` (self-serving → inelegível/penalizável pelo Google). Depoimentos ficam como conteúdo visual; estrelas reais, se desejado, vêm do Google Business (link/embed), não do nosso markup.
- `app/sitemap.ts` (sitemap.xml) e `app/robots.ts` (permitir tudo exceto `/studio` e `/proposta`).
- Foco em **SEO local**: termos "escola de música Caraguatatuba / Litoral Norte", NAP consistente, link pro Google Business.
- `/proposta`: `robots: noindex, nofollow`.

## 7. Performance (requisito) — alvo Lighthouse ≥ 90 (mobile)

- RSC por padrão; JS de cliente só onde necessário.
- `next/image` com `sizes` corretos, formatos modernos (AVIF/WebP), `priority` só no 1º slide do hero, `loading=lazy` + blur (LQIP) no resto.
- Fontes via `next/font` (self-host, `display: swap`, subset latino).
- Páginas estáticas + ISR; sem libs pesadas desnecessárias.
- Pré-carregar só o 1º slide do hero; demais entram sob demanda. Respeitar `prefers-reduced-motion` (sem autoplay/zoom).
- Budget: evitar CLS (dimensões fixas de imagem), LCP = título/1ª imagem do hero.

## 8. Modelo de conteúdo no Sanity (editável pela escola)

- **siteSettings** (singleton): logo, whatsappNumber, telefone, email, endereço (texto), geo, horários, redes (IG/FB/YT), textos globais do CTA.
- **heroSlide:** imagem (+alt), ordem, ativo. (lista do carrossel)
- **course:** nome, instrumento/ícone, descrição, modalidades (presencial/online/personal/grupo), ordem.
- **instructor:** nome, foto, instrumentos[], mini bio (Portable Text), destaque (bool p/ home), ordem.
- **testimonial:** nome, relação (pai/mãe/aluno), texto, foto (opcional), nota, ordem.
- **galleryImage:** imagem (+alt), legenda, evento/ano, ordem.
- **faqItem:** pergunta, resposta (Portable Text), ordem.
- **pageSection / textos:** blocos de copy editáveis (história, diferenciais, "como funciona") em Portable Text.
- (opcional) **lead:** registro das solicitações do formulário (histórico).

Formulário de agendamento — **campos default:** nome do responsável, nome do
aluno (opcional), WhatsApp/telefone, "aluno é criança ou adulto", instrumento de
interesse (select), modalidade (presencial/online), melhor horário (manhã/tarde/
noite ou texto), mensagem (opcional), consentimento LGPD. → e-mail formatado +
(opcional) doc `lead` no Sanity + redirect/toast de sucesso + link WhatsApp.

## 9. O que fica em aberto / a cargo do builder

**Confirmado (2026-10-21):** domínio **temporário (Vercel)** por ora → lead no Sanity é a fonte primária do form; **fotos iniciais** das redes/galeria atual (@escola_ebrasil); **Sanity free, 1–2 editores**, Studio em `/studio`. Marca/nome oficial = **"Escola de Música E-Brasil"**.

**Precisa do cliente (não bloqueiam começar; viram env/placeholder):**
- **E-mail de destino** do formulário (`CONTACT_TO_EMAIL`).
- **Número oficial de WhatsApp** p/ CTA (default assumido: (12) 99715-0806; fixo (12) 3881-2335).
- **Endereço textual exato** em Caraguatatuba (temos nome no Google + coords).
- **Dados reais de instrutores/depoimentos/cursos** (começamos com exemplos/seed; escola edita no Sanity).
- Credenciais do **Sanity** (projeto novo) e da **Resend**; domínio/deploy na Vercel.
- **Conteúdo da `/proposta`** (proposta comercial — Felipe passa os detalhes).

**Decisões do builder (livres):** nomes exatos dos schemas/campos, estrutura de
pastas, componentização, nomes de tokens de design, microcopy, ícones.

## 10. Verificação (como validar de ponta a ponta)

- `npm run dev` → navegar as 5 páginas + `/studio`; editar um heroSlide no Studio e ver refletir.
- Lighthouse mobile em `/` e `/cursos` → Performance e SEO ≥ 90; checar LCP/CLS.
- Testar formulário → receber e-mail (Resend) no endereço de teste; validar erros (Zod) e honeypot.
- Testar CTA WhatsApp (deep link com mensagem pré-preenchida).
- `prefers-reduced-motion` ligado → hero estático, sem reveals bruscos.
- Ver `/sitemap.xml`, `/robots.txt`, e JSON-LD (Rich Results Test). `/proposta` com `noindex`.
- Responsivo: 360px, 768px, 1280px.
```
