import test from "node:test";
import assert from "node:assert/strict";
import { buildWhatsappUrl, normalizeBrazilPhone } from "./whatsapp.ts";

test("monta wa.me com número só dígitos e texto escapado", () => {
  const url = buildWhatsappUrl("Olá! Tenho interesse", "+55 (12) 99715-0806");
  assert.equal(url, "https://wa.me/5512997150806?text=Ol%C3%A1!%20Tenho%20interesse");
});

test("remove tudo que não é dígito do telefone", () => {
  const url = buildWhatsappUrl("oi", "12 3881-2335");
  assert.match(url, /^https:\/\/wa\.me\/1238812335\?text=oi$/);
});

test("normalizeBrazilPhone adiciona o DDI 55 quando falta", () => {
  assert.equal(normalizeBrazilPhone("12981472329"), "5512981472329");
  assert.equal(normalizeBrazilPhone("(12) 98147-2329"), "5512981472329");
  assert.equal(normalizeBrazilPhone("1238812335"), "551238812335"); // fixo (10 dígitos)
});

test("normalizeBrazilPhone mantém o 55 quando já presente", () => {
  assert.equal(normalizeBrazilPhone("+55 12 98147-2329"), "5512981472329");
  assert.equal(normalizeBrazilPhone("5512981472329"), "5512981472329");
});

test("normalizeBrazilPhone remove zero de discagem à esquerda", () => {
  assert.equal(normalizeBrazilPhone("012981472329"), "5512981472329");
});
