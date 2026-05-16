'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CelebrationPop } from '@/components/CelebrationPop';
import { getCompletedTasks, markTaskCompleted } from '@/lib/taskStorage';

interface IntroduceYourselfFormProps {
  slug: string;
  fullName: string;
  firstName: string;
}

interface FormData {
  bio: string;
  photoDataUrl: string | null;
  photoFileName: string | null;
  photoMimeType: string | null;
}

const TASK_ID = 'introduce-yourself:submitted';
const EMPTY: FormData = {
  bio: '',
  photoDataUrl: null,
  photoFileName: null,
  photoMimeType: null,
};

const BIO_MIN = 30;
const BIO_MAX = 600;
const PHOTO_MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

type Errors = Partial<Record<'bio' | 'photo', string>>;

function draftKey(slug: string): string {
  return `expando-onboarding:${slug}:introduce-yourself-draft-v2`;
}

function loadDraft(slug: string): FormData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(draftKey(slug));
    return raw ? (JSON.parse(raw) as FormData) : null;
  } catch {
    return null;
  }
}

function saveDraft(slug: string, data: FormData): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(draftKey(slug), JSON.stringify(data));
  } catch {
    // quota / private mode — ignore
  }
}

function validate(data: FormData, t: (k: string) => string): Errors {
  const e: Errors = {};
  const bioLen = data.bio.trim().length;
  if (bioLen < BIO_MIN) {
    e.bio = t('introduceYourself.validation.bioMin');
  } else if (bioLen > BIO_MAX) {
    e.bio = t('introduceYourself.validation.bioMax');
  }
  if (!data.photoDataUrl) {
    e.photo = t('introduceYourself.validation.photoRequired');
  }
  return e;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Read failed'));
    reader.readAsDataURL(file);
  });
}

