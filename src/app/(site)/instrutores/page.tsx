import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { instructorsQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  InstructorGrid,
  type InstructorCard,
} from "@/components/sections/InstructorGrid";

export const metadata: Metadata = {
  title: "Instrutores",
  description:
    "Conheça os professores da E-Brasil: músicos experientes e apaixonados por ensinar canto, violão, guitarra, teclado, contrabaixo e bateria.",
  alternates: { canonical: "/instrutores" },
};

type InstructorDoc = {
  _id: string;
  name: string;
  instruments?: string[];
  photo?: Parameters<typeof urlFor>[0] | null;
  bio?: unknown[];
};

export default async function InstrutoresPage() {
  const [instructorsData, settings] = await Promise.all([
    safeFetch<InstructorDoc[]>({ query: instructorsQuery }, []),
    safeFetch<{ whatsapp?: string } | null>({ query: settingsQuery }, null),
  ]);

  const instructors: InstructorCard[] = instructorsData.map(
    (p) => ({
      _id: p._id,
      name: p.name,
      instruments: p.instruments,
      photoUrl: p.photo
        ? urlFor(p.photo).width(640).height(640).fit("crop").url()
        : undefined,
      bio: p.bio,
    }),
  );

  const whatsapp = settings?.whatsapp ?? SITE.whatsapp;
  const waHref = buildWhatsappUrl(WHATSAPP_DEFAULT_MESSAGE, whatsapp);

  return (
    <>
      <PageHero
        eyebrow="Quem ensina"
        title="Professores que vivem de música"
        subtitle="Mais de 15 professores na equipe. Veja quem vai te acompanhar nessa jornada."
      />
      <Section>
        <InstructorGrid instructors={instructors} whatsapp={whatsapp} />
      </Section>
      <FinalCTA waHref={waHref} />
    </>
  );
}
