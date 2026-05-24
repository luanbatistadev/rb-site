# Contact Page Redesign — Design Spec

**Data:** 2026-05-24
**Autor:** RB Computing Development
**Status:** Aprovado para implementação

## Problema

A página `/contato` atual quebra a coerência visual do site:
- Faixa branca chapada com inputs simples — sem o tratamento dark / imagem usado em hero, CTA, footer e services.
- Apenas o formulário; nenhuma alternativa de contato direta (e-mail, telefone, WhatsApp, social) — esses dados só aparecem no footer.
- `handleSubmit` é um stub: marca `success` sem enviar nada.
- Estados de envio pobres (sucesso/erro como blocos minimalistas).

## Objetivo

Refazer `/contato` para que:
1. Combine visualmente com o resto do site (Opção A — "Dark Studio").
2. Apresente múltiplos métodos de contato além do formulário.
3. Envie e-mail real para a caixa de contato configurada.
4. Tenha estados de envio (idle, submitting, success, error) coerentes com o design system.
5. Seja localizado em pt-BR e en.

## Não-objetivos

- Não redesenhar a Hero (`ContactHero`) — ela já casa com `/servicos` e `/projetos`.
- Não criar painel admin para visualizar mensagens — e-mail é suficiente.
- Não integrar com CRM ou banco de dados — somente envio de e-mail.
- Sem captcha visível — usar apenas honeypot anti-bot (KISS, YAGNI).

---

## Arquitetura visual

### Estrutura geral

```
<Header />
<main>
  <ContactHero />               ← mantém como está
  <ContactSection />            ← NOVO componente, substitui o atual <ContactForm /> em faixa branca
</main>
<Footer />
```

### `ContactSection` (novo)

Card grande dark com imagem de fundo + overlay (mesmo tratamento do `Cta` e `Footer`), contendo dois sub-blocos em grid 2 colunas no desktop, 1 coluna no mobile.

```
ContactSection (bg-background px-6 py-20)
└─ div.relative.overflow-hidden.rounded-xl.max-w-300.mx-auto
   ├─ <bg image + bg-[#0b0b0b]/80 overlay>
   └─ div.relative.z-10.px-10.py-15 (responsivo)
       └─ grid grid-cols-1 lg:grid-cols-12 gap-10
           ├─ Coluna esquerda (lg:col-span-5) — Info
           │   ├─ LogoRB + "Computing Development."
           │   ├─ <h2> Heading principal
           │   ├─ <p> Subtítulo curto
           │   └─ Lista de métodos de contato (ContactMethod[])
           └─ Coluna direita (lg:col-span-7) — Form
               └─ Card branco rounded-xl p-8 com <ContactForm />
```

### Coluna de informações (esquerda)

**Header do bloco**: LogoRB (49×44, opacity-70) + texto "Computing Development." (igual ao Cta).

**Heading**: 32–36px, font-medium, white, tracking apertado.

**Subtítulo**: 18px, white/70, max-width controlada.

**Lista de métodos** (`ContactMethod`):
Cada item é uma linha clicável com ícone (24×24, stroke branco) + label + valor.

Hover: muda `text-white/70 → text-white`, ícone idem, transição 200ms.

Itens iniciais:
| Ícone | Tipo      | Valor                           | Ação                                                                 |
|-------|-----------|---------------------------------|----------------------------------------------------------------------|
| mail  | E-mail    | `luanbatistadev@gmail.com`      | `mailto:luanbatistadev@gmail.com`                                    |
| phone | Telefone  | `+55 69 99295-0959`             | `tel:+5569992950959`                                                 |
| chat  | WhatsApp  | `Conversar no WhatsApp`         | `https://wa.me/5569992950959` (target=_blank)                        |
| in    | LinkedIn  | `linkedin.com/company/...`      | link externo                                                         |
| ig    | Instagram | `@rbcdevelopment`               | link externo                                                         |
| pin   | Local     | `Rondônia, Brasil`              | sem link                                                             |
| clock | Horário   | `Seg–Sex, 9h–18h (BRT)`         | sem link                                                             |

### Coluna do formulário (direita)

Card branco `rounded-xl bg-white p-6 md:p-8` (mesmo padrão dos service cards).

**Campos** (ordem):
1. `Nome` (text, required) + `E-mail` (email, required) — grid 2 colunas no desktop.
2. `Telefone` (tel, opcional) + `Assunto / Tipo de projeto` (select, required) — grid 2 colunas no desktop.
3. `Orçamento estimado` (select, opcional) — full width.
4. `Mensagem` (textarea, required, 5 rows) — full width.
5. Honeypot oculto: `<input name="company" tabIndex={-1} autoComplete="off" className="sr-only" />`.

