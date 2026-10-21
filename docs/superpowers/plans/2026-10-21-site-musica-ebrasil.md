# Site Escola de Música E-Brasil — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um site moderno e orientado à conversão para a Escola de Música E-Brasil (Next.js + Sanity), com conteúdo editável pela escola, + uma página `/proposta` comercial.

**Architecture:** Next.js App Router renderiza páginas estáticas + ISR a partir de conteúdo do Sanity (Studio embarcado em `/studio`). Server Components por padrão; client components só no hero (carrossel), menu mobile, filtro de instrutores, reveals e formulário. Formulário grava um `lead` no Sanity (fonte primária) e notifica por e-mail via Resend. Deploy na Vercel (domínio temporário `*.vercel.app`).

**Tech Stack:** Next 16 (App Router, React 19, Turbopack), TypeScript, Tailwind v4 (`@theme`), next-sanity 13 + Sanity 6 (Studio embutido), `@sanity/image-url`, `@portabletext/react`, Resend, Zod, Framer Motion (pontual), `next/font`.

**Spec:** `docs/superpowers/specs/2026-10-21-site-musica-ebrasil-design.md` (ler junto com este plano). Espelha as convenções do projeto `a-casa-barbearia` (`~/.claude/plans/quero-oferecer-um-site-smooth-floyd.md`).

## Global Constraints

