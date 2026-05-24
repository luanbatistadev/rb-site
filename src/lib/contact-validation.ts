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
  website: string;
};

export type ValidationError =
  | "invalid_name"
  | "invalid_email"
  | "invalid_subject"
  | "invalid_message"
  | "spam";

const SUBJECTS = new Set<string>([
  "mobile",
  "web",
  "consulting",
  "legacy",
  "maintenance",
  "other",
]);

const BUDGETS = new Set<string>([
  "lt10k",
  "10to30k",
  "30to80k",
  "gt80k",
  "undecided",
]);

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function field(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

export function parseFormData(form: FormData): ContactFormData {
  return {
    name: field(form, "name"),
    email: field(form, "email"),
    phone: field(form, "phone"),
    subject: field(form, "subject") as ContactFormData["subject"],
    budget: field(form, "budget") as ContactFormData["budget"],
    message: field(form, "message"),
    website: field(form, "website"),
  };
}

export function validate(data: ContactFormData): ValidationError | null {
  if (data.website) return "spam";
  if (data.name.length < 2) return "invalid_name";
  if (!EMAIL_RE.test(data.email)) return "invalid_email";
  if (!SUBJECTS.has(data.subject)) return "invalid_subject";
  if (data.budget && !BUDGETS.has(data.budget)) return "invalid_subject";
  if (data.message.length < 10) return "invalid_message";
  return null;
}
