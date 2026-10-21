import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "metaTitle", title: "Título (meta)", type: "string" }),
    defineField({
      name: "metaDescription",
      title: "Descrição (meta)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(170).warning("Idealmente até ~160 caracteres."),
    }),
    defineField({ name: "ogImage", title: "Imagem de compartilhamento", type: "image" }),
  ],
});
