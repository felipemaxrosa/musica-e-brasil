import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  groups: [
    { name: "geral", title: "Geral", default: true },
    { name: "contato", title: "Contato" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", group: "geral", initialValue: "Escola de Música E-Brasil", validation: (R) => R.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "geral" }),
    defineField({ name: "shortDescription", title: "Descrição curta", type: "text", rows: 3, group: "geral" }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "geral" }),

    defineField({ name: "whatsapp", title: "WhatsApp (só dígitos, com DDI)", type: "string", group: "contato", description: "ex.: 5512997150806" }),
    defineField({ name: "phone", title: "Telefone", type: "string", group: "contato" }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "contato" }),
    defineField({ name: "address", title: "Endereço", type: "text", rows: 2, group: "contato" }),
    defineField({ name: "geo", title: "Localização (mapa)", type: "geopoint", group: "contato" }),
    defineField({ name: "googleMapsUrl", title: "URL do Google Maps", type: "url", group: "contato" }),
    defineField({ name: "openingHours", title: "Horários", type: "array", of: [{ type: "openingHours" }], group: "contato" }),
    defineField({ name: "social", title: "Redes sociais", type: "socialLinks", group: "contato" }),

    defineField({ name: "defaultSeo", title: "SEO padrão", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Configurações do site" }) },
});
