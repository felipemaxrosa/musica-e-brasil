import { defineField, defineType } from "sanity";

/** Solicitação de aula experimental (fonte primária do formulário).
 *  Criado via API com o token de escrita; somente leitura no Studio. */
export default defineType({
  name: "lead",
  title: "Agendamento (lead)",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Nome do responsável", type: "string" }),
    defineField({ name: "student", title: "Nome do aluno", type: "string" }),
    defineField({ name: "phone", title: "WhatsApp / telefone", type: "string" }),
    defineField({ name: "studentKind", title: "Aluno", type: "string", description: "criança ou adulto" }),
    defineField({ name: "instrument", title: "Instrumento de interesse", type: "string" }),
    defineField({ name: "modality", title: "Modalidade", type: "string" }),
    defineField({ name: "preferredTime", title: "Melhor horário", type: "string" }),
    defineField({ name: "message", title: "Mensagem", type: "text", rows: 3 }),
    defineField({ name: "createdAt", title: "Criado em", type: "datetime" }),
    defineField({ name: "source", title: "Origem", type: "string" }),
  ],
  orderings: [{ name: "createdDesc", title: "Mais recentes", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", subtitle: "instrument", created: "createdAt" },
    prepare: ({ title, subtitle, created }) => ({
      title: title || "(sem nome)",
      subtitle: [subtitle, created ? new Date(created).toLocaleDateString("pt-BR") : null].filter(Boolean).join(" · "),
    }),
  },
});
