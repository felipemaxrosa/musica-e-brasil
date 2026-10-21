// Sobe as 4 imagens do hero (aprovadas no mockup) como assets no Sanity e cria
// os heroSlide. Placeholders — a escola troca pelas fotos reais no Studio.
// Uso: NODE_EXTRA_CA_CERTS=~/.config/netskope-ca.pem node scripts/seed-hero-images.mjs

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-21";
if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const SLIDES = [
  { id: "hero-1", url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=75", alt: "Plateia e palco iluminado em um show de música" },
  { id: "hero-2", url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1920&q=75", alt: "Mãos tocando um violão de perto" },
  { id: "hero-3", url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1920&q=75", alt: "Teclas de um piano em meia-luz" },
  { id: "hero-4", url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1920&q=75", alt: "Guitarrista em luz de palco durante um show" },
];

const base = `https://${projectId}.api.sanity.io/v${apiVersion}`;
const auth = { Authorization: `Bearer ${token}` };

async function uploadAsset(url) {
  const img = await fetch(url);
  if (!img.ok) throw new Error(`download falhou (${img.status}) ${url}`);
  const buf = Buffer.from(await img.arrayBuffer());
  const res = await fetch(`${base}/assets/images/${dataset}`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "image/jpeg" },
    body: buf,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`upload falhou: ${JSON.stringify(json)}`);
  return json.document._id;
}

const mutations = [];
for (let i = 0; i < SLIDES.length; i++) {
  const s = SLIDES[i];
  const assetId = await uploadAsset(s.url);
  mutations.push({
    createOrReplace: {
      _id: s.id,
      _type: "heroSlide",
      image: { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: s.alt },
      active: true,
      order: i,
    },
  });
  console.log(`✓ ${s.id} → ${assetId}`);
}

const res = await fetch(`${base}/data/mutate/${dataset}`, {
  method: "POST",
  headers: { ...auth, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations }),
});
const json = await res.json();
if (!res.ok) {
  console.error("Falha nas mutations:", JSON.stringify(json, null, 2));
  process.exit(1);
}
console.log(`OK — ${json.results?.length ?? 0} heroSlides criados.`);
