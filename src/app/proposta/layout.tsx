import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposta",
  // página interna de venda — fora do Google
  robots: { index: false, follow: false },
};

export default function PropostaLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
