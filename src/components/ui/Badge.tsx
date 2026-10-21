import { cn } from "@/lib/utils";

/** Rótulo pequeno (kicker) em fonte de detalhe (Marcellus), dourado. */
export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "font-detail inline-block text-xs uppercase tracking-[0.22em] text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
