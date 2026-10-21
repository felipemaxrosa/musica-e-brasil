import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: false — sanityFetch usa token (Live Content API), e o CDN não
  // serve requisições autenticadas. O cache fica a cargo do ISR/Live.
  useCdn: false,
});
