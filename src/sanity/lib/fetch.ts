import { sanityFetch } from "./live";

/**
 * Envolve o sanityFetch com try/catch: se o Sanity oscilar (timeout, rede),
 * retorna o `fallback` em vez de derrubar a página com erro 500.
 * Resiliência para produção — a página sempre renderiza.
 */
export async function safeFetch<T>(
  options: Parameters<typeof sanityFetch>[0],
  fallback: T,
): Promise<T> {
  try {
    const { data } = await sanityFetch(options);
    return (data ?? fallback) as T;
  } catch (err) {
    console.error(
      "[safeFetch] Falha ao buscar no Sanity:",
      err instanceof Error ? err.message : err,
    );
    return fallback;
  }
}
