// projectId, dataset e apiVersion são identificadores PÚBLICOS (não segredos —
// aparecem em toda requisição do browser). Os fallbacks fixos garantem que o
// Studio hospedado (sanity deploy, cujo bundler não inlina NEXT_PUBLIC_*)
// funcione. No Next, as variáveis de ambiente têm precedência.
// Os TOKENS (read/write) continuam só no servidor, nunca aqui.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-21";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "awtxe6px";
