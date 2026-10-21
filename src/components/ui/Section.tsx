import { cn } from "@/lib/utils";
import { Container } from "./Container";

/** Bloco de seção com ritmo vertical padrão. Por padrão embrulha o conteúdo
 *  num Container; passe `bleed` para conteúdo de largura total. */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
