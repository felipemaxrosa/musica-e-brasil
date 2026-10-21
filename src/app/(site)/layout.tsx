import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Chrome do site público (header + rodapé). O <SanityLive/> entra na Task 2. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only rounded bg-gold px-4 py-2 text-[#1a1407] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
