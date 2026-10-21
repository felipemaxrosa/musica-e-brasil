import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import type { AgendarData } from "@/lib/agendar-schema";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

/** Grava a solicitação de aula como documento `lead` (fonte primária). */
export async function createLead(data: AgendarData) {
  return writeClient.create({
    _type: "lead",
    ...data,
    createdAt: new Date().toISOString(),
    source: "site-form",
  });
}

/** Notificação por e-mail (best-effort) via Resend. Silencioso se não houver chave/destino. */
export async function sendLeadEmail(data: AgendarData): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  if (!key || !to) return;

  const rows = Object.entries({
    Nome: data.name,
    Aluno: data.student,
    "WhatsApp/telefone": data.phone,
    "E-mail": data.email,
    "Criança/adulto": data.studentKind,
    Instrumento: data.instrument,
    Modalidade: data.modality,
    "Melhor horário": data.preferredTime,
    Mensagem: data.message,
  })
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 10px;color:#777">${k}</td><td style="padding:4px 10px"><b>${v}</b></td></tr>`)
    .join("");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `E-Brasil Site <${from}>`,
      to: [to],
      subject: `Nova aula experimental — ${data.name}`,
      html: `<h2>Nova solicitação de aula experimental</h2><table>${rows}</table>`,
    }),
  });
}
