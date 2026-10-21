import { defineField, defineType } from "sanity";

/** Textos editáveis de seções (história, diferenciais, "como funciona"…),
 *  identificados por `key`. */
export default defineType({
  name: "sectionText",
  title: "Texto de seção",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Chave",
      type: "string",
      description: "Identificador usado no código (ex.: historia, diferenciais, como-funciona).",
      validation: (R) => R.required(),
    }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "eyebrow", title: "Kicker (rótulo)", type: "string" }),
    defineField({ name: "body", title: "Conteúdo", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "title", subtitle: "key" } },
});
