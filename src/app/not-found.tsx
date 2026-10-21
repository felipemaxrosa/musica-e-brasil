import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Badge>Erro 404</Badge>
      <Heading as="h1" size="section" className="mt-5">
        Essa página saiu de cena
      </Heading>
      <p className="mt-4 max-w-md text-muted">
        O link que você seguiu não existe (ou mudou de lugar). Volte ao início e
        siga a música.
      </p>
      <div className="mt-8">
        <Button href="/" variant="gold" size="lg">
          Voltar ao início
        </Button>
      </div>
      <Link href="/contato" className="mt-6 text-sm text-gold underline-offset-4 hover:underline">
        Falar com a E-Brasil
      </Link>
    </main>
  );
}
