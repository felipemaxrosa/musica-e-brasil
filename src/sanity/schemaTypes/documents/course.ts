import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Curso",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (R) => R.required(),
    }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })] }),
    defineField({
      name: "modalities",
      title: "Modalidades",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Presencial", "Online ao vivo", "Personal (individual)", "Em grupo"],
      },
    }),
    defineField({ name: "featured", title: "Destacar na home", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ name: "orderAsc", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", media: "image", subtitle: "description" },
  },
});
