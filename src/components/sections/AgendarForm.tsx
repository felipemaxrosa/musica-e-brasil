"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const INSTRUMENTS = ["Canto", "Violão", "Guitarra", "Teclado", "Contrabaixo", "Bateria", "Ainda não sei"];
const KINDS = ["Criança", "Adolescente", "Adulto"];
const MODALITIES = ["Presencial", "Online ao vivo", "Tanto faz"];
const TIMES = ["Manhã", "Tarde", "Noite"];

const field =
  "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none";
const label = "mb-1.5 block text-sm text-muted";

type Status = "idle" | "loading" | "success" | "error";

/** Select com chevron dourado customizado (remove o nativo com appearance-none). */
function SelectField({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${field} cursor-pointer appearance-none pr-10`}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function AgendarForm({ waHref }: { waHref: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.consent = fd.get("consent") === "on";

    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setErrorMsg(data.error ?? "Confira os campos destacados e tente novamente.");
      setStatus("error");
    } catch {
      setErrorMsg("Falha de conexão. Você pode falar direto no WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-surface p-8 text-center">
        <div className="font-display text-2xl font-bold text-gold">Recebemos seu pedido! 🎉</div>
        <p className="mt-3 text-muted">
          Em breve a E-Brasil entra em contato para combinar sua aula experimental.
          Quer agilizar? Fale com a gente agora no WhatsApp.
        </p>
        <div className="mt-6">
          <Button href={waHref} external variant="whatsapp" size="lg">
            Chamar no WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* honeypot anti-spam (invisível para humanos) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div>
        <label className={label} htmlFor="name">Seu nome *</label>
        <input id="name" name="name" className={field} placeholder="Nome do responsável" />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="phone">WhatsApp / telefone *</label>
          <input id="phone" name="phone" inputMode="tel" className={field} placeholder="(12) 90000-0000" />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
        <div>
          <label className={label} htmlFor="email">E-mail (opcional)</label>
          <input id="email" name="email" type="email" className={field} placeholder="voce@email.com" />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="student">Nome do aluno (opcional)</label>
          <input id="student" name="student" className={field} placeholder="Se for para outra pessoa" />
        </div>
        <div>
          <label className={label} htmlFor="studentKind">O aluno é</label>
          <SelectField id="studentKind" name="studentKind">
            <option value="" disabled>Selecione</option>
            {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
          </SelectField>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="instrument">Instrumento</label>
          <SelectField id="instrument" name="instrument">
            <option value="" disabled>Selecione</option>
            {INSTRUMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
          </SelectField>
        </div>
        <div>
          <label className={label} htmlFor="modality">Modalidade</label>
          <SelectField id="modality" name="modality">
            <option value="" disabled>Selecione</option>
            {MODALITIES.map((m) => <option key={m} value={m}>{m}</option>)}
          </SelectField>
        </div>
        <div>
          <label className={label} htmlFor="preferredTime">Melhor horário</label>
          <SelectField id="preferredTime" name="preferredTime">
            <option value="" disabled>Selecione</option>
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </SelectField>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">Mensagem (opcional)</label>
        <textarea id="message" name="message" rows={3} className={field} placeholder="Conte o que você gostaria de aprender" />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-gold" />
        <span>
          Li e aceito a{" "}
          <Link href="/privacidade" className="text-gold underline-offset-2 hover:underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {errors.consent && <p className="text-sm text-red-400">{errors.consent}</p>}

      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

      <div className="pt-2">
        <Button type="submit" variant="gold" size="lg">
          {status === "loading" ? "Enviando…" : "Enviar e agendar"}
        </Button>
      </div>
    </form>
  );
}
