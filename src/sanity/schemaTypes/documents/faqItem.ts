import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "Pergunta frequente (FAQ)",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Pergunta", type: "string", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Resposta", type: "array", of: [{ type: "block" }], validation: (R) => R.required() }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ name: "orderAsc", title: "Ordem", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});
