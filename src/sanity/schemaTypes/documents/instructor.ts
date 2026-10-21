import { defineField, defineType } from "sanity";

export default defineType({
  name: "instructor",
  title: "Instrutor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({
      name: "instruments",
      title: "Instrumentos",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Canto", "Violão", "Guitarra", "Teclado", "Contrabaixo", "Bateria"],
      },
    }),
    defineField({ name: "bio", title: "Mini bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "featured", title: "Destacar na home", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ name: "orderAsc", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", media: "photo", instruments: "instruments" },
    prepare: ({ title, media, instruments }) => ({
      title,
      subtitle: Array.isArray(instruments) ? instruments.join(" · ") : "",
      media,
    }),
  },
});
