import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLinks",
  title: "Redes sociais",
  type: "object",
  fields: [
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "youtube", title: "YouTube", type: "url" }),
  ],
});
