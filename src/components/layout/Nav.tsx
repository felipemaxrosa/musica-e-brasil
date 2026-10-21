"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Navegação principal (desktop) com destaque da rota ativa. */
export function Nav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-7", className)} aria-label="Navegação principal">
      {NAV_LINKS.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-sm transition-colors hover:text-ink",
              active ? "text-gold" : "text-muted",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
