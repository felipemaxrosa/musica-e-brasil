/** Injeta um bloco de structured data (JSON-LD). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // dados controlados por nós (não entrada de usuário)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