- **Next.js 16 App Router**, TypeScript `strict`, `src/` + alias `@/*`, sem "Cache Components".
- **Tailwind v4**: tokens em `src/app/globals.css @theme`, sem `tailwind.config.ts`.
- **Fontes via `next/font`** (self-host): Playfair Display (display), Marcellus (detalhe), Inter (corpo), subset `latin`.
- **Idioma:** `<html lang="pt-BR">`. Marca/nome oficial em texto e JSON-LD: **"Escola de Música E-Brasil"** (nunca "E-Brazil - Studio and Music School").
- **Git:** repo `github.com/felipemaxrosa/musica-e-brasil`; remoto `git@personal-github.com:felipemaxrosa/musica-e-brasil.git`; repo-local `user.email=felipemax.suporteti@gmail.com`, `user.name="Felipe Rosa"`; trabalhar em **`dev`** (ramo de `main`); commits terminam com `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`; PRs terminam com `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- **Env:** `NEXT_PUBLIC_SITE_URL` (URL Vercel por ora), `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN` (server), `SANITY_API_WRITE_TOKEN` (server, p/ lead), `RESEND_API_KEY`, `CONTACT_TO_EMAIL`. Tudo em `.env.local` (gitignored) + `.env.example`.
- **Performance:** alvo Lighthouse mobile ≥ 90; `next/image` + loader Sanity (`sizes`, `priority` só no 1º slide do hero), sem CLS (dimensões fixas), `preconnect` a `cdn.sanity.io`.
- **Acessibilidade/Movimento:** WCAG AA; **respeitar `prefers-reduced-motion`** (hero estático, sem reveals bruscos).
- **noindex:** `/studio` e `/proposta`. `/privacidade` fica indexável.

## Review Focus

- **Formulário com entrada inválida/spam:** telefone/e-mail malformado, campos vazios, bot preenchendo honeypot → a API rejeita (400) sem criar lead nem enviar e-mail; usuário vê erro claro. (Task 8)
- **Conteúdo ausente no Sanity:** seções sem itens (0 depoimentos, 0 instrutores, hero sem slides) → render com estado vazio elegante/fallback, nunca quebra nem layout vazio. (Tasks 4–8)
- **`prefers-reduced-motion`:** carrossel não autoplay e sem Ken Burns; reveals aparecem sem animação. (Tasks 1, 4)
- **Deep link WhatsApp:** mensagem com acentos/emoji corretamente `encodeURIComponent`; número só dígitos. (Task 3)
- **Imagens do Sanity:** sempre com `alt`; `width/height`/`sizes` definidos p/ evitar CLS no hero (LCP). (Tasks 2, 4)

---

### Task 0: Scaffold, git pessoal e serviços

**Files:**
- Create: projeto via `create-next-app` em `/Users/feliperosa/projects/max-solutions/musica-e-brasil` (raiz atual já contém `docs/`).
- Create: `.env.example`, `.gitignore` (inclui `.env.local`, `.superpowers/`).

**Interfaces:**
- Produces: app Next rodando; repo no remoto pessoal; projetos Vercel e Sanity criados (IDs p/ env).

- [ ] **Step 1:** `npx create-next-app@latest` com: TypeScript, ESLint, Tailwind, `src/`, App Router, Turbopack, alias `@/*`, **sem** Cache Components. Fixar versões verificadas (next 16.4.x, react 19.3.x) — reconferir `npm view` no ato.
- [ ] **Step 2:** `git init`; `git remote add origin git@personal-github.com:felipemaxrosa/musica-e-brasil.git`; `git config user.name "Felipe Rosa"`; `git config user.email felipemax.suporteti@gmail.com`.
- [ ] **Step 3:** Criar `.env.example` com todas as chaves da seção Global Constraints (valores vazios/placeholder).
- [ ] **Step 4:** Criar projeto **Sanity** (free, conta pessoal, dataset `production`) e projeto **Vercel** ligado ao repo. Guardar `projectId` e URL Vercel em `.env.local`.
- [ ] **Step 5 (verify):** `npm run dev` serve a home padrão em `localhost:3000`.
- [ ] **Step 6:** `git checkout -b dev`; primeiro commit; `git push -u origin dev`.
  - Verify: `git remote -v` aponta p/ `personal-github.com`; branch `dev` no GitHub sob `felipemaxrosa`.

### Task 1: Design system + chrome (Header/Footer/Nav)

**Files:**
- Modify: `src/app/layout.tsx` (lang pt-BR, next/font, `metadataBase`), `src/app/globals.css` (`@theme` tokens C).
- Create: `src/components/ui/{Container,Section,Button,Heading,Badge}.tsx`, `src/components/layout/{Header,Footer,Nav,MobileNav}.tsx`, `src/components/motion/Reveal.tsx`, `src/app/not-found.tsx`, `src/lib/constants.ts`.

**Interfaces:**
- Produces: tokens de cor/tipografia; `<Reveal>` (client, reduced-motion aware); `<Header/>` sticky com CTAs WhatsApp + "Agendar aula"; `navLinks` em `constants.ts` (Início, Cursos, Instrutores, A Escola, Contato).

- [ ] **Step 1:** Tokens `@theme` no `globals.css` (paleta direção C): `--color-base:#0A0A0C`, `--color-surface`, `--color-ink:#F4EFE3`, `--color-gold:#E8C87E`, `--color-gold-deep:#CDA948`, `--color-wa:#1F9D55`, `--font-display/detail/sans`. Garantir contraste AA do texto sobre base.
- [ ] **Step 2:** `next/font` (Playfair Display, Marcellus, Inter) no root layout com `display:swap`.
- [ ] **Step 3:** Primitivos UI + `Header` (sticky, nav desktop, `MobileNav` acessível com teclado/focus) + `Footer` (redes, horários, **link `/privacidade`**).
- [ ] **Step 4:** `<Reveal>` — IntersectionObserver fade/translate curto; sem animação quando `prefers-reduced-motion`.
- [ ] **Step 5 (verify):** `npm run build` limpo; Chrome MCP: shell escuro/dourado, nav fixa, menu mobile abre/fecha por teclado, `prefers-reduced-motion` desliga reveals.

### Task 2: Sanity (Studio, schema, seed)

**Files:**
- Create: `sanity.config.ts`, `sanity.cli.ts`, `src/sanity/env.ts`, `src/sanity/structure.ts`, `src/sanity/lib/{client,live,image}.ts`, `src/app/studio/[[...tool]]/page.tsx`, `src/sanity/schemaTypes/index.ts` + `documents/*` + `objects/*`.

**Interfaces:**
- Produces: schemas — **siteSettings**(★ singleton), **heroSlide**, **course**, **instructor**, **testimonial**, **galleryImage**, **faqItem**, **sectionText**, **lead**; objetos `address`, `openingHours`, `socialLinks`, `seo`. `sanityFetch` + `<SanityLive/>` de `live.ts`; `urlFor` de `image.ts`.

- [ ] **Step 1:** Instalar `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`, `@portabletext/react`, `styled-components`.
- [ ] **Step 2:** `env.ts`, `client.ts`, `live.ts` (`defineLive()`), `image.ts`; `sanity.config.ts` + `sanity.cli.ts`; `/studio` com `export const dynamic = "force-static"`.
- [ ] **Step 3:** Definir schemas (campos conforme spec §8). `instructor`: nome, foto(alt+hotspot), instrumentos[], bio(PortableText), destaque(bool), ordem. `heroSlide`: imagem(alt), ordem, ativo. `lead`: nome, aluno, telefone, instrumento, modalidade, horário, mensagem, criadoEm, origem.
- [ ] **Step 4:** `structure.ts` com singleton `siteSettings`; seed de conteúdo demo (incl. 4 heroSlides com fotos atuais tratadas, cursos dos 6 instrumentos, instrutores exemplo, FAQ).
- [ ] **Step 5 (verify):** `/studio` abre e edita; query GROQ via Vision retorna dados.

### Task 3: lib — WhatsApp + queries tipadas

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/sanity/lib/queries.ts`, `src/lib/whatsapp.test.ts`.

**Interfaces:**
- Produces: `buildWhatsappUrl(message: string): string` (número de `siteSettings`/env, só dígitos, `encodeURIComponent`); `defineQuery` GROQ tipadas (home, cursos, instrutores, escola, contato, settings).

- [ ] **Step 1 (test):** `whatsapp.test.ts` — `buildWhatsappUrl("Olá! Tenho interesse")` retorna `https://wa.me/55129...?text=Ol%C3%A1!%20Tenho%20interesse`; garante que acentos são escapados e o número tem só dígitos.
- [ ] **Step 2 (verify fail):** `npm test` → falha (função inexistente).
- [ ] **Step 3:** Implementar `buildWhatsappUrl`.
- [ ] **Step 4 (verify):** `npm test` passa.
- [ ] **Step 5:** `queries.ts` com `defineQuery()` por página. Commit.

### Task 4: Home (`/`) + seções

**Files:**
- Create: `src/app/(site)/layout.tsx` (chrome + `<SanityLive/>`), `src/app/(site)/page.tsx`, `src/components/sections/{HeroCarousel,Stats,CoursesPreview,HowItWorks,StageHighlight,InstructorsFeatured,Testimonials,FinalCTA}.tsx`.

**Interfaces:**
- Consumes: queries (Task 3), `urlFor`, `<Reveal>`, `buildWhatsappUrl`.
- Produces: `HeroCarousel` (client) — crossfade de fundo entre `heroSlide[]`, **texto/CTA fixos**, dots/setas, pausa no hover, `priority` no 1º slide, estático em reduced-motion.

- [ ] **Step 1:** Montar seções consumindo Sanity; estados vazios elegantes quando a lista vier vazia (Review Focus). Inclui a **seção de Depoimentos** (`Testimonials`) — 2–3 `testimonial[]` em destaque (nome, relação pai/mãe/aluno, citação), prova social crucial para o público de indicação; se não houver depoimentos cadastrados, a seção se oculta.
- [ ] **Step 2:** `HeroCarousel` portando o protótipo validado (`.superpowers/brainstorm/.../hero-C-carousel-v2.html`) para React + `next/image`.
- [ ] **Step 3 (verify):** Chrome MCP mobile+desktop: hero faz crossfade, texto fixo, CTA WhatsApp abre deep link; com `prefers-reduced-motion` o hero fica estático; sem CLS.

### Task 5: `/cursos`

**Files:** Create `src/app/(site)/cursos/page.tsx`, `src/components/sections/CourseGrid.tsx`.
- [ ] **Step 1:** Grid de `course` (6 instrumentos + extras), selos presencial/online, personal/grupo; CTA agendar. Estado vazio seguro.
- [ ] **Step 2 (verify):** build limpo; Chrome MCP mostra os cursos do Sanity; responsivo.

### Task 6: `/instrutores`

**Files:** Create `src/app/(site)/instrutores/page.tsx`, `src/components/sections/InstructorGrid.tsx` (client — filtro por instrumento).
- [ ] **Step 1:** Grid de `instructor` (foto, nome, instrumento, mini bio); filtro client por instrumento; CTA "agendar com a equipe". Estado vazio.
- [ ] **Step 2 (verify):** Chrome MCP: filtro funciona por teclado; grid responsivo; dados do Sanity.

### Task 7: `/a-escola`

**Files:** Create `src/app/(site)/a-escola/page.tsx`, `src/components/sections/{Story,Differentiators,VideoEmbed,Gallery}.tsx`.
- [ ] **Step 1:** História (PortableText de `sectionText`), diferenciais, estrutura, eventos "Especial E-Brasil", vídeo institucional (iframe `lazy`), galeria (`galleryImage[]` com `next/image`). CTA final.
- [ ] **Step 2 (verify):** Chrome MCP: conteúdo do Sanity; vídeo e galeria carregam lazy; responsivo.

### Task 8: `/contato` + formulário + API (lead + e-mail)

**Files:**
- Create: `src/app/(site)/contato/page.tsx`, `src/components/sections/{AgendarForm,Faq,MapEmbed}.tsx`, `src/app/api/agendar/route.ts`, `src/lib/agendar-schema.ts`, `src/lib/agendar-schema.test.ts`, `src/app/api/agendar/route.test.ts`.

**Interfaces:**
- Consumes: `siteSettings` (endereço/geo/horários), `faqItem[]`.
- Produces: `AgendarSchema` (Zod) — campos da spec §8 + honeypot; `POST /api/agendar` → valida, cria doc `lead` no Sanity (write token), envia e-mail Resend; responde `{ok}` ou `400`.

- [ ] **Step 1 (test):** `agendar-schema.test.ts` — aceita payload válido; rejeita telefone vazio, e-mail malformado e **honeypot preenchido**.
- [ ] **Step 2 (verify fail):** `npm test` falha.
- [ ] **Step 3:** Implementar `AgendarSchema` (Zod).
- [ ] **Step 4 (test):** `route.test.ts` — honeypot/inválido → 400 sem criar lead/enviar; válido → chama criação de lead e envio (mocks).
- [ ] **Step 5:** Implementar `route.ts` (Zod → Sanity create `lead` → Resend) + `AgendarForm` (client, estados de erro/sucesso, link `/privacidade` no consentimento) + `Faq` (acordeão acessível) + `MapEmbed` (iframe lazy nas coords -23.6202507,-45.4093475).
- [ ] **Step 6 (verify):** `npm test` passa; Chrome MCP: enviar form cria `lead` no Studio e dispara e-mail de teste; inválido mostra erro; FAQ abre por teclado.

### Task 9: SEO (metadata, JSON-LD, sitemap, robots, OG)

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/app/icon.svg`, `src/components/seo/JsonLd.tsx`; Modify cada `page.tsx` (`generateMetadata`).

**Interfaces:**
- Produces: `<JsonLd/>` — `MusicSchool`/`LocalBusiness` (name "Escola de Música E-Brasil", address Caraguatatuba, `geo`, `telephone`, `openingHours`, `sameAs`), `FAQPage` em `/contato`, `BreadcrumbList` nas internas. **Sem** `review`/`aggregateRating`.

- [ ] **Step 1:** `metadataBase` de `NEXT_PUBLIC_SITE_URL`; `generateMetadata` por página (title/description pt-BR, canonical, OG). `/proposta` e `/studio` com `robots:noindex`.
- [ ] **Step 2:** `JsonLd`, `sitemap.ts` (exclui `/studio`,`/proposta`,`/api`), `robots.ts` (disallow idem + sitemap), OG image com `next/og`.
- [ ] **Step 3 (verify):** `/sitemap.xml` e `/robots.txt` corretos; JSON-LD valida no Rich Results Test; `/proposta` com noindex no fonte.

### Task 10: `/privacidade` (LGPD) + `/proposta`

**Files:** Create `src/app/privacidade/page.tsx`, `src/app/proposta/{layout.tsx,page.tsx}`.
- [ ] **Step 1:** `/privacidade` — modelo LGPD (dados coletados, finalidade, dados de menores, contato do controlador); linkada no rodapé e no consentimento do form. Indexável.
- [ ] **Step 2:** `/proposta` — layout com `noindex`, chrome mínimo; estrutura de pitch comercial (placeholder até Felipe passar o conteúdo final).
- [ ] **Step 3 (verify):** build limpo; `/proposta` noindex; `/privacidade` acessível pelo rodapé.

### Task 11: Polish, a11y, Lighthouse e deploy

- [ ] **Step 1:** QA responsivo (360/768/1280), navegação por teclado, `alt` em todas as imagens, sem erros de console.
- [ ] **Step 2:** Lighthouse mobile em `/` e `/cursos` → Perf/SEO/A11y/Best-practices ≥ 90; corrigir LCP/CLS.
- [ ] **Step 3:** Deploy Vercel (env vars), configurar CORS do Studio Sanity p/ domínio Vercel.
- [ ] **Step 4 (verify):** link `*.vercel.app` abre rápido no celular e navega as 5 páginas + `/proposta`/`/privacidade`; editar `siteSettings` no Studio reflete no site.

---

## Verificação (ponta a ponta)

- **Local:** `npm run dev` → site + `/studio`; `npm run build` limpo; `npm test` verde (whatsapp, Zod, route).
- **Conteúdo:** editar `siteSettings`/`heroSlide`/`instructor` no Studio reflete nas páginas.
- **Conversão:** CTA WhatsApp abre `wa.me` com mensagem; form cria `lead` no Sanity + e-mail (Resend).
- **SEO/Perf:** `/sitemap.xml`, `/robots.txt`, JSON-LD (Rich Results), Lighthouse ≥ 90, `/proposta`+`/studio` noindex.
- **Movimento:** `prefers-reduced-motion` → hero estático, reveals sem animação.
- **Git:** commits em `dev` pela conta pessoal (`felipemaxrosa`), `main` intacta.
