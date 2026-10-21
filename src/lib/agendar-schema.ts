export type AgendarInput = {
  name?: string;
  student?: string;
  phone?: string;
  email?: string;
  studentKind?: string;
  instrument?: string;
  modality?: string;
  preferredTime?: string;
  message?: string;
  consent?: boolean;
  website?: string; // honeypot (deve vir vazio)
};

export type AgendarData = {
  name: string;
  student?: string;
  phone: string;
  email?: string;
  studentKind?: string;
  instrument?: string;
  modality?: string;
  preferredTime?: string;
  message?: string;
};

export type AgendarResult =
  | { success: true; data: AgendarData }
  | { success: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const trim = (v?: string) => (v ?? "").trim();

/** Valida e normaliza o payload do formulário de agendamento (sem dependências). */
export function validateAgendar(input: AgendarInput): AgendarResult {
  const errors: Record<string, string> = {};

  if (trim(input.website)) errors.website = "spam detectado";

  const name = trim(input.name);
  if (name.length < 2) errors.name = "Informe seu nome.";

  const phone = trim(input.phone);
  if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Informe um telefone/WhatsApp válido (com DDD).";
  }

  const email = trim(input.email);
  if (email && !EMAIL_RE.test(email)) errors.email = "E-mail inválido.";

  if (input.consent !== true) {
    errors.consent = "É preciso aceitar a Política de Privacidade.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name,
      student: trim(input.student) || undefined,
      phone,
      email: email || undefined,
      studentKind: trim(input.studentKind) || undefined,
      instrument: trim(input.instrument) || undefined,
      modality: trim(input.modality) || undefined,
      preferredTime: trim(input.preferredTime) || undefined,
      message: trim(input.message) || undefined,
    },
  };
}
