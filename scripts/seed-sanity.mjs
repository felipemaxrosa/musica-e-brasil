// Seed de conteúdo demo no Sanity via Mutations API (fetch + token de escrita).
// Uso: node scripts/seed-sanity.mjs   (lê PID/dataset/token do ambiente)
// Idempotente: usa createOrReplace com _ids determinísticos.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-21";

if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID ou SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

let k = 0;
const key = () => `k${(k++).toString(36)}`;
const pt = (...paras) =>
  paras.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  }));

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Escola de Música E-Brasil",
    tagline: "Realize seu sonho de tocar ou cantar",
    shortDescription:
      "A maior escola de música do Litoral Norte Paulista, em Caraguatatuba. Aulas presenciais e online ao vivo desde 2006.",
    whatsapp: "5512997150806",
    phone: "+551238812335",
    email: "",
    address: "Caraguatatuba · Litoral Norte de São Paulo",
    geo: { _type: "geopoint", lat: -23.6202507, lng: -45.4093475 },
    googleMapsUrl: "https://maps.app.goo.gl/svMmGspqmGRLHCZi6",
    openingHours: [
      { _type: "openingHours", _key: key(), day: "Segunda", opens: "08:00", closes: "20:00", closed: false },
      { _type: "openingHours", _key: key(), day: "Terça", opens: "08:00", closes: "20:00", closed: false },
      { _type: "openingHours", _key: key(), day: "Quarta", opens: "08:00", closes: "20:00", closed: false },
      { _type: "openingHours", _key: key(), day: "Quinta", opens: "08:00", closes: "20:00", closed: false },
      { _type: "openingHours", _key: key(), day: "Sexta", opens: "08:00", closes: "20:00", closed: false },
      { _type: "openingHours", _key: key(), day: "Sábado", opens: "08:00", closes: "12:00", closed: false },
      { _type: "openingHours", _key: key(), day: "Domingo", closed: true },
    ],
    social: {
      _type: "socialLinks",
      instagram: "https://www.instagram.com/escola_ebrasil/",
      facebook: "https://www.facebook.com/escolaebrasil/",
      youtube: "https://www.youtube.com/channel/UCeJTCbeuoGimkQGXbV3ux7g",
    },
  },

  // Cursos (6 instrumentos)
  ...[
    ["canto", "Canto", "Técnica vocal, afinação, respiração e interpretação para você cantar com confiança."],
    ["violao", "Violão", "Do primeiro acorde ao dedilhado: acompanhamento, ritmos e repertório que você ama."],
    ["guitarra", "Guitarra", "Riffs, solos, escalas e técnica — do rock ao blues, com teoria aplicada."],
    ["teclado", "Teclado", "Harmonia, leitura e prática no teclado e piano, do iniciante ao avançado."],
    ["contrabaixo", "Contrabaixo", "Groove, timing e fundamentos do baixo para tocar em qualquer banda."],
    ["bateria", "Bateria", "Coordenação, levadas e ritmos — a base que segura qualquer banda."],
  ].map(([slug, name, description], i) => ({
    _id: `course-${slug}`,
    _type: "course",
    name,
    slug: { _type: "slug", current: slug },
    description,
    modalities: ["Presencial", "Online ao vivo", "Personal (individual)", "Em grupo"],
    featured: true,
    order: i,
  })),

  // Instrutores (EXEMPLOS — substituir pelos reais no Studio)
  ...[1, 2, 3].map((n) => ({
    _id: `instructor-exemplo-${n}`,
    _type: "instructor",
    name: `Instrutor Exemplo ${n}`,
    instruments: [["Violão", "Guitarra"], ["Canto", "Teclado"], ["Bateria", "Contrabaixo"]][n - 1],
    bio: pt("Exemplo de mini bio — substituir pela do professor real no Studio."),
    featured: n <= 2,
    order: n,
  })),

  // Depoimentos (EXEMPLOS — substituir pelos reais)
  ...[
    ["Depoimento de exemplo 1", "Mãe de aluno", "(Exemplo) Meu filho adora as aulas e evoluiu muito rápido. Ambiente acolhedor e professores atenciosos."],
    ["Depoimento de exemplo 2", "Aluno", "(Exemplo) Sempre quis tocar violão e aqui realizei esse sonho. Recomendo de olhos fechados."],
    ["Depoimento de exemplo 3", "Pai de aluno", "(Exemplo) Estrutura excelente e o show no fim do ano foi emocionante. Valeu cada aula."],
  ].map(([name, relation, quote], i) => ({
    _id: `testimonial-exemplo-${i + 1}`,
    _type: "testimonial",
    name,
    relation,
    quote,
    rating: 5,
    featured: true,
    order: i,
  })),

  // FAQ
  ...[
    ["A partir de que idade posso matricular meu filho?", "Atendemos crianças, adolescentes e adultos. Para os pequenos, avaliamos a melhor turma na aula experimental."],
    ["Como funciona a aula experimental?", "É gratuita e sem compromisso: você agenda pelo WhatsApp ou pelo formulário, conhece a escola e sente como são as aulas."],
    ["As aulas são presenciais ou online?", "As duas! Você escolhe presencial em Caraguatatuba ou online ao vivo, em grupo ou personal (individual)."],
    ["Preciso ter meu próprio instrumento?", "Para começar, não. Temos estrutura para a aula; conforme você evolui, orientamos a melhor compra."],
  ].map(([question, answer], i) => ({
    _id: `faq-${i + 1}`,
    _type: "faqItem",
    question,
    answer: pt(answer),
    order: i,
  })),

  // Textos de seções
  {
    _id: "section-historia",
    _type: "sectionText",
    key: "historia",
    eyebrow: "Nossa história",
    title: "Desde 2006 transformando sonhos em música",
    body: pt(
      "A E-Brasil nasceu do desejo de três jovens músicos de criar, em Caraguatatuba, um lugar onde o Litoral Norte pudesse estudar música com qualidade — sem precisar se deslocar para outras cidades.",
      "De lá para cá já passaram quase três mil alunos. Hoje somos referência em ensino musical na região, com professores experientes, estúdio de gravação e eventos como o Especial E-Brasil.",
    ),
  },
  {
    _id: "section-como-funciona",
    _type: "sectionText",
    key: "como-funciona",
    eyebrow: "Como funciona",
    title: "Sua aula experimental em 3 passos",
    body: pt(
      "1. Fale com a gente pelo WhatsApp ou formulário e escolha o instrumento.",
      "2. Agende um horário e venha conhecer a escola sem compromisso.",
      "3. Faça sua aula experimental gratuita e sinta como é tocar na E-Brasil.",
    ),
  },
];

const mutations = docs.map((doc) => ({ createOrReplace: doc }));

const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`;

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ mutations }),
});

const json = await res.json();
if (!res.ok) {
  console.error("Falha no seed:", JSON.stringify(json, null, 2));
  process.exit(1);
}
console.log(`OK — ${json.results?.length ?? 0} documentos criados/atualizados.`);
