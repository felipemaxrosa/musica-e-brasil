import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Slide do hero",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (R) => R.required() }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({ name: "active", title: "Ativo", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Ordem", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { media: "image", alt: "image.alt", order: "order" },
    prepare: ({ media, alt, order }) => ({ title: alt || "Slide", subtitle: `Ordem ${order ?? 0}`, media }),
  },
});
