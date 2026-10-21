import { PortableText } from "@portabletext/react";

type FaqItem = { _id: string; question: string; answer?: unknown[] };

export function Faq({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      {items.map((f) => (
        <details key={f._id} className="group border-b border-line last:border-b-0 open:bg-surface/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg text-ink marker:content-['']">
            {f.question}
            <span
              aria-hidden
              className="shrink-0 text-2xl leading-none text-gold transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          {f.answer && (
            <div className="space-y-3 px-5 pb-5 text-muted">
              <PortableText value={f.answer as never} />
            </div>
          )}
        </details>
      ))}
    </div>
  );
}
