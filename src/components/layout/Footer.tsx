import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE } from "@/lib/constants";

const SOCIAL = [
  { label: "Instagram", href: SITE.social.instagram },
  { label: "Facebook", href: SITE.social.facebook },
  { label: "YouTube", href: SITE.social.youtube },
];

/** Rodapé: marca, navegação, contato/redes e a Política de Privacidade (LGPD). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface/40">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Image
            src="/logo.jpg"
            alt={SITE.name}
            width={960}
            height={751}
            className="h-16 w-auto mix-blend-screen"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Escola de música em {SITE.city}. A maior do {SITE.region}, desde{" "}
            {SITE.foundedYear}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-detail text-xs uppercase tracking-[0.18em] text-gold">
            Navegação
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-detail text-xs uppercase tracking-[0.18em] text-gold">
            Contato
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-ink"
              >
                WhatsApp (12) 99715-0806
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="text-muted transition-colors hover:text-ink">
                Fixo (12) 3881-2335
              </a>
            </li>
            <li>
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block not-italic leading-relaxed text-muted transition-colors hover:text-ink"
              >
                {SITE.street}
                <br />
                {SITE.city} - SP · {SITE.postalCode}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-detail text-xs uppercase tracking-[0.18em] text-gold">
            Redes
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {SITE.name}. Todos os direitos reservados.
          </span>
          <Link href="/privacidade" className="transition-colors hover:text-ink">
            Política de Privacidade
          </Link>
        </Container>
      </div>
    </footer>
  );
}
