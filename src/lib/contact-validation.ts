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
