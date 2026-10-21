export function MapEmbed({
  lat,
  lng,
  title = "Localização da E-Brasil",
}: {
  lat: number;
  lng: number;
  title?: string;
}) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
      />
    </div>
  );
}
