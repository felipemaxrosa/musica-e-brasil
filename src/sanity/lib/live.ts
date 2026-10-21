import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Live Content API: sanityFetch (server) + <SanityLive/> (revalida ao vivo).
// serverToken fica só no servidor; sem browserToken (não expomos token ao browser).
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
});
