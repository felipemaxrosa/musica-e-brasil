import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Gera URLs otimizadas de imagens do Sanity (usar com next/image). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
