/** Monta um deep link do WhatsApp (wa.me) com o número só em dígitos e a
 *  mensagem devidamente escapada. */
export function buildWhatsappUrl(message: string, phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
