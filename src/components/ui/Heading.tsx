import { cn } from "@/lib/utils";

type HeadingSize = "hero" | "section" | "card";

const SIZES: Record<HeadingSize, string> = {
  hero: "text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.03]",
  section: "text-3xl sm:text-4xl font-black leading-[1.08]",
  card: "text-xl sm:text-2xl font-bold leading-snug",
};

/** Título em fonte display (Playfair). `as` escolhe a tag; `size` o tamanho. */
export function Heading({
  as: Tag = "h2",
  size = "section",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("font-display text-ink", SIZES[size], className)}>
      {children}
    </Tag>
  );
}