**Select "Assunto" — opções (i18n):**
- Mobile (iOS / Android / Flutter)
- Web (Next.js / Front-end / Back-end)
- Consultoria / Arquitetura
- Modernização de legado
- Manutenção / Evolução
- Outro

**Select "Orçamento" — opções (i18n):**
- Até R$ 10k
- R$ 10k – R$ 30k
- R$ 30k – R$ 80k
- R$ 80k +
- Ainda definindo

**Botão de envio**: largura total, altura 52px, estilo accent gradient com seta — replica o padrão dos CTAs (`pl-8 pr-1` + bola gradient à direita com ícone arrow).
- `idle`: "Enviar mensagem" (label do dict)
- `submitting`: spinner + "Enviando..." (disabled, cursor-not-allowed)
- `success`: substitui o form inteiro pelo card de sucesso (ver abaixo)
- `error`: banner inline acima do botão (`bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm`) — form continua editável.

### Estado de sucesso

Substitui o `<form>` por um card centralizado dentro do mesmo card branco:

```
<div className="flex flex-col items-center text-center py-10 gap-5">
  <LogoRB width={56} height={50} />
  <h3>{dict.successTitle}</h3>            // "Recebemos sua mensagem"
  <p>{dict.successBody}</p>               // "Retornaremos em até 24h úteis."
  <button onClick={reset}>{dict.sendAnother}</button>
</div>
```

Botão "Enviar outra mensagem" é o mesmo estilo do botão de envio, porém em variante outline (dark fundo branco).

---

## Server Action — envio de e-mail

### Provedor: Resend

- SDK: `resend` (instalar como dep)
- Sem rota API — Server Action `'use server'` em `src/lib/contact-action.ts`
- Importada e usada pelo client component via `useTransition` para o estado `submitting`

### Variáveis de ambiente

`.env.local`:
```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=luanbatistadev@gmail.com
CONTACT_FROM_EMAIL=contato@rbcomputing.dev   # precisa de domínio verificado no Resend
```

Validação no início da action: se faltar `RESEND_API_KEY`, retornar erro genérico com log.

### Validação

Validação manual leve (sem zod — KISS, dep extra desnecessária pra 5 campos):

```ts
function validate(data: ContactFormData) {
  if (!data.name || data.name.length < 2) return "invalid_name";
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return "invalid_email";
  if (!data.subject) return "invalid_subject";
  if (!data.message || data.message.length < 10) return "invalid_message";
  if (data.company) return "spam";   // honeypot
  return null;
}
```

### Rate limit

In-memory `Map<ip, timestamp[]>` no escopo do módulo. Máx 3 envios por IP em 10 minutos. IP via `headers().get('x-forwarded-for')`. Suficiente pra um site institucional — se virar problema, troca depois (YAGNI).

### Template do e-mail

HTML simples, sem libs de template (KISS):

```
Assunto: [Contato Site] {subject} — {name}
Reply-To: {email}

<h1>Novo contato pelo site</h1>
<table>
  <tr><th>Nome</th><td>{name}</td></tr>
  <tr><th>E-mail</th><td>{email}</td></tr>
  <tr><th>Telefone</th><td>{phone || '—'}</td></tr>
  <tr><th>Assunto</th><td>{subject}</td></tr>
  <tr><th>Orçamento</th><td>{budget || '—'}</td></tr>
</table>
<h2>Mensagem</h2>
<p>{message com line breaks preservados}</p>
<hr>
<p>Enviado de rbcomputing.dev em {timestamp}</p>
```

### Retorno da action

```ts
type ContactActionResult =
  | { ok: true }
  | { ok: false; error: "validation" | "rate_limit" | "send_failed" | "spam" };
```

`"spam"` retorna `{ ok: true }` propositalmente — não enviamos e o bot acha que funcionou.

---

## i18n

Novas chaves em `dict.contact`:

