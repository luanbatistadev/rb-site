# Contact Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refazer `/contato` com layout dark coerente ao design system (Hero + ContactSection com card dark + métodos de contato + form em card branco) e envio real de e-mail via Resend Server Action.

**Architecture:** Server Action `'use server'` para envio; componente client `ContactSection` que reúne `ContactInfo` (server) e `ContactForm` (client com `useTransition`). Validação manual leve + honeypot + rate limit in-memory por IP. Resend opcional em dev (sem API key → loga no console e retorna ok).

**Tech Stack:** Next.js 16 (App Router, Server Actions), React 19, TypeScript, Tailwind v4, framer-motion, Resend SDK, Playwright.

**Spec:** `docs/superpowers/specs/2026-05-24-contact-page-redesign-design.md`

**Notas de estilo do projeto:**
- Sem comentários no código (auto-explicativo)
- Sem emojis
- Path alias `@/` para `src/`
- `"use client"` apenas onde necessário
- Não tem framework de testes unitários — TDD aqui acontece via Playwright (end-to-end). Libs puras (validation/rate-limit) são testadas integradamente através do submit do formulário.

---

## Resumo dos arquivos

### Novos
| Arquivo | Tipo | Responsabilidade |
|---|---|---|
| `src/lib/contact-validation.ts` | server util | Validar payload do form, tipos `ContactFormData`, `ValidationError` |
| `src/lib/contact-rate-limit.ts` | server util | Rate limit por IP (Map in-memory, 3 envios/10min) |
| `src/lib/contact-action.ts` | server action | Server Action que valida, rate-limita e envia via Resend |
| `src/components/ui/contact-method.tsx` | server component | Linha clicável: ícone + label + valor |
| `src/components/ui/contact-icons.tsx` | server component | SVGs inline (MailIcon, PhoneIcon, ChatIcon, LinkedInIcon, InstagramIcon, PinIcon, ClockIcon) |
| `src/components/sections/contact-info.tsx` | server component | Coluna esquerda (LogoRB, headings, lista de métodos) |
| `src/components/sections/contact-section.tsx` | client component | Wrapper dark com bg image + grid 2 colunas |

### Modificados
| Arquivo | O quê |
|---|---|
| `src/components/sections/contact-form.tsx` | Reescrita: novos campos (subject, budget, honeypot), `useTransition`, integração com Server Action, novo success state, banner de erro |
| `src/app/[locale]/contato/page.tsx` | Troca `<div bg-background><ContactForm/></div>` por `<ContactSection/>` |
| `src/app/[locale]/dictionaries/pt-BR.json` | Novas chaves em `contact` |
| `src/app/[locale]/dictionaries/en.json` | Novas chaves em `contact` |
| `tests/smoke.spec.ts` | Atualizar campos verificados, success text, adicionar checks de info methods e selects |
| `package.json` | Adicionar `resend` |

---

## Task 1: Instalar Resend

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar dependência**

```bash
cd /Users/luanbatistadev/Trabalho/RB_CD/rb-site && npm install resend
```

