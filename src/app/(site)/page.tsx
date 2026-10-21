import { sanityFetch } from "@/sanity/lib/live";
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
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StageHighlight } from "@/components/sections/StageHighlight";
import { InstructorsFeatured } from "@/components/sections/InstructorsFeatured";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default async function Home() {
  const [slidesRes, coursesRes, instructorsRes, testimonialsRes, settingsRes] =
    await Promise.all([
      sanityFetch({ query: heroSlidesQuery }),
      sanityFetch({ query: featuredCoursesQuery }),
      sanityFetch({ query: featuredInstructorsQuery }),
      sanityFetch({ query: featuredTestimonialsQuery }),
      sanityFetch({ query: settingsQuery }),
    ]);

  // Sem sanity typegen, `data` vem como `{}` — castamos para os tipos esperados.
  const slides = (slidesRes.data ?? []) as Array<{
    image: Parameters<typeof urlFor>[0];
    alt?: string;
  }>;
  const courses = (coursesRes.data ?? []) as React.ComponentProps<typeof CoursesPreview>["courses"];
  const instructors = (instructorsRes.data ?? []) as React.ComponentProps<typeof InstructorsFeatured>["instructors"];
  const testimonials = (testimonialsRes.data ?? []) as React.ComponentProps<typeof Testimonials>["testimonials"];
  const settings = (settingsRes.data ?? null) as { whatsapp?: string } | null;

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
      <HeroCarousel slides={heroSlides} waHref={waHref} />
      <CoursesPreview courses={courses ?? []} />
      <HowItWorks />
      <StageHighlight />
      <InstructorsFeatured instructors={instructors ?? []} />
      <Testimonials testimonials={testimonials ?? []} />
      <FinalCTA waHref={waHref} />
    </>
  );
}
