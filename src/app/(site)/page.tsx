import { safeFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  heroSlidesQuery,
  featuredCoursesQuery,
  featuredInstructorsQuery,
  featuredTestimonialsQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SITE, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { musicSchoolJsonLd } from "@/lib/seo";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StageHighlight } from "@/components/sections/StageHighlight";
import { InstructorsFeatured } from "@/components/sections/InstructorsFeatured";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  // safeFetch: resiliente a falhas do Sanity (retorna fallback vazio, nunca 500).
  const [slides, courses, instructors, testimonials, settings] = await Promise.all([
    safeFetch<Array<{ image: Parameters<typeof urlFor>[0]; alt?: string }>>(
      { query: heroSlidesQuery },
      [],
    ),
    safeFetch<React.ComponentProps<typeof CoursesPreview>["courses"]>(
      { query: featuredCoursesQuery },
      [],
    ),
    safeFetch<React.ComponentProps<typeof InstructorsFeatured>["instructors"]>(
      { query: featuredInstructorsQuery },
      [],
    ),
    safeFetch<React.ComponentProps<typeof Testimonials>["testimonials"]>(
      { query: featuredTestimonialsQuery },
      [],
    ),
    safeFetch<{ whatsapp?: string } | null>({ query: settingsQuery }, null),
  ]);

  const heroSlides = slides.map((s) => ({
    url: urlFor(s.image).width(1920).height(1280).fit("crop").quality(75).url(),
    alt: s.alt ?? "",
  }));

  const waHref = buildWhatsappUrl(
    WHATSAPP_DEFAULT_MESSAGE,
    settings?.whatsapp ?? SITE.whatsapp,
  );

  return (
    <>
      <JsonLd data={musicSchoolJsonLd()} />
      <HeroCarousel slides={heroSlides} waHref={waHref} />
      <CoursesPreview courses={courses} />
      <HowItWorks />
      <StageHighlight />
      <InstructorsFeatured instructors={instructors} />
      <Testimonials testimonials={testimonials} />
      <FinalCTA waHref={waHref} />
    </>
  );
}
