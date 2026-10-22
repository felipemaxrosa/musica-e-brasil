import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { SITE_URL } from "@/lib/constants";
import { buildWhatsappUrl, normalizeBrazilPhone } from "@/lib/whatsapp";
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

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `E-Brasil Site <${from}>`,
      to: [to],
      replyTo: data.email || undefined,
      subject: `🎵 Nova aula experimental — ${data.name}`,
      html: renderLeadEmail(data),
    }),
  });
}

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Template HTML de marca (table-based, estilos inline — compatível com e-mail clients). */
function renderLeadEmail(data: AgendarData): string {
  // Número do lead normalizado para o WhatsApp (adiciona o DDI 55 quando falta).
  const phone = normalizeBrazilPhone(data.phone || "");
  const waUrl = buildWhatsappUrl(
    `Olá ${data.name}! Aqui é da Escola de Música E-Brasil 🎶 Vi seu pedido de aula experimental${
      data.instrument ? ` de ${data.instrument}` : ""
    }. Vamos combinar um horário?`,
    phone,
  );

  const rows = (
    [
      ["Responsável", data.name],
      ["Aluno", data.student],
      ["WhatsApp / telefone", data.phone],
      ["E-mail", data.email],
      ["Aluno é", data.studentKind],
      ["Instrumento", data.instrument],
      ["Modalidade", data.modality],
      ["Melhor horário", data.preferredTime],
      ["Mensagem", data.message],
    ] as [string, string | undefined][]
  )
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a8a8a;font-size:13px;width:150px;vertical-align:top">${k}</td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;font-size:15px;font-weight:600">${esc(v)}</td>
      </tr>`,
    )
    .join("");

  return `
  <div style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6e6e6">
      <tr>
        <td style="background:#0a0a0c;padding:28px 32px">
          <img src="${SITE_URL}/logo.jpg" alt="Escola de Música E-Brasil" width="61" height="48" style="display:block;border:0;outline:none;height:48px;width:auto" />
          <div style="margin-top:12px;color:#e8c87e;font-size:13px;letter-spacing:2px;text-transform:uppercase">Nova aula experimental</div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px">
          <p style="margin:0 0 20px;color:#444;font-size:15px">Você recebeu uma nova solicitação de aula experimental pelo site:</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          ${
            phone
              ? `<div style="margin-top:28px;text-align:center">
                   <a href="${waUrl}" style="display:inline-block;background:#1f9d55;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px">Responder no WhatsApp</a>
                 </div>`
              : ""
          }
        </td>
      </tr>
      <tr>
        <td style="padding:18px 32px;background:#faf7f0;border-top:1px solid #eee;color:#999;font-size:12px">
          Enviado automaticamente pelo site da Escola de Música E-Brasil.
        </td>
      </tr>
    </table>
  </div>`;
}
