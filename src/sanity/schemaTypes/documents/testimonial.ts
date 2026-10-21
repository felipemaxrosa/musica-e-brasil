import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (R) => R.required() }),
    defineField({ name: "relation", title: "Relação", type: "string", description: "ex.: Mãe de aluno, Aluno, Pai de aluno" }),
    defineField({ name: "quote", title: "Depoimento", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "photo", title: "Foto (opcional)", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })] }),
    defineField({ name: "rating", title: "Nota (1–5)", type: "number", validation: (R) => R.min(1).max(5) }),
    defineField({ name: "featured", title: "Destacar na home", type: "boolean", initialValue: true }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ name: "orderAsc", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "relation", media: "photo" },
  },
});
