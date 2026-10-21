import test from "node:test";
import assert from "node:assert/strict";
import { validateAgendar } from "./agendar-schema.ts";

const valid = {
  name: "Maria Silva",
  phone: "(12) 99715-0806",
  email: "maria@example.com",
  instrument: "Violão",
  consent: true,
};

test("aceita um payload válido e normaliza", () => {
  const r = validateAgendar(valid);
  assert.equal(r.success, true);
  if (r.success) {
    assert.equal(r.data.name, "Maria Silva");
    assert.equal(r.data.instrument, "Violão");
  }
});

test("rejeita telefone vazio", () => {
  const r = validateAgendar({ ...valid, phone: "" });
  assert.equal(r.success, false);
  if (!r.success) assert.ok(r.errors.phone);
});

test("rejeita e-mail malformado", () => {
  const r = validateAgendar({ ...valid, email: "não-é-email" });
  assert.equal(r.success, false);
  if (!r.success) assert.ok(r.errors.email);
});

test("rejeita quando o honeypot está preenchido (spam)", () => {
  const r = validateAgendar({ ...valid, website: "http://spam.com" });
  assert.equal(r.success, false);
  if (!r.success) assert.ok(r.errors.website);
});

test("exige consentimento LGPD", () => {
  const r = validateAgendar({ ...valid, consent: false });
  assert.equal(r.success, false);
  if (!r.success) assert.ok(r.errors.consent);
});
