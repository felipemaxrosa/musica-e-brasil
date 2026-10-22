export function MapEmbed({
  query,
  mapsUrl,
  title = "Localização da E-Brasil",
}: {
  /** Nome + endereço — o embed resolve pro estabelecimento (não só coordenadas). */
  query: string;
  /** Link oficial do lugar no Google Maps (abre direto na escola). */
  mapsUrl?: string;
  title?: string;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
  return (
    <div>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      </div>
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-gold underline-offset-4 hover:underline"
        >
          Abrir no Google Maps →
        </a>
      )}
    </div>
  );
}
