import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Nav } from "./Nav";
import { MobileNav } from "./MobileNav";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";

const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;

/** Header fixo com navegação e CTAs de conversão (presente em todas as páginas). */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label={`${SITE.name} — início`}
          className="font-display text-2xl font-black tracking-tight"
        >
          E<span className="text-gold">-</span>Brasil
        </Link>

        <Nav className="hidden md:flex" />

        <div className="hidden items-center gap-3 md:flex">
          <Button href={waHref} external variant="whatsapp" size="sm">
            WhatsApp
          </Button>
          <Button href="/contato" variant="gold" size="sm">
            Agendar aula
          </Button>
        </div>

        <MobileNav waHref={waHref} />
      </Container>
    </header>
  );
}
