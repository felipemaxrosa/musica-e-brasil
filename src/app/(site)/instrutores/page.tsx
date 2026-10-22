import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
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
};

export default async function InstrutoresPage() {
  const [{ data: instructorsData }, { data: settings }] = await Promise.all([
    sanityFetch({ query: instructorsQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  const instructors: InstructorCard[] = ((instructorsData ?? []) as InstructorDoc[]).map(
    (p) => ({
      _id: p._id,
      name: p.name,
      instruments: p.instruments,
      photoUrl: p.photo
        ? urlFor(p.photo).width(128).height(128).fit("crop").url()
        : undefined,
    }),
  );

  const waHref = buildWhatsappUrl(
    WHATSAPP_DEFAULT_MESSAGE,
    (settings as { whatsapp?: string } | null)?.whatsapp ?? SITE.whatsapp,
  );

  return (
    <>
      <PageHero
        eyebrow="Quem ensina"
        title="Professores que vivem de música"
        subtitle="Mais de 15 professores na equipe. Veja quem vai te acompanhar nessa jornada."
      />
      <Section>
        <InstructorGrid instructors={instructors} />
      </Section>
      <FinalCTA waHref={waHref} />
    </>
  );
}
