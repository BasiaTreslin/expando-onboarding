import { z } from 'zod';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'] as const;
const BIO_MIN = 30;
const BIO_MAX = 600;
const PHOTO_MAX_BASE64_BYTES = 7_500_000; // ~5.5 MB raw → ~7.5 MB base64

export const profileSubmitSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(BIO_MIN, `Bio must be at least ${BIO_MIN} characters.`)
    .max(BIO_MAX, `Bio must be at most ${BIO_MAX} characters.`),
  photo: z
    .object({
      dataUrl: z
        .string()
        .startsWith('data:image/', 'Invalid data URL')
        .max(PHOTO_MAX_BASE64_BYTES, 'Photo is too large'),
      fileName: z.string().trim().min(1).max(255).nullable(),
      mimeType: z.enum(ALLOWED_MIME),
    })
    .nullable(),
});

export type ProfileSubmitData = z.infer<typeof profileSubmitSchema>;
