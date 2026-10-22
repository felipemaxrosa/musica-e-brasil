/** Monta um deep link do WhatsApp (wa.me) com o número só em dígitos e a
 *  mensagem devidamente escapada. */
export function buildWhatsappUrl(message: string, phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Normaliza um telefone brasileiro para o formato do WhatsApp (só dígitos com
 *  DDI 55). Aceita o que o usuário digitar: com/sem máscara, com/sem 55, com
 *  zero de discagem à esquerda. Ex.: "12981472329" → "5512981472329". */
export function normalizeBrazilPhone(raw: string): string {
  let d = (raw ?? "").replace(/\D/g, "").replace(/^0+/, "");
  // Já tem DDI 55 (55 + DDD + número = 12 ou 13 dígitos).
  if (d.startsWith("55") && (d.length === 12 || d.length === 13)) return d;
  // DDD + número local (10 fixo ou 11 celular) → acrescenta o 55.
  if (d.length === 10 || d.length === 11) return `55${d}`;
  // Melhor esforço: se tiver dígitos e não começar com 55, prefixa.
  return d && !d.startsWith("55") ? `55${d}` : d;
}
