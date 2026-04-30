'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CelebrationPop } from '@/components/CelebrationPop';
import { getCompletedTasks, markTaskCompleted } from '@/lib/taskStorage';

interface IntroduceYourselfFormProps {
  slug: string;
  fullName: string;
  firstName: string;
}

interface FormData {
  whyExpando: string;
  funFact: string;
}

const TASK_ID = 'introduce-yourself:submitted';
const EMPTY: FormData = { whyExpando: '', funFact: '' };

const WHY_MIN = 20;
const WHY_MAX = 500;
const FUN_MIN = 10;
const FUN_MAX = 300;

type Errors = Partial<Record<keyof FormData, string>>;

function draftKey(slug: string): string {
  return `expando-onboarding:${slug}:introduce-yourself-draft`;
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

function validate(
  data: FormData,
  t: (k: string) => string
): Errors {
  const e: Errors = {};
  const why = data.whyExpando.trim().length;
  if (why < WHY_MIN) {
    e.whyExpando = t('introduceYourself.validation.whyExpandoMin');
  } else if (why > WHY_MAX) {
    e.whyExpando = t('introduceYourself.validation.whyExpandoMax');
  }
  const fun = data.funFact.trim().length;
  if (fun < FUN_MIN) {
    e.funFact = t('introduceYourself.validation.funFactMin');
  } else if (fun > FUN_MAX) {
    e.funFact = t('introduceYourself.validation.funFactMax');
  }
  return e;
}

export function IntroduceYourselfForm({
  slug,
  fullName,
  firstName,
}: IntroduceYourselfFormProps) {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(true);
  const [confettiKey, setConfettiKey] = useState<number | null>(null);

  // Load draft + submitted flag on mount
  useEffect(() => {
    setMounted(true);
    const isDone = !!getCompletedTasks(slug)[TASK_ID];
    setSubmitted(isDone);
    setEditing(!isDone);
    setData(loadDraft(slug) ?? EMPTY);
  }, [slug]);

  // Debounced draft save while editing
  useEffect(() => {
    if (!mounted || !editing) return;
    const timer = setTimeout(() => saveDraft(slug, data), 500);
    return () => clearTimeout(timer);
  }, [mounted, editing, slug, data]);

  // Live re-validate after first submit attempt
  useEffect(() => {
    if (touched) setErrors(validate(data, t));
  }, [touched, data, t]);

  const isValid = useMemo(
    () => Object.keys(validate(data, t)).length === 0,
    [data, t]
  );

  const update =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
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

    console.log('[introduce-yourself] submit', data);
    saveDraft(slug, data);
    markTaskCompleted(slug, TASK_ID);
    setSubmitted(true);
    setEditing(false);
    setConfettiKey(Date.now());
  };

  const submitDisabled = touched && !isValid;
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
              <SuccessView onEdit={() => setEditing(true)} />
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
                  id="iy-whyExpando"
                  label={t('introduceYourself.fields.whyExpando')}
                  required
                  error={errors.whyExpando}
                  count={data.whyExpando.length}
                  max={WHY_MAX}
                >
                  <textarea
                    id="iy-whyExpando"
                    rows={4}
                    placeholder={t(
                      'introduceYourself.placeholders.whyExpando'
                    )}
                    value={data.whyExpando}
                    onChange={update('whyExpando')}
                    aria-invalid={!!errors.whyExpando}
                    className={textareaClass(!!errors.whyExpando)}
                  />
                </Field>

                <Field
                  id="iy-funFact"
                  label={t('introduceYourself.fields.funFact')}
                  required
                  error={errors.funFact}
                  count={data.funFact.length}
                  max={FUN_MAX}
                >
                  <textarea
                    id="iy-funFact"
                    rows={3}
                    placeholder={t('introduceYourself.placeholders.funFact')}
                    value={data.funFact}
                    onChange={update('funFact')}
                    aria-invalid={!!errors.funFact}
                    className={textareaClass(!!errors.funFact)}
                  />
                </Field>

                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitDisabled}
                    className="btn-primary disabled:opacity-50
                               disabled:cursor-not-allowed"
                  >
                    <Check size={16} />
                    {t('introduceYourself.submitCta')}
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

function SuccessView({ onEdit }: { onEdit: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
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
      <button
        type="button"
        onClick={onEdit}
        className="mt-4 inline-flex items-center text-sm font-medium
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
            {error || ' '}
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
