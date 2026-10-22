"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/Button";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export type InstructorCard = {
  _id: string;
  name: string;
  instruments?: string[];
  photoUrl?: string;
  bio?: unknown[];
};

function Avatar({ photoUrl, name, size }: { photoUrl?: string; name: string; size: "sm" | "lg" }) {
  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt={name}
        fill
        sizes={size === "sm" ? "64px" : "448px"}
        className="object-cover"
      />
    );
  }
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center font-display text-gold",
        size === "sm" ? "text-2xl" : "text-7xl",
      )}
    >
      {name?.charAt(0) ?? "E"}
    </span>
  );
}

function InstructorModal({
  instructor,
  whatsapp,
  onClose,
}: {
  instructor: InstructorCard;
  whatsapp: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose]);

  const firstName = instructor.name?.split(" ")[0] ?? "o professor";
  const waHref = buildWhatsappUrl(
    `Olá! Tenho interesse em aula com ${instructor.name} na E-Brasil.`,
    whatsapp,
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="instrutor-nome"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-night/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-night/60 text-ink backdrop-blur"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative h-56 w-full bg-gradient-to-br from-surface-2 to-night">
          <Avatar photoUrl={instructor.photoUrl} name={instructor.name} size="lg" />
        </div>

        <div className="p-6">
          <h2 id="instrutor-nome" className="font-display text-2xl font-bold text-ink">
            {instructor.name}
          </h2>
          {!!instructor.instruments?.length && (
            <p className="mt-1 text-gold">{instructor.instruments.join(" · ")}</p>
          )}
          {instructor.bio && (
            <div className="mt-4 space-y-3 leading-relaxed text-muted">
              <PortableText value={instructor.bio as never} />
            </div>
          )}
          <div className="mt-6">
            <Button href={waHref} external variant="whatsapp">
              Agendar aula com {firstName}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstructorGrid({
  instructors,
  whatsapp,
}: {
  instructors: InstructorCard[];
  whatsapp: string;
}) {
  const instruments = useMemo(() => {
    const set = new Set<string>();
    instructors.forEach((p) => p.instruments?.forEach((i) => set.add(i)));
    return ["Todos", ...Array.from(set).sort()];
  }, [instructors]);

  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<InstructorCard | null>(null);

  const visible =
    filter === "Todos"
      ? instructors
      : instructors.filter((p) => p.instruments?.includes(filter));

  return (
    <div>
      {instruments.length > 2 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por instrumento">
          {instruments.map((inst) => (
            <button
              key={inst}
              type="button"
              onClick={() => setFilter(inst)}
              aria-pressed={filter === inst}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === inst
                  ? "border-gold bg-gold text-[#1a1407]"
                  : "border-line text-muted hover:border-gold/50 hover:text-ink",
              )}
            >
              {inst}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <button
            key={p._id}
            type="button"
            onClick={() => setSelected(p)}
            aria-label={`Ver detalhes de ${p.name}`}
            className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition-colors hover:border-gold/40"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/30 bg-night">
              <Avatar photoUrl={p.photoUrl} name={p.name} size="sm" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-lg font-bold text-ink">{p.name}</h2>
              {!!p.instruments?.length && (
                <p className="mt-0.5 text-sm text-muted">{p.instruments.join(" · ")}</p>
              )}
            </div>
            <span
              aria-hidden
              className="text-gold opacity-0 transition-opacity group-hover:opacity-100"
            >
              →
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-muted">Nenhum instrutor para este instrumento ainda.</p>
      )}

      {selected && (
        <InstructorModal
          instructor={selected}
          whatsapp={whatsapp}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
