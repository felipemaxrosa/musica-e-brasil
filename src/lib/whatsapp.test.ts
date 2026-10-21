import test from "node:test";
import assert from "node:assert/strict";
import { buildWhatsappUrl } from "./whatsapp.ts";

test("monta wa.me com número só dígitos e texto escapado", () => {
  const url = buildWhatsappUrl("Olá! Tenho interesse", "+55 (12) 99715-0806");
  assert.equal(url, "https://wa.me/5512997150806?text=Ol%C3%A1!%20Tenho%20interesse");
});

test("remove tudo que não é dígito do telefone", () => {
  const url = buildWhatsappUrl("oi", "12 3881-2335");
  assert.match(url, /^https:\/\/wa\.me\/1238812335\?text=oi$/);
});
