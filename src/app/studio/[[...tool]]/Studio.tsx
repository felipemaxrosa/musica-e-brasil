"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/** Fronteira client do Studio: mantém o pacote `sanity` fora do grafo RSC. */
export function Studio() {
  return <NextStudio config={config} />;
}