export function IntroduceYourselfForm({
  slug,
  fullName,
  firstName,
}: IntroduceYourselfFormProps) {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const isDone = !!getCompletedTasks(slug)[TASK_ID];
    setSubmitted(isDone);
    setEditing(!isDone);
    setData(loadDraft(slug) ?? EMPTY);
  }, [slug]);

  useEffect(() => {
    if (!mounted || !editing) return;
    const timer = setTimeout(() => saveDraft(slug, data), 500);
    return () => clearTimeout(timer);
  }, [mounted, editing, slug, data]);

  useEffect(() => {
    if (touched) setErrors(validate(data, t));
  }, [touched, data, t]);

  const isValid = useMemo(
    () => Object.keys(validate(data, t)).length === 0,
    [data, t]
  );

  const updateBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, bio: e.target.value }));
  };

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubmitError(null);

    if (!ALLOWED_MIME.includes(file.type)) {
      setErrors((p) => ({
        ...p,
        photo: t('introduceYourself.validation.photoWrongType'),
      }));
      return;
    }
    if (file.size > PHOTO_MAX_BYTES) {
      setErrors((p) => ({
        ...p,
        photo: t('introduceYourself.validation.photoTooLarge'),
      }));
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setData((d) => ({
        ...d,
        photoDataUrl: dataUrl,
        photoFileName: file.name,
        photoMimeType: file.type,
      }));
      setErrors((p) => ({ ...p, photo: undefined }));
    } catch {
      setErrors((p) => ({
        ...p,
        photo: t('introduceYourself.validation.photoWrongType'),
      }));
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePhoto = () => {
    setData((d) => ({
      ...d,
      photoDataUrl: null,
      photoFileName: null,
      photoMimeType: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setSubmitError(null);
    const next = validate(data, t);
    setErrors(next);

    if (Object.keys(next).length > 0) {
      requestAnimationFrame(() => {
        const firstInvalid = formRef.current?.querySelector<HTMLElement>(
          '[aria-invalid="true"]'
        );
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid?.focus({ preventScroll: true });
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/profile-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hire_slug: slug,
          data: {
            bio: data.bio.trim(),
            photo: data.photoDataUrl
              ? {
                  dataUrl: data.photoDataUrl,
                  fileName: data.photoFileName,
                  mimeType: data.photoMimeType,
                }
              : null,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      saveDraft(slug, data);
      markTaskCompleted(slug, TASK_ID);
      setSubmitted(true);
      setEditing(false);
      setConfettiKey(Date.now());
    } catch (err) {
      console.error('[introduce-yourself] submit failed', err);
      setSubmitError(t('introduceYourself.errors.submitFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  const submitDisabled = (touched && !isValid) || submitting;
  const showSuccess = mounted && submitted && !editing;

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm border border-expando-gray-200
                   overflow-hidden"
      >
        <div className="h-[3px] bg-expando-orange" />
        <div className="px-6 sm:px-7 py-6 sm:py-7">
          <h3 className="text-2xl font-medium text-expando-gray-900 leading-tight">
            {t('introduceYourself.title')}
          </h3>
          <p className="text-sm text-expando-gray-600 mt-1.5">
            {t('introduceYourself.subtitle')}
          </p>

          <div className="mt-6">
            {showSuccess ? (
              <SuccessView
                onEdit={() => setEditing(true)}
                photoDataUrl={data.photoDataUrl}
                bio={data.bio}
              />
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <Field
                  id="iy-fullName"
                  label={t('introduceYourself.fields.fullName')}
                >
                  <input
                    id="iy-fullName"
                    type="text"
                    value={fullName}
                    readOnly
                    className="w-full rounded-lg px-3.5 py-2.5 text-[15px]
                               bg-expando-gray-50 text-expando-gray-900
                               border border-expando-gray-200 cursor-not-allowed"
                  />
                </Field>

                <Field
                  id="iy-photo"
                  label={t('introduceYourself.fields.photo')}
                  required
                  error={errors.photo}
                >
                  <PhotoUpload
                    dataUrl={data.photoDataUrl}
                    fileName={data.photoFileName}
                    onPick={() => fileInputRef.current?.click()}
                    onRemove={removePhoto}
                    hasError={!!errors.photo}
                  />
                  <input
                    ref={fileInputRef}
                    id="iy-photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handlePhotoChange}
                    aria-invalid={!!errors.photo}
                  />
                  <p className="text-xs text-expando-gray-600 mt-1.5">
                    {t('introduceYourself.photoUpload.hint')}
                  </p>
                </Field>

                <Field
                  id="iy-bio"
                  label={t('introduceYourself.fields.bio')}
                  required
                  error={errors.bio}
                  count={data.bio.length}
                  max={BIO_MAX}
                >
                  <textarea
                    id="iy-bio"
                    rows={5}
                    placeholder={t('introduceYourself.placeholders.bio')}
                    value={data.bio}
                    onChange={updateBio}
                    aria-invalid={!!errors.bio}
                    className={textareaClass(!!errors.bio)}
                  />
                </Field>

                {submitError && (
                  <div
                    className="mb-4 rounded-lg border border-red-200 bg-red-50
                               px-3.5 py-2.5 text-sm text-red-700"
                    role="alert"
                  >
                    {submitError}
                  </div>
                )}

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitDisabled}
                    className="btn-primary disabled:opacity-50
                               disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t('introduceYourself.submitting')}
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        {t('introduceYourself.submitCta')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {confettiKey !== null && (
        <CelebrationPop
          key={confettiKey}
          name={firstName}
          accentColor="#FF4D00"
          onComplete={() => setConfettiKey(null)}
        />
      )}
    </>
  );
}

function PhotoUpload({
  dataUrl,
  fileName,
  onPick,
  onRemove,
  hasError,
}: {
  dataUrl: string | null;
  fileName: string | null;
  onPick: () => void;
  onRemove: () => void;
  hasError: boolean;
}) {
  const { t } = useLanguage();

  if (dataUrl) {
    return (
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-2xl overflow-hidden bg-expando-gray-50
                     ring-1 ring-expando-gray-200 shadow-sm flex-shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt={fileName ?? 'Your photo'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <button
            type="button"
            onClick={onPick}
            className="inline-flex items-center gap-1.5 text-sm font-medium
                       text-expando-orange hover:text-expando-orange-hover
                       transition-colors self-start"
          >
            <Upload size={14} />
            {t('introduceYourself.photoUpload.change')}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 text-sm font-medium
                       text-expando-gray-600 hover:text-expando-gray-900
                       transition-colors self-start"
          >
            <X size={14} />
            {t('introduceYourself.photoUpload.remove')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPick}
      className={`w-full flex items-center justify-center gap-2.5 rounded-lg
                  py-6 text-sm font-medium transition-colors
                  border-2 border-dashed
                  ${
                    hasError
                      ? 'border-red-300 text-red-600 hover:border-red-400'
                      : 'border-expando-gray-200 text-expando-gray-700 hover:border-expando-orange hover:text-expando-orange'
                  }`}
    >
      <ImageIcon size={18} />
      {t('introduceYourself.photoUpload.cta')}
    </button>
  );
}

function SuccessView({
  onEdit,
  photoDataUrl,
  bio,
}: {
  onEdit: () => void;
  photoDataUrl: string | null;
  bio: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div
        className="w-16 h-16 rounded-full bg-expando-green-soft
                   flex items-center justify-center mb-4 animate-scale-in"
      >
        <Check
          size={32}
          className="text-expando-green-deep"
          strokeWidth={2.5}
        />
      </div>
      <p className="text-lg font-semibold text-expando-gray-900">
        {t('introduceYourself.success.title')}
      </p>
      {photoDataUrl && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <div
            className="w-24 h-24 rounded-2xl overflow-hidden bg-expando-gray-50
                       ring-1 ring-expando-gray-200 shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoDataUrl}
              alt="Your photo"
              className="w-full h-full object-cover"
            />
          </div>
          {bio && (
            <p className="text-sm text-expando-gray-600 max-w-md leading-relaxed">
              {bio}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={onEdit}
        className="mt-5 inline-flex items-center text-sm font-medium
                   text-expando-orange hover:text-expando-orange-hover
                   transition-colors"
      >
        {t('introduceYourself.success.editAnswers')}
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  count,
  max,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  count?: number;
  max?: number;
  children: React.ReactNode;
}) {
  const showCounter = typeof count === 'number' && typeof max === 'number';
  const overLimit = showCounter && count! > max!;
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-expando-gray-700 mb-1.5"
      >
        {label}
        {required && <span className="text-expando-orange ml-0.5">*</span>}
      </label>
      {children}
      {(error || showCounter) && (
        <div className="flex justify-between items-start mt-1.5 gap-3">
          <p className={`text-xs ${error ? 'text-red-600' : 'text-transparent'}`}>
            {error || ' '}
          </p>
          {showCounter && (
            <span
              className={`text-xs flex-shrink-0 ${
                overLimit
                  ? 'text-red-600 font-medium'
                  : 'text-expando-gray-600'
              }`}
            >
              {count}/{max}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function textareaClass(hasError: boolean): string {
  return `w-full rounded-lg px-3.5 py-2.5 text-[15px] text-expando-gray-900 bg-white
          border ${hasError ? 'border-red-400' : 'border-expando-gray-200'}
          focus:outline-none focus:ring-2 focus:ring-expando-orange focus:border-expando-orange
          transition-colors resize-y`;
}