```jsonc
"contact": {
  "tag": "Contato",
  "title": "Agende uma consulta",
  "subtitle": "...",

  // Coluna esquerda
  "infoTitle": "Vamos construir juntos.",
  "infoSubtitle": "Conte sobre seu projeto. Respondemos em até 24h úteis.",
  "methods": {
    "email": "E-mail",
    "phone": "Telefone",
    "whatsapp": "WhatsApp",
    "whatsappCta": "Conversar no WhatsApp",
    "linkedin": "LinkedIn",
    "instagram": "Instagram",
    "location": "Localização",
    "locationValue": "Rondônia, Brasil",
    "hours": "Horário",
    "hoursValue": "Seg–Sex, 9h–18h (BRT)"
  },

  // Formulário
  "name": "Nome",
  "email": "E-mail",
  "phone": "Telefone (opcional)",
  "subject": "Tipo de projeto",
  "subjectPlaceholder": "Selecione...",
  "subjectOptions": {
    "mobile": "Mobile (iOS / Android / Flutter)",
    "web": "Web (Next.js / Front-end / Back-end)",
    "consulting": "Consultoria / Arquitetura",
    "legacy": "Modernização de legado",
    "maintenance": "Manutenção / Evolução",
    "other": "Outro"
  },
  "budget": "Orçamento estimado (opcional)",
  "budgetPlaceholder": "Selecione...",
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

  // Estados
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

Espelho equivalente em inglês em `en.json`.

---

## Componentes a criar/modificar

### Novos
- `src/components/sections/contact-section.tsx` — wrapper dark com bg + grid 2 colunas.
- `src/components/sections/contact-info.tsx` — coluna esquerda (logo, headings, lista de métodos).
- `src/components/ui/contact-method.tsx` — linha de método (ícone + label + valor + link).
- `src/lib/contact-action.ts` — Server Action de envio.
- `src/lib/contact-validation.ts` — função `validate` + tipos.
- `src/lib/contact-rate-limit.ts` — Map in-memory + função `checkLimit`.

### Modificar
- `src/components/sections/contact-form.tsx` — reescrita: novos campos, estados via `useTransition`, integração com Server Action, novo estado de sucesso, banner de erro.
- `src/app/[locale]/contato/page.tsx` — trocar a faixa branca `<div className="bg-background py-20 px-6"><ContactForm /></div>` pelo `<ContactSection />`.
- `src/app/[locale]/dictionaries/pt-BR.json` — novas chaves em `contact`.
- `src/app/[locale]/dictionaries/en.json` — novas chaves em `contact`.
- `package.json` — adicionar `resend`.

### Não tocar
- `ContactHero` — está bom.
- `Header`, `Footer` — sem mudanças.

---

## Acessibilidade

- Todos os inputs com `<label htmlFor>` associado.
- Select sem `placeholder` (usa primeira option disabled).
- Botão de submit com `aria-busy={submitting}`.
- Estado de sucesso com `role="status"` e `aria-live="polite"`.
- Banner de erro com `role="alert"`.
- Links externos com `rel="noopener noreferrer"` e `target="_blank"`.
- Ordem de tabulação respeita a leitura visual (esquerda → direita no desktop, top → bottom no mobile).

## Performance / Componentes Client vs Server

- `ContactSection` — **Client Component** (`"use client"`): usa `useEffect` para `pickRandomBg()` (mesmo padrão do `Cta` e `Footer`) e `motion.div` com `whileInView`.
- `ContactInfo` — **Server Component**: só renderiza dados estáticos do dict, sem hooks. Recebe `dict` por props.
- `ContactMethod` — **Server Component**: link estático com ícone.
- `ContactForm` — **Client Component**: `useTransition`, `useState`, eventos de submit.
- Imagem de fundo via `next/image` com `sizes="100vw"` e `priority={false}` (já está abaixo da hero).
- Reusar `pickRandomBg()` igual ao `Footer`/`Cta`.

## Testes (Playwright)

Smoke check no `tests/smoke.spec.ts` (já existente):
- `/contato` carrega 200.
- `data-testid="contact-form"` continua visível.
- Adicionar: `data-testid="contact-info"` presente com 7 métodos de contato.
- Adicionar: assert no botão de envio com label correto em pt-BR e en.

Visual regression em `tests/visual.spec.ts`:
- Screenshot de `/contato` (já existente) — atualizar snapshot com `npm run test:update` após implementação aprovada.

---

## Riscos e mitigações

| Risco                                                  | Mitigação                                                                              |
|--------------------------------------------------------|----------------------------------------------------------------------------------------|
| Resend exige domínio verificado para envio em produção | Documentar setup; em dev usar `onboarding@resend.dev` (sandbox grátis)                 |
| Bots preenchendo o form                                | Honeypot + rate limit por IP                                                           |
| Layout em mobile com bg dark + card branco             | Padding e gaps testados em breakpoints (`sm`, `md`, `lg`)                              |
| Strings i18n esquecidas                                | Build + lint não pegam; mitigação: checklist manual no CLAUDE.md já cobre              |

## Critérios de sucesso

- [ ] `next build` passa sem warnings novos.
- [ ] `npx playwright test` passa (smoke + visual atualizados).
- [ ] `/contato` em pt-BR e en exibem todas as strings novas (sem chave faltante).
- [ ] Submit do form via dev local com `RESEND_API_KEY` válida entrega e-mail real na caixa configurada.
- [ ] Honeypot bloqueia envio quando campo `company` é preenchido.
- [ ] Rate limit bloqueia 4ª tentativa do mesmo IP em < 10 min.
- [ ] Estados `idle`, `submitting`, `success`, `error` todos renderizam corretamente.
- [ ] Visual coerente com `Cta` e `Footer` (mesmo card dark + bg image + overlay 80%).
