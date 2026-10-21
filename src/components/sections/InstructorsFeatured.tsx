import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { urlFor } from "@/sanity/lib/image";

type Instructor = {
  _id: string;
  name: string;
  instruments?: string[];
  photo?: unknown;
};

export function InstructorsFeatured({ instructors }: { instructors: Instructor[] }) {
  if (!instructors?.length) return null;

  return (
    <Section id="instrutores" className="bg-surface/40">
      <Reveal>
        <Badge>Quem ensina</Badge>
        <Heading className="mt-3">Professores que vivem de música</Heading>
        <p className="mt-4 max-w-2xl text-muted">
          Quem indicou a E-Brasil sabe: aqui o seu filho aprende com gente de
          verdade, experiente e apaixonada pelo que faz.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((p, idx) => (
          <Reveal
            key={p._id}
            delay={idx * 60}
            className="flex items-center gap-4 rounded-2xl border border-line bg-base p-5"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gold/30 bg-surface">
              {p.photo ? (
                <Image src={urlFor(p.photo).width(128).height(128).fit("crop").url()} alt={p.name} fill sizes="64px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-2xl text-gold">
                  {p.name?.charAt(0) ?? "E"}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
              {!!p.instruments?.length && (
                <p className="mt-0.5 text-sm text-muted">{p.instruments.join(" · ")}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Button href="/instrutores" variant="ghost">
          Conhecer todos os instrutores
        </Button>
      </div>
    </Section>
  );
}
