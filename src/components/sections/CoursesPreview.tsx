import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type Course = {
  _id: string;
  name: string;
  description?: string;
  modalities?: string[];
};

export function CoursesPreview({ courses }: { courses: Course[] }) {
  if (!courses?.length) return null;

  return (
    <Section id="cursos">
      <Reveal>
        <Badge>Cursos</Badge>
        <Heading className="mt-3">O instrumento do seu sonho</Heading>
        <p className="mt-4 max-w-2xl text-muted">
          Do primeiro acorde ao palco — presencial ou online ao vivo, em grupo
          ou personal.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, idx) => (
          <Reveal
            key={c._id}
            delay={idx * 60}
            className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-gold/40"
          >
            <h3 className="font-display text-xl font-bold text-ink">{c.name}</h3>
            {c.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
            )}
            {!!c.modalities?.length && (
              <div className="mt-4 flex flex-wrap gap-2">
                {c.modalities.slice(0, 2).map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {m}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Button href="/cursos" variant="ghost">
          Ver todos os cursos
        </Button>
      </div>
    </Section>
  );
}
