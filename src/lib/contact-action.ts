"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { parseFormData, validate } from "./contact-validation";
import { checkLimit } from "./contact-rate-limit";

export type ContactActionResult =
  | { ok: true }
  | { ok: false; error: "validation" | "rate_limit" | "send_failed" };

const SUBJECT_LABELS: Record<string, string> = {
  mobile: "Mobile (iOS / Android / Flutter)",
  web: "Web (Next.js / Front-end / Back-end)",
  consulting: "Consultoria / Arquitetura",
  legacy: "Modernização de legado",
  maintenance: "Manutenção / Evolução",
  other: "Outro",
};

const BUDGET_LABELS: Record<string, string> = {
  lt10k: "Até R$ 10k",
  "10to30k": "R$ 10k – R$ 30k",
  "30to80k": "R$ 30k – R$ 80k",
  gt80k: "R$ 80k +",
  undecided: "Ainda definindo",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(data: ReturnType<typeof parseFormData>): string {
  const rows: Array<[string, string]> = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["Telefone", data.phone || "—"],
    ["Tipo de projeto", SUBJECT_LABELS[data.subject] ?? "—"],
    ["Orçamento", data.budget ? BUDGET_LABELS[data.budget] ?? "—" : "—"],
  ];
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`
    )
    .join("");
  const messageHtml = escapeHtml(data.message).replace(/\n/g, "<br>");
  return `
    <h1 style="font-family:system-ui,sans-serif">Novo contato pelo site</h1>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${tableRows}</table>
    <h2 style="font-family:system-ui,sans-serif;font-size:16px;margin-top:24px">Mensagem</h2>
    <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">${messageHtml}</p>
  `;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function submitContactForm(formData: FormData): Promise<ContactActionResult> {
  const data = parseFormData(formData);

  const validationError = validate(data);
  if (validationError === "spam") return { ok: true };
  if (validationError) return { ok: false, error: "validation" };

  if (process.env.NODE_ENV === "production") {
    const ip = await getClientIp();
    if (!checkLimit(ip)) return { ok: false, error: "rate_limit" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "luanbatistadev@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY missing in production");
      return { ok: false, error: "send_failed" };
    }
    console.info("[contact] dev mode (no API key) — would send:", {
      to,
      from,
      ...data,
      subject: `[Contato Site] ${SUBJECT_LABELS[data.subject] ?? data.subject} — ${data.name}`,
    });
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      to,
      from,
      replyTo: data.email,
      subject: `[Contato Site] ${SUBJECT_LABELS[data.subject] ?? data.subject} — ${data.name}`,
      html: buildEmailHtml(data),
    });
    if (result.error) {
      console.error("[contact] resend error", result.error);
      return { ok: false, error: "send_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] unexpected send error", err);
    return { ok: false, error: "send_failed" };
  }
}