Expected: `package.json` ganha `"resend": "^4.x.x"` em `dependencies` e `package-lock.json` é atualizado.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend dependency for contact form"
```

---

## Task 2: Atualizar dicionários (pt-BR + en)

**Files:**
- Modify: `src/app/[locale]/dictionaries/pt-BR.json` (substituir bloco `contact`)
- Modify: `src/app/[locale]/dictionaries/en.json` (substituir bloco `contact`)

- [ ] **Step 1: Substituir bloco `contact` em pt-BR.json**

Substituir o atual `"contact": { ... }` por:

```json
  "contact": {
    "tag": "Contato",
    "title": "Agende uma consulta",
    "subtitle": "Conte sobre seu projeto. Respondemos em até 24h úteis.",
    "infoTitle": "Vamos construir juntos.",
    "infoSubtitle": "Escolha o canal que preferir ou preencha o formulário ao lado.",
    "methods": {
      "email": "E-mail",
      "phone": "Telefone",
      "whatsapp": "WhatsApp",
      "whatsappValue": "Conversar no WhatsApp",
      "linkedin": "LinkedIn",
      "linkedinValue": "linkedin.com/company/rb-computing-development",
      "instagram": "Instagram",
      "instagramValue": "@rbcdevelopment",
      "location": "Localização",
      "locationValue": "Rondônia, Brasil",
      "hours": "Horário",
      "hoursValue": "Seg–Sex, 9h–18h (BRT)"
    },
    "formTitle": "Fale com a gente",
    "name": "Nome",
    "email": "E-mail",
    "phone": "Telefone (opcional)",
    "subject": "Tipo de projeto",
    "subjectPlaceholder": "Selecione um tipo",
    "subjectOptions": {
      "mobile": "Mobile (iOS / Android / Flutter)",
      "web": "Web (Next.js / Front-end / Back-end)",
      "consulting": "Consultoria / Arquitetura",
      "legacy": "Modernização de legado",
      "maintenance": "Manutenção / Evolução",
      "other": "Outro"
    },
    "budget": "Orçamento estimado (opcional)",
    "budgetPlaceholder": "Selecione uma faixa",
    "budgetOptions": {
      "lt10k": "Até R$ 10k",
      "10to30k": "R$ 10k – R$ 30k",
      "30to80k": "R$ 30k – R$ 80k",
      "gt80k": "R$ 80k +",
      "undecided": "Ainda definindo"
    },
    "message": "Mensagem",
    "send": "Enviar mensagem",
    "sending": "Enviando...",
    "successTitle": "Recebemos sua mensagem",
    "successBody": "Retornaremos em até 24h úteis.",
    "sendAnother": "Enviar outra mensagem",
    "errors": {
      "validation": "Verifique os campos e tente novamente.",
      "rate_limit": "Muitas tentativas. Aguarde alguns minutos.",
      "send_failed": "Não foi possível enviar agora. Tente novamente em instantes."
    }
  }
```

- [ ] **Step 2: Substituir bloco `contact` em en.json**

```json
  "contact": {
    "tag": "Contact",
    "title": "Book a consultation",
    "subtitle": "Tell us about your project. We respond within 24h on business days.",
    "infoTitle": "Let's build together.",
    "infoSubtitle": "Pick your preferred channel or fill in the form on the side.",
    "methods": {
      "email": "Email",
      "phone": "Phone",
      "whatsapp": "WhatsApp",
      "whatsappValue": "Chat on WhatsApp",
      "linkedin": "LinkedIn",
      "linkedinValue": "linkedin.com/company/rb-computing-development",
      "instagram": "Instagram",
      "instagramValue": "@rbcdevelopment",
      "location": "Location",
      "locationValue": "Rondônia, Brazil",
      "hours": "Hours",
      "hoursValue": "Mon–Fri, 9am–6pm (BRT)"
    },
    "formTitle": "Reach out",
    "name": "Name",
    "email": "Email",
    "phone": "Phone (optional)",
    "subject": "Project type",
    "subjectPlaceholder": "Select a type",
    "subjectOptions": {
      "mobile": "Mobile (iOS / Android / Flutter)",
      "web": "Web (Next.js / Front-end / Back-end)",
      "consulting": "Consulting / Architecture",
      "legacy": "Legacy modernization",
      "maintenance": "Maintenance & Evolution",
      "other": "Other"
    },
    "budget": "Estimated budget (optional)",
    "budgetPlaceholder": "Select a range",
    "budgetOptions": {
      "lt10k": "Up to $2k",
      "10to30k": "$2k – $6k",
      "30to80k": "$6k – $16k",
      "gt80k": "$16k +",
      "undecided": "Still deciding"
    },
    "message": "Message",
    "send": "Send message",
    "sending": "Sending...",
    "successTitle": "We received your message",
    "successBody": "We'll get back to you within 24 business hours.",
    "sendAnother": "Send another message",
    "errors": {
      "validation": "Please check the fields and try again.",
      "rate_limit": "Too many attempts. Please wait a few minutes.",
      "send_failed": "We couldn't send your message right now. Please try again shortly."
    }
  }
