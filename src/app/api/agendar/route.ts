import { validateAgendar } from "@/lib/agendar-schema";

// Simples rate-limit em memória por IP (best-effort; zera a cada cold start).
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 60_000;
const MAX = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.t > WINDOW) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  cur.n += 1;
  return cur.n > MAX;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Requisição inválida." }, { status: 400 });
  }

  const result = validateAgendar(body as Record<string, unknown>);
  if (!result.success) {
    // inclui honeypot (website) e erros de validação → 400, sem efeitos colaterais
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const { createLead, sendLeadEmail } = await import("@/lib/leads");

  try {
    await createLead(result.data);
  } catch {
    return Response.json(
      { ok: false, error: "Não conseguimos registrar agora. Fale com a gente no WhatsApp." },
      { status: 502 },
    );
  }

  // e-mail é best-effort; não bloqueia a confirmação pro usuário
  void sendLeadEmail(result.data).catch(() => {});

  return Response.json({ ok: true });
}
