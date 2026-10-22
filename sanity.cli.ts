import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
  // hostname do Studio hospedado → https://musica-e-brasil.sanity.studio
  studioHost: "musica-e-brasil",
  // id da aplicação deployada (evita prompt em deploys futuros)
  deployment: { appId: "q6u2qishl5vvpr07mcf85syh" },
});