```

- [ ] **Step 3: Verificar JSON válido**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/app/[locale]/dictionaries/pt-BR.json','utf8')); JSON.parse(require('fs').readFileSync('src/app/[locale]/dictionaries/en.json','utf8')); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 4: Commit**

```bash
git add src/app/\[locale\]/dictionaries/pt-BR.json src/app/\[locale\]/dictionaries/en.json
git commit -m "feat(i18n): add new contact page strings (methods, selects, states)"
```

---

## Task 3: Lib de validação

**Files:**
- Create: `src/lib/contact-validation.ts`

- [ ] **Step 1: Criar `src/lib/contact-validation.ts`**

```ts
export type SubjectKey =
  | "mobile"
  | "web"
  | "consulting"
  | "legacy"
  | "maintenance"
  | "other";

export type BudgetKey =
  | "lt10k"
  | "10to30k"
  | "30to80k"
  | "gt80k"
  | "undecided";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: SubjectKey | "";
  budget: BudgetKey | "";
  message: string;
  company: string;
};

export type ValidationError =
  | "invalid_name"
  | "invalid_email"
  | "invalid_subject"
  | "invalid_message"
  | "spam";

const SUBJECTS: readonly SubjectKey[] = [
  "mobile",
  "web",
  "consulting",
  "legacy",
  "maintenance",
  "other",
];

