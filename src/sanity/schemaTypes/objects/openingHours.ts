import { defineField, defineType } from "sanity";

export default defineType({
  name: "openingHours",
  title: "Horário de funcionamento",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Dia",
      type: "string",
      options: {
        list: [
          "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "opens", title: "Abre", type: "string", description: "ex.: 08:00" }),
    defineField({ name: "closes", title: "Fecha", type: "string", description: "ex.: 20:00" }),
    defineField({ name: "closed", title: "Fechado", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { day: "day", opens: "opens", closes: "closes", closed: "closed" },
    prepare: ({ day, opens, closes, closed }) => ({
      title: day,
      subtitle: closed ? "Fechado" : `${opens ?? "?"} – ${closes ?? "?"}`,
    }),
  },
});
