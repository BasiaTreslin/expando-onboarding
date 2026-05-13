import { z } from 'zod';

const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined));

export const questionnaireFormSchema = z.object({
  personalEmail: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ]{9,15}$/, 'Invalid phone'),
  birthDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),

  address: optionalString,
  linkedin: optionalString,
  shirtSize: z.enum(SHIRT_SIZES).optional().or(z.literal('').transform(() => undefined)),
  dietary: optionalString,
  allergies: optionalString,
  ico: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined))
    .refine((v) => v === undefined || /^\d{8}$/.test(v), 'ICO must be 8 digits'),
  bankAccount: optionalString,
  bankIban: optionalString,
});

export type QuestionnaireFormData = z.infer<typeof questionnaireFormSchema>;

export function mapFormToDb(form: QuestionnaireFormData): Record<string, unknown> {
  const out: Record<string, unknown> = {
    personal_email: form.personalEmail,
    phone: form.phone,
    birth_date: form.birthDate,
  };

  if (form.address !== undefined) out.address = form.address;
  if (form.linkedin !== undefined) out.linkedin = form.linkedin;
  if (form.shirtSize !== undefined) out.tshirt_size = form.shirtSize;
  if (form.dietary !== undefined) out.dietary_restrictions = form.dietary;
  if (form.allergies !== undefined) out.food_allergies = form.allergies;
  if (form.ico !== undefined) out.ico = form.ico;
  if (form.bankAccount !== undefined) out.bank_account = form.bankAccount;
  if (form.bankIban !== undefined) out.bank_iban = form.bankIban;

  return out;
}
