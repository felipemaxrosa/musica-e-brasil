"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type InstructorCard = {
  _id: string;
  name: string;
  instruments?: string[];
  photoUrl?: string;
};

export function InstructorGrid({ instructors }: { instructors: InstructorCard[] }) {
  const instruments = useMemo(() => {
    const set = new Set<string>();
    instructors.forEach((p) => p.instruments?.forEach((i) => set.add(i)));
    return ["Todos", ...Array.from(set).sort()];
  }, [instructors]);

  const [filter, setFilter] = useState("Todos");

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
          <div
            key={p._id}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/30 bg-night">
              {p.photoUrl ? (
                <Image src={p.photoUrl} alt={p.name} fill sizes="64px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-2xl text-gold">
                  {p.name?.charAt(0) ?? "E"}
                </span>
              )}
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">{p.name}</h2>
              {!!p.instruments?.length && (
                <p className="mt-0.5 text-sm text-muted">{p.instruments.join(" · ")}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-muted">Nenhum instrutor para este instrumento ainda.</p>
      )}
    </div>
  );
}
