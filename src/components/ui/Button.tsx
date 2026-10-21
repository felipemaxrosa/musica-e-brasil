import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";

type Variant = "gold" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold text-[#1a1407] hover:bg-gold-deep",
  whatsapp: "bg-wa text-white hover:brightness-110",
  ghost: "border border-gold/40 text-ink hover:bg-white/5",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Link interno (usa next/link) ou externo (`external`, usa <a target=_blank>). */
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler;
  "aria-label"?: string;
};

export function Button({
  variant = "gold",
  size = "md",
  className,
  children,
  href,
  external,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const cls = buttonClasses(variant, size, className);

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cls}
        {...rest}
      >
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href as Route} onClick={onClick} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