const BUDGETS: readonly BudgetKey[] = [
  "lt10k",
  "10to30k",
  "30to80k",
  "gt80k",
  "undecided",
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function parseFormData(form: FormData): ContactFormData {
  return {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    subject: String(form.get("subject") ?? "").trim() as ContactFormData["subject"],
    budget: String(form.get("budget") ?? "").trim() as ContactFormData["budget"],
    message: String(form.get("message") ?? "").trim(),
    company: String(form.get("company") ?? "").trim(),
  };
}

export function validate(data: ContactFormData): ValidationError | null {
  if (data.company) return "spam";
  if (!data.name || data.name.length < 2) return "invalid_name";
  if (!data.email || !EMAIL_RE.test(data.email)) return "invalid_email";
  if (!data.subject || !SUBJECTS.includes(data.subject as SubjectKey)) return "invalid_subject";
  if (data.budget && !BUDGETS.includes(data.budget as BudgetKey)) return "invalid_subject";
  if (!data.message || data.message.length < 10) return "invalid_message";
  return null;
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npx tsc --noEmit
```

Expected: sem erros relacionados ao novo arquivo.

- [ ] **Step 3: Commit**

```bash
git add src/lib/contact-validation.ts
git commit -m "feat(contact): add form validation lib"
```

---

## Task 4: Lib de rate limit

**Files:**
- Create: `src/lib/contact-rate-limit.ts`

- [ ] **Step 1: Criar `src/lib/contact-rate-limit.ts`**

```ts
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 3;

const hits = new Map<string, number[]>();

export function checkLimit(ip: string, now: number = Date.now()): boolean {
  const cutoff = now - WINDOW_MS;
  const previous = hits.get(ip) ?? [];
  const recent = previous.filter((t) => t > cutoff);

  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function resetLimit(ip: string): void {
  hits.delete(ip);
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/contact-rate-limit.ts
git commit -m "feat(contact): add in-memory rate limit by IP"
```

---

## Task 5: Server Action de envio

**Files:**
- Create: `src/lib/contact-action.ts`

- [ ] **Step 1: Criar `src/lib/contact-action.ts`**

```ts
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
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
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

  const ip = await getClientIp();
  if (!checkLimit(ip)) return { ok: false, error: "rate_limit" };

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
      subject: `[Contato Site] ${SUBJECT_LABELS[data.subject] ?? data.subject} — ${data.name}`,
      ...data,
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
```

- [ ] **Step 2: Verificar typecheck**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/contact-action.ts
git commit -m "feat(contact): server action with resend, rate limit and honeypot"
```

---

## Task 6: Ícones inline para contato

**Files:**
- Create: `src/components/ui/contact-icons.tsx`

- [ ] **Step 1: Criar `src/components/ui/contact-icons.tsx`**

```tsx
type IconProps = { className?: string };

const base = "h-6 w-6 shrink-0";

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function ChatIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4Z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/contact-icons.tsx
git commit -m "feat(ui): add contact icons (mail, phone, chat, linkedin, instagram, pin, clock)"
```

---

## Task 7: Componente `ContactMethod`

**Files:**
- Create: `src/components/ui/contact-method.tsx`

- [ ] **Step 1: Criar `src/components/ui/contact-method.tsx`**

```tsx
import Link from "next/link";

type ContactMethodProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function ContactMethod({ icon, label, value, href, external }: ContactMethodProps) {
  const content = (
    <span className="flex items-start gap-4">
      <span className="mt-0.5 text-white/60 transition-colors duration-200 group-hover:text-white">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm text-white/50">{label}</span>
        <span className="text-base text-white/80 transition-colors duration-200 group-hover:text-white">
          {value}
        </span>
      </span>
    </span>
  );

  if (!href) {
    return <div className="group flex items-start">{content}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-start">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="group flex items-start">
      {content}
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/contact-method.tsx
git commit -m "feat(ui): add ContactMethod row component"
```

---

## Task 8: Componente `ContactInfo` (coluna esquerda)

**Files:**
- Create: `src/components/sections/contact-info.tsx`

- [ ] **Step 1: Criar `src/components/sections/contact-info.tsx`**

```tsx
import { LogoRB } from "@/components/ui/logo-rb";
import { ContactMethod } from "@/components/ui/contact-method";
import {
  MailIcon,
  PhoneIcon,
  ChatIcon,
  LinkedInIcon,
  InstagramIcon,
  PinIcon,
  ClockIcon,
} from "@/components/ui/contact-icons";

type ContactInfoDict = {
  infoTitle: string;
  infoSubtitle: string;
  methods: {
    email: string;
    phone: string;
    whatsapp: string;
    whatsappValue: string;
    linkedin: string;
    linkedinValue: string;
    instagram: string;
    instagramValue: string;
    location: string;
    locationValue: string;
    hours: string;
    hoursValue: string;
  };
};

type ContactInfoProps = {
  dict: ContactInfoDict;
};

const EMAIL = "luanbatistadev@gmail.com";
const PHONE_DISPLAY = "+55 69 99295-0959";
const PHONE_TEL = "+5569992950959";
const WHATSAPP_URL = "https://wa.me/5569992950959";
const LINKEDIN_URL = "https://linkedin.com/company/rb-computing-development";
const INSTAGRAM_URL = "https://www.instagram.com/rbcdevelopment";

export function ContactInfo({ dict }: ContactInfoProps) {
  return (
    <div data-testid="contact-info" className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <LogoRB width={49} height={44} className="text-white opacity-70" />
        <div className="flex flex-col leading-[1.4] text-left">
          <span className="text-[12.74px] text-white/60">Computing</span>
          <span className="text-[12.74px] text-white/60">Development.</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[32px] font-medium leading-[1.2] tracking-[-0.32px] text-white">
          {dict.infoTitle}
        </h2>
        <p className="max-w-md text-[16px] leading-[1.5] text-white/70">
          {dict.infoSubtitle}
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        <li>
          <ContactMethod
            icon={<MailIcon />}
            label={dict.methods.email}
            value={EMAIL}
            href={`mailto:${EMAIL}`}
          />
        </li>
        <li>
          <ContactMethod
            icon={<PhoneIcon />}
            label={dict.methods.phone}
            value={PHONE_DISPLAY}
            href={`tel:${PHONE_TEL}`}
          />
        </li>
        <li>
          <ContactMethod
            icon={<ChatIcon />}
            label={dict.methods.whatsapp}
            value={dict.methods.whatsappValue}
            href={WHATSAPP_URL}
            external
          />
        </li>
        <li>
          <ContactMethod
            icon={<LinkedInIcon />}
            label={dict.methods.linkedin}
            value={dict.methods.linkedinValue}
            href={LINKEDIN_URL}
            external
          />
        </li>
        <li>
          <ContactMethod
            icon={<InstagramIcon />}
            label={dict.methods.instagram}
            value={dict.methods.instagramValue}
            href={INSTAGRAM_URL}
            external
          />
        </li>
        <li>
          <ContactMethod
            icon={<PinIcon />}
            label={dict.methods.location}
            value={dict.methods.locationValue}
          />
        </li>
        <li>
          <ContactMethod
            icon={<ClockIcon />}
            label={dict.methods.hours}
            value={dict.methods.hoursValue}
          />
        </li>
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/contact-info.tsx
git commit -m "feat(contact): add ContactInfo section with 7 contact methods"
```

---

## Task 9: Reescrever `ContactForm`

**Files:**
- Modify: `src/components/sections/contact-form.tsx` (substituir por completo)

- [ ] **Step 1: Substituir conteúdo de `src/components/sections/contact-form.tsx`**

```tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { submitContactForm } from "@/lib/contact-action";
import { LogoRB } from "@/components/ui/logo-rb";
import { ArrowIcon } from "@/components/ui/contact-icons";

type ContactFormDict = {
  formTitle: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  subjectPlaceholder: string;
  subjectOptions: {
    mobile: string;
    web: string;
    consulting: string;
    legacy: string;
    maintenance: string;
    other: string;
  };
  budget: string;
  budgetPlaceholder: string;
  budgetOptions: {
    lt10k: string;
    "10to30k": string;
    "30to80k": string;
    gt80k: string;
    undecided: string;
  };
  message: string;
  send: string;
  sending: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  errors: {
    validation: string;
    rate_limit: string;
    send_failed: string;
  };
};

type ContactFormProps = {
  dict: ContactFormDict;
};

type Status =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success" };

const inputClasses =
  "w-full rounded-xl border border-foreground/10 bg-white px-5 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/20";

const selectClasses =
  "w-full appearance-none rounded-xl border border-foreground/10 bg-white px-5 py-3.5 text-sm text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/20";

export function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
        return;
      }
      const message =
        result.error === "rate_limit"
          ? dict.errors.rate_limit
          : result.error === "validation"
          ? dict.errors.validation
          : dict.errors.send_failed;
      setStatus({ kind: "error", message });
    });
  }

  function reset() {
    setStatus({ kind: "idle" });
  }

  if (status.kind === "success") {
    return (
      <motion.div
        data-testid="contact-form"
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 rounded-xl bg-white p-8 py-12 text-center md:p-10"
      >
        <LogoRB width={56} height={50} className="text-foreground opacity-80" />
        <h3 className="text-[24px] font-semibold leading-[1.2] text-foreground">
          {dict.successTitle}
        </h3>
        <p className="max-w-sm text-[16px] leading-[1.5] text-muted">
          {dict.successBody}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex h-12 items-center gap-3 rounded-full border border-foreground/10 bg-white pl-8 pr-1 text-[16px] font-semibold text-foreground transition-colors duration-200 hover:border-foreground/20 cursor-pointer"
        >
          {dict.sendAnother}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-accent-from to-accent-to">
            <ArrowIcon className="h-4 w-4 text-white" />
          </span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-testid="contact-form"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="rounded-xl bg-white p-6 md:p-8"
    >
      <motion.h3
        variants={fadeInUp}
        className="mb-6 text-[20px] font-semibold leading-[1.2] text-foreground"
      >
        {dict.formTitle}
      </motion.h3>

      <motion.form
        ref={formRef}
        variants={fadeInUp}
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground/70">
              {dict.name}
            </label>
            <input id="name" name="name" type="text" required placeholder={dict.name} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground/70">
              {dict.email}
            </label>
            <input id="email" name="email" type="email" required placeholder={dict.email} className={inputClasses} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground/70">
              {dict.phone}
            </label>
            <input id="phone" name="phone" type="tel" placeholder={dict.phone} className={inputClasses} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground/70">
              {dict.subject}
            </label>
            <select id="subject" name="subject" required defaultValue="" className={selectClasses}>
              <option value="" disabled>{dict.subjectPlaceholder}</option>
              <option value="mobile">{dict.subjectOptions.mobile}</option>
              <option value="web">{dict.subjectOptions.web}</option>
              <option value="consulting">{dict.subjectOptions.consulting}</option>
              <option value="legacy">{dict.subjectOptions.legacy}</option>
              <option value="maintenance">{dict.subjectOptions.maintenance}</option>
              <option value="other">{dict.subjectOptions.other}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm font-medium text-foreground/70">
            {dict.budget}
          </label>
          <select id="budget" name="budget" defaultValue="" className={selectClasses}>
            <option value="">{dict.budgetPlaceholder}</option>
            <option value="lt10k">{dict.budgetOptions.lt10k}</option>
            <option value="10to30k">{dict.budgetOptions["10to30k"]}</option>
            <option value="30to80k">{dict.budgetOptions["30to80k"]}</option>
            <option value="gt80k">{dict.budgetOptions.gt80k}</option>
            <option value="undecided">{dict.budgetOptions.undecided}</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground/70">
            {dict.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={dict.message}
            className={`${inputClasses} resize-none`}
          />
        </div>

        {status.kind === "error" && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="group mt-2 inline-flex h-13 w-full items-center justify-between rounded-full bg-foreground pl-8 pr-1 text-base font-semibold text-white transition-colors duration-200 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          <span>{isPending ? dict.sending : dict.send}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-accent-from to-accent-to transition-transform duration-200 group-hover:scale-110">
            <ArrowIcon className="h-4 w-4 text-white" />
          </span>
        </button>
      </motion.form>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/contact-form.tsx
git commit -m "feat(contact): rewrite ContactForm with new fields, useTransition, server action"
```

---

## Task 10: Componente `ContactSection` (wrapper dark)

**Files:**
- Create: `src/components/sections/contact-section.tsx`

- [ ] **Step 1: Criar `src/components/sections/contact-section.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/sections/contact-form";

type ContactSectionProps = {
  dict: React.ComponentProps<typeof ContactInfo>["dict"] &
    React.ComponentProps<typeof ContactForm>["dict"];
};

export function ContactSection({ dict }: ContactSectionProps) {
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
    setBgSrc(pickRandomBg());
  }, []);

  return (
    <section data-testid="contact-section" className="bg-background px-6 pb-20 pt-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-300 overflow-hidden rounded-xl"
      >
        <div className="absolute inset-0">
          {bgSrc && (
            <Image
              src={bgSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-[#0b0b0b]/85" />
        </div>

        <motion.div
          variants={fadeInUp}
          className="relative z-10 grid grid-cols-1 gap-10 px-6 py-12 md:px-10 md:py-15 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <ContactInfo dict={dict} />
          </div>
          <div className="lg:col-span-7">
            <ContactForm dict={dict} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar typecheck**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/contact-section.tsx
git commit -m "feat(contact): add ContactSection wrapper with dark bg and 2-col grid"
```

---

## Task 11: Atualizar página de contato

**Files:**
- Modify: `src/app/[locale]/contato/page.tsx`

- [ ] **Step 1: Substituir conteúdo de `src/app/[locale]/contato/page.tsx`**

```tsx
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/sections/contact-section";
import { ContactHero } from "@/components/sections/contact-hero";

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header dict={dict.nav} activePath="/contato" />
      <main>
        <ContactHero dict={dict.contact} />
        <ContactSection dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} locale={locale} navDict={dict.nav} />
    </>
  );
}
```

- [ ] **Step 2: Rodar build e verificar erros**

```bash
npx next build
```

Expected: build passa. Se faltar alguma chave de dict, vai dar erro de TS — corrigir antes de seguir.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/contato/page.tsx
git commit -m "feat(contact): swap white form strip for ContactSection on contact page"
```

---

## Task 12: Atualizar Playwright smoke tests

**Files:**
- Modify: `tests/smoke.spec.ts`

- [ ] **Step 1: Atualizar `localeConfig` em `tests/smoke.spec.ts`**

Substituir o objeto `localeConfig` (linhas no topo) por:

```ts
const localeConfig = {
  "pt-BR": {
    homeUrl: "/",
    contactUrl: "/contato",
    contactLinkHref: "/pt-BR/contato",
    browserLocale: "pt-BR",
    heroText: "DESENVOLVIMENTO",
    successText: "Recebemos sua mensagem",
  },
  en: {
    homeUrl: "/en",
    contactUrl: "/en/contato",
    contactLinkHref: "/en/contato",
    browserLocale: "en-US",
    heroText: "DEVELOPMENT",
    successText: "We received your message",
  },
} as const;
```

- [ ] **Step 2: Atualizar bloco `${locale} - Contact` para refletir novos campos**

Substituir todo o `test.describe(\`${locale} - Contact\`, () => { ... })` por:

```ts
  test.describe(`${locale} - Contact`, () => {
    test.use({ locale: config.browserLocale });

    test("page loads with status 200", async ({ page }) => {
      const response = await page.goto(config.contactUrl);
      expect(response?.status()).toBe(200);
    });

    test("contact info methods are visible", async ({ page }) => {
      await page.goto(config.contactUrl);
      await expect(page.getByTestId("contact-info")).toBeVisible();
      const links = page.getByTestId("contact-info").locator("a");
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(5);
    });

    test("form fields exist", async ({ page }) => {
      await page.goto(config.contactUrl);
      await expect(page.locator("#name")).toBeVisible();
      await expect(page.locator("#email")).toBeVisible();
      await expect(page.locator("#phone")).toBeVisible();
      await expect(page.locator("#subject")).toBeVisible();
      await expect(page.locator("#budget")).toBeVisible();
      await expect(page.locator("#message")).toBeVisible();
    });

    test("form validation requires name", async ({ page }) => {
      await page.goto(config.contactUrl);
      const nameInput = page.locator("#name");
      await expect(nameInput).toHaveAttribute("required", "");
    });

    test("form submits successfully", async ({ page }) => {
      await page.goto(config.contactUrl);
      await page.fill("#name", "Teste");
      await page.fill("#email", "teste@teste.com");
      await page.fill("#phone", "11999999999");
      await page.selectOption("#subject", "web");
      await page.fill("#message", "Mensagem de teste com mais de dez caracteres.");
      await page.click("button[type='submit']");
      await expect(page.getByText(config.successText)).toBeVisible({ timeout: 10000 });
    });
  });
```

- [ ] **Step 3: Rodar smoke tests**

```bash
npm run test:smoke
```

Expected: todos os testes passam em pt-BR e en, desktop e mobile.

- [ ] **Step 4: Commit**

```bash
git add tests/smoke.spec.ts
git commit -m "test(contact): update smoke tests for new form fields and success text"
```

---

## Task 13: Atualizar snapshot de visual regression

**Files:**
- Modify: `tests/visual.spec.ts-snapshots/*` (gerados automaticamente)

- [ ] **Step 1: Iniciar dev server e abrir `/contato` no browser**

```bash
npm run dev
```

Abrir http://localhost:3000/contato e http://localhost:3000/en/contato manualmente. Conferir:
- Hero idêntico aos outros heros.
- `ContactSection` com card dark + bg image + overlay 80%.
- Coluna esquerda mostra os 7 métodos com hover funcionando.
- Form em card branco, selects estilizados, botão com bolinha gradient à direita.
- Submit (sem `RESEND_API_KEY` no env) leva ao card de sucesso com LogoRB.
- Estado de erro: preencher só name e submetar — deve mostrar banner vermelho.
- Honeypot: via DevTools, preencher `input[name="company"]` e submeter — recebe `ok:true` mas nada é enviado (verificar no console do server).
- Responsivo: testar largura ~375px — colunas devem empilhar.

Parar o server (`Ctrl+C`).

- [ ] **Step 2: Atualizar snapshot visual**

```bash
npm run test:update -- --grep "contact"
```

Expected: novos PNGs gerados em `tests/visual.spec.ts-snapshots/`.

- [ ] **Step 3: Rodar visual tests completos**

```bash
npm run test:visual
```

Expected: passa.

- [ ] **Step 4: Commit snapshots**

```bash
git add tests/visual.spec.ts-snapshots/
git commit -m "test(visual): update contact page snapshots after redesign"
```

---

## Task 14: Code-simplifier + verificação final

**Files:** nenhum específico — limpeza geral.

- [ ] **Step 1: Rodar code-simplifier nos arquivos novos/modificados**

Dispatch via Agent:
```
subagent_type: code-simplifier:code-simplifier
prompt: "Simplificar os arquivos modificados/criados para a página de contato. Lista:
- src/lib/contact-validation.ts
- src/lib/contact-rate-limit.ts
- src/lib/contact-action.ts
- src/components/ui/contact-icons.tsx
- src/components/ui/contact-method.tsx
- src/components/sections/contact-info.tsx
- src/components/sections/contact-form.tsx
- src/components/sections/contact-section.tsx
- src/app/[locale]/contato/page.tsx

Restrições estritas do projeto (CLAUDE.md):
- SEM comentários no código
- SEM emojis
- KISS / DRY / YAGNI
- Preservar funcionalidade — nada de mudar contratos de tipos públicos
- Não tocar em dicts JSON nem em testes"
```

- [ ] **Step 2: Aplicar sugestões aceitas e rodar tipo-check + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: ambos passam.

- [ ] **Step 3: Build final**

```bash
npm run build
```

Expected: build passa sem warnings novos.

- [ ] **Step 4: Rodar suite completa de testes**

```bash
npm test
```

Expected: tudo passa.

- [ ] **Step 5: Commit final (se houve simplificações)**

```bash
git add -A
git commit -m "refactor(contact): apply code-simplifier suggestions"
```

---

## Task 15: Documentar variáveis de ambiente

**Files:**
- Create: `.env.example`
- Modify: `README.md` (se existir, seção de setup)

- [ ] **Step 1: Verificar se `.env.example` existe**

```bash
ls -la /Users/luanbatistadev/Trabalho/RB_CD/rb-site/.env.example 2>/dev/null
```

- [ ] **Step 2: Criar/atualizar `.env.example`**

Conteúdo:
```
# Resend (envio de e-mail do formulário de contato)
# Obtenha em: https://resend.com/api-keys
RESEND_API_KEY=

# Caixa que recebe os contatos do site
CONTACT_TO_EMAIL=luanbatistadev@gmail.com

# Remetente (precisa de domínio verificado no Resend; em dev pode usar onboarding@resend.dev)
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "docs: add .env.example with Resend contact form vars"
```

---

## Self-review checklist

- [x] Cada requisito da spec tem task associada:
  - Hero mantida → Task 11 (page.tsx)
  - ContactSection wrapper dark → Task 10
  - ContactInfo + 7 métodos → Task 8
  - ContactForm com novos campos + honeypot → Task 9
  - Server Action Resend → Task 5
  - Validação → Task 3
  - Rate limit → Task 4
  - i18n pt-BR + en → Task 2
  - Estados idle/submitting/success/error → Task 9
  - Ícones → Task 6
  - Tests smoke + visual → Task 12 + 13
  - Env vars docs → Task 15
- [x] Sem placeholders / TBDs
- [x] Tipos consistentes entre tasks (SubjectKey, BudgetKey, ContactActionResult, ContactFormData usados consistentemente em validation, action e form)
- [x] Cada step tem código completo ou comando exato
- [x] Frequent commits — 14 commits previstos

## Estimativa

15 tasks, ~3-5 minutos por task (a maioria), 2 tasks mais longas (9 e 13). Total ~60-90 minutos de execução supervisionada.
