import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`
  *[_id == "siteSettings"][0]{
    name, tagline, shortDescription, whatsapp, phone, email, address,
    geo, googleMapsUrl, openingHours, social, "logo": logo.asset->url
  }
`);

export const heroSlidesQuery = defineQuery(`
  *[_type == "heroSlide" && active == true] | order(order asc){
    _id, image, "alt": image.alt
  }
`);

export const coursesQuery = defineQuery(`
  *[_type == "course"] | order(order asc){
    _id, name, "slug": slug.current, description, modalities, image
  }
`);

export const featuredCoursesQuery = defineQuery(`
  *[_type == "course" && featured == true] | order(order asc){
    _id, name, "slug": slug.current, description, modalities, image
  }
`);

export const instructorsQuery = defineQuery(`
  *[_type == "instructor"] | order(order asc){
    _id, name, photo, instruments, bio, featured
  }
`);

export const featuredInstructorsQuery = defineQuery(`
  *[_type == "instructor" && featured == true] | order(order asc){
    _id, name, photo, instruments, bio
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc){
    _id, name, relation, quote, rating, photo
  }
`);

export const featuredTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && featured == true] | order(order asc){
    _id, name, relation, quote, rating, photo
  }
`);

export const galleryQuery = defineQuery(`
  *[_type == "galleryImage"] | order(order asc){
    _id, image, "alt": image.alt, caption, event
  }
`);

export const faqQuery = defineQuery(`
  *[_type == "faqItem"] | order(order asc){ _id, question, answer }
`);

export const sectionTextQuery = defineQuery(`
  *[_type == "sectionText" && key == $key][0]{ eyebrow, title, body }
`);
