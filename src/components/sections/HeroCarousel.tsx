'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export type HeroSlide = { url: string; alt: string };

const STATS = [
  { value: '+3 mil', label: 'alunos' },
  { value: '18 anos', label: 'no Litoral Norte' },
  { value: '6+', label: 'instrumentos' },
];

/** Hero com carrossel de FUNDO em crossfade (texto/CTA fixos).
 *  Troca ~5s, pausa no hover, dots/setas; estático em prefers-reduced-motion. */
export function HeroCarousel({
  slides,
  waHref,
}: {
  slides: HeroSlide[];
  waHref: string;
}) {
  const [i, setI] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduce = useRef(false);
  const count = slides.length;

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };
  const play = () => {
    if (reduce.current || count <= 1) return;
    stop();
    timer.current = setInterval(() => setI((p) => (p + 1) % count), 5000);
  };

  useEffect(() => {
    reduce.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    play();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const go = (n: number) => {
    setI((n + count) % count);
    play();
  };

  return (
    <section
      className="relative flex min-h-[88vh] flex-col overflow-hidden"
      onMouseEnter={stop}
      onMouseLeave={play}
      aria-roledescription="carrossel"
      aria-label="Destaques da E-Brasil"
    >
      {/* camadas de imagem */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, idx) => (
          <div
            key={s.url}
            className={cn(
              'absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none',
              idx === i ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={idx !== i}
          >
            <Image
              src={s.url}
              alt={s.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover motion-safe:animate-[kenburns_9s_ease-in-out_infinite_alternate]"
            />
          </div>
        ))}
        {/* scrim dourado + escurecimento à esquerda */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 80% at 72% 18%, rgba(212,175,55,.18), transparent 60%), linear-gradient(90deg, rgba(6,6,7,.94) 0%, rgba(6,6,7,.62) 55%, rgba(6,6,7,.38) 100%)',
          }}
        />
      </div>

      {/* conteúdo fixo */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <Badge>Escola de Música · desde 2006</Badge>
          <h1 className="mt-5 font-display text-4xl font-black leading-[1.03] sm:text-5xl lg:text-6xl">
            Aqui, você vai{' '}
            <em className="italic font-medium text-gold">brilhar</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/85">
            A maior escola de música do Litoral Norte. Aulas com professores de
            verdade e palco pra mostrar o que você aprendeu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={waHref} external variant="whatsapp" size="lg">
              Agendar aula experimental
            </Button>
            <Button href="/a-escola" variant="ghost" size="lg">
              Conhecer a escola
            </Button>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-ink">
                  {s.value}
                </dt>
                <dd className="text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* dots + setas */}
      {count > 1 && (
        <>
          <div className="absolute bottom-6 left-5 z-10 flex gap-2.5 sm:left-8">
            {slides.map((s, idx) => (
              <button
                key={s.url}
                type="button"
                onClick={() => go(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
                aria-current={idx === i}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  idx === i ? 'w-7 bg-gold' : 'w-2.5 bg-ink/30 hover:bg-ink/50',
                )}
              />
            ))}
          </div>
          <div className="absolute bottom-5 right-5 z-10 flex gap-2.5 sm:right-8">
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Slide anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-night/50 text-gold"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Próximo slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-night/50 text-gold"
            >
              ›
            </button>
          </div>
        </>
      )}
    </section>
  );
}
