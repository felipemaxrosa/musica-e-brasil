/** Junta classes condicionalmente (clsx mínimo, sem dependência). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
