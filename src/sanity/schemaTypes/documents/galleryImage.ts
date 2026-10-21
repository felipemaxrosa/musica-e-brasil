import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Foto da galeria",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (R) => R.required() })],
      validation: (R) => R.required(),
    }),
    defineField({ name: "caption", title: "Legenda", type: "string" }),
    defineField({ name: "event", title: "Evento / ano", type: "string" }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ name: "orderAsc", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { media: "image", title: "caption", subtitle: "event" },
    prepare: ({ media, title, subtitle }) => ({ media, title: title || "Foto", subtitle }),
  },
});
