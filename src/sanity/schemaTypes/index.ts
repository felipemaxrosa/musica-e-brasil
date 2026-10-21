import { type SchemaTypeDefinition } from "sanity";

import siteSettings from "./documents/siteSettings";
import heroSlide from "./documents/heroSlide";
import course from "./documents/course";
import instructor from "./documents/instructor";
import testimonial from "./documents/testimonial";
import galleryImage from "./documents/galleryImage";
import faqItem from "./documents/faqItem";
import sectionText from "./documents/sectionText";
import lead from "./documents/lead";

import socialLinks from "./objects/socialLinks";
import openingHours from "./objects/openingHours";
import seo from "./objects/seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documentos
    siteSettings,
    heroSlide,
    course,
    instructor,
    testimonial,
    galleryImage,
    faqItem,
    sectionText,
    lead,
    // objetos
    socialLinks,
    openingHours,
    seo,
  ],
};
