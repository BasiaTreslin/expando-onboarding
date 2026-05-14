'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import { CelebrationPop } from '@/components/CelebrationPop';
import type { ContractType } from '@/types';

interface QuestionnaireModalProps {
  open: boolean;
  onClose: () => void;
  contractType: ContractType;
  slug: string;
  firstName: string;
  onSubmitted: () => void;
}

interface FormData {
  personalEmail: string;
  phone: string;
  address: string;
  linkedin: string;
  shirtSize: string;
  dietary: string;
  allergies: string;
  birthDate: string;
  ico: string;
  bankAccount: string;
  bankIban: string;
}

const EMPTY: FormData = {
  personalEmail: '',
  phone: '',
  address: '',
  linkedin: '',
  shirtSize: '',
  dietary: '',
  allergies: '',
  birthDate: '',
  ico: '',
  bankAccount: '',
  bankIban: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9 ]{9,15}$/;
const URL_REGEX = /^https?:\/\/.+/i;
const ICO_REGEX = /^\d{8}$/;
// Czech bank account: optional prefix-, 2–10 digit base, /4-digit bank code
const BANK_ACCOUNT_REGEX = /^(\d{1,6}-)?\d{2,10}\/\d{4}$/;

type Errors = Partial<Record<keyof FormData, string>>;

function validate(
  data: FormData,
  isZL: boolean,
  t: (k: string) => string
): Errors {
  const e: Errors = {};
  if (!EMAIL_REGEX.test(data.personalEmail.trim())) {
    e.personalEmail = t('questionnaire.validation.personalEmailFormat');
  }
  if (!PHONE_REGEX.test(data.phone.trim())) {
    e.phone = t('questionnaire.validation.phoneFormat');
  }
  if (data.address.trim().length < 10) {
    e.address = t('questionnaire.validation.addressMin');
  }
  if (data.linkedin.trim() && !URL_REGEX.test(data.linkedin.trim())) {
    e.linkedin = t('questionnaire.validation.linkedinFormat');
  }
  if (!data.shirtSize) {
    e.shirtSize = t('questionnaire.validation.shirtSizeRequired');
  }
  if (!data.dietary.trim()) {
    e.dietary = t('questionnaire.validation.dietaryRequired');
  }
  if (!data.allergies.trim()) {
    e.allergies = t('questionnaire.validation.allergiesRequired');
  }
  if (!data.birthDate) {
    e.birthDate = t('questionnaire.validation.birthDateRequired');
  }
  if (isZL) {
    if (!ICO_REGEX.test(data.ico.trim())) {
      e.ico = t('questionnaire.validation.icoFormat');
    }
    if (!BANK_ACCOUNT_REGEX.test(data.bankAccount.trim())) {
      e.bankAccount = t('questionnaire.validation.bankAccountFormat');
    }
  }
  return e;
}

export function QuestionnaireModal({
  open,
  onClose,
  contractType,
  slug,
  firstName,
  onSubmitted,
}: QuestionnaireModalProps) {
  const { t, messages } = useLanguage();
  const isZL = contractType === 'ŽL';
  const formRef = useRef<HTMLFormElement>(null);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const shirtSizes = (messages as unknown as {
    questionnaire: { shirtSizes: string[] };
  }).questionnaire.shirtSizes;

  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [confettiKey, setConfettiKey] = useState<number | null>(null);

  // Reset transient UI on open
  useEffect(() => {
    if (open) {
      setData(EMPTY);
      setErrors({});
      setTouched(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [open, slug]);

  // Live re-validate after first submit attempt
  useEffect(() => {
    if (touched) setErrors(validate(data, isZL, t));
  }, [touched, data, isZL, t]);

  const isValid = useMemo(
    () => Object.keys(validate(data, isZL, t)).length === 0,
    [data, isZL, t]
  );

  const update =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setData((d) => ({ ...d, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const next = validate(data, isZL, t);
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

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const payload = {
        personalEmail: data.personalEmail.trim(),
        phone: data.phone.trim(),
        birthDate: data.birthDate,
        address: data.address.trim() || undefined,
        linkedin: data.linkedin.trim() || undefined,
        shirtSize: data.shirtSize || undefined,
        dietary: data.dietary.trim() || undefined,
        allergies: data.allergies.trim() || undefined,
        ico: data.ico.trim() || undefined,
        bankAccount: data.bankAccount.trim() || undefined,
        bankIban: data.bankIban.trim() || undefined,
      };

      const res = await fetch('/api/questionnaire/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hire_slug: slug, data: payload }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (json && (json.error as string)) ||
            t('questionnaire.submitError')
        );
      }

      onSubmitted();
      setSubmitSuccess(true);
      setConfettiKey(Date.now());
      setTimeout(onClose, 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t('questionnaire.submitError');
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable submit only AFTER first attempt while errors remain — so the user
  // can always click once to surface errors and trigger the scroll-to-first.
  const submitDisabled = (touched && !isValid) || isSubmitting;

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={t('questionnaire.title')}
        description={t('questionnaire.subtitle')}
        size="lg"
        closeOnBackdropClick={false}
        footer={
          submitSuccess ? null : (
            <div className="flex flex-col items-end gap-2 w-full">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg border border-expando-gray-200
                             text-expando-gray-700 font-medium
                             hover:border-expando-gray-600 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('questionnaire.cancel')}
                </button>
                <button
                  type="submit"
                  form="questionnaire-form"
                  disabled={submitDisabled}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? t('questionnaire.submitting')
                    : t('questionnaire.submit')}
                </button>
              </div>
              {submitError && (
                <p className="text-red-600 text-sm mt-1">{submitError}</p>
              )}
            </div>
          )
        }
      >
        {submitSuccess ? (
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
              {t('questionnaire.submitSuccess')}
            </p>
          </div>
        ) : (
          <form
            id="questionnaire-form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <GroupHeader>{t('questionnaire.groups.contact')}</GroupHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="personalEmail"
                label={t('questionnaire.fields.personalEmail.label')}
                required
                error={errors.personalEmail}
              >
                <input
                  id="personalEmail"
                  type="email"
                  autoComplete="email"
                  placeholder={t(
                    'questionnaire.fields.personalEmail.placeholder'
                  )}
                  value={data.personalEmail}
                  onChange={update('personalEmail')}
                  aria-invalid={!!errors.personalEmail}
                  className={inputClass(!!errors.personalEmail)}
                />
              </Field>
              <Field
                id="phone"
                label={t('questionnaire.fields.phone.label')}
                required
                error={errors.phone}
              >
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={t('questionnaire.fields.phone.placeholder')}
                  value={data.phone}
                  onChange={update('phone')}
                  aria-invalid={!!errors.phone}
                  className={inputClass(!!errors.phone)}
                />
              </Field>
            </div>
            <Field
              id="linkedin"
              label={t('questionnaire.fields.linkedin.label')}
              error={errors.linkedin}
            >
              <input
                id="linkedin"
                type="url"
                autoComplete="url"
                placeholder={t('questionnaire.fields.linkedin.placeholder')}
                value={data.linkedin}
                onChange={update('linkedin')}
                aria-invalid={!!errors.linkedin}
                className={inputClass(!!errors.linkedin)}
              />
            </Field>
            <Field
              id="address"
              label={t('questionnaire.fields.address.label')}
              required
              error={errors.address}
            >
              <textarea
                id="address"
                rows={2}
                autoComplete="street-address"
                placeholder={t('questionnaire.fields.address.placeholder')}
                value={data.address}
                onChange={update('address')}
                aria-invalid={!!errors.address}
                className={inputClass(!!errors.address)}
              />
            </Field>
            <GroupHeader>{t('questionnaire.groups.teamLunch')}</GroupHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="shirtSize"
                label={t('questionnaire.fields.shirtSize.label')}
                required
                error={errors.shirtSize}
              >
                <select
                  id="shirtSize"
                  value={data.shirtSize}
                  onChange={update('shirtSize')}
                  aria-invalid={!!errors.shirtSize}
                  className={inputClass(!!errors.shirtSize)}
                >
                  <option value="">
                    {t('questionnaire.fields.shirtSize.placeholder')}
                  </option>
                  {shirtSizes.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="birthDate"
                label={t('questionnaire.fields.birthDate.label')}
                required
                error={errors.birthDate}
              >
                <input
                  id="birthDate"
                  type="date"
                  max={today}
                  value={data.birthDate}
                  onChange={update('birthDate')}
                  aria-invalid={!!errors.birthDate}
                  className={inputClass(!!errors.birthDate)}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="dietary"
                label={t('questionnaire.fields.dietary.label')}
                required
                error={errors.dietary}
              >
                <input
                  id="dietary"
                  type="text"
                  placeholder={t('questionnaire.fields.dietary.placeholder')}
                  value={data.dietary}
                  onChange={update('dietary')}
                  aria-invalid={!!errors.dietary}
                  className={inputClass(!!errors.dietary)}
                />
              </Field>
              <Field
                id="allergies"
                label={t('questionnaire.fields.allergies.label')}
                required
                error={errors.allergies}
              >
                <input
                  id="allergies"
                  type="text"
                  placeholder={t('questionnaire.fields.allergies.placeholder')}
                  value={data.allergies}
                  onChange={update('allergies')}
                  aria-invalid={!!errors.allergies}
                  className={inputClass(!!errors.allergies)}
                />
              </Field>
            </div>

            {isZL && (
              <>
                <GroupHeader>{t('questionnaire.groups.zl')}</GroupHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    id="ico"
                    label={t('questionnaire.fields.ico.label')}
                    required
                    error={errors.ico}
                  >
                    <input
                      id="ico"
                      type="text"
                      inputMode="numeric"
                      placeholder={t('questionnaire.fields.ico.placeholder')}
                      value={data.ico}
                      onChange={update('ico')}
                      aria-invalid={!!errors.ico}
                      className={inputClass(!!errors.ico)}
                    />
                  </Field>
                  <Field
                    id="bankAccount"
                    label={t('questionnaire.fields.bankAccount.label')}
                    required
                    error={errors.bankAccount}
                  >
                    <input
                      id="bankAccount"
                      type="text"
                      placeholder={t(
                        'questionnaire.fields.bankAccount.placeholder'
                      )}
                      value={data.bankAccount}
                      onChange={update('bankAccount')}
                      aria-invalid={!!errors.bankAccount}
                      className={inputClass(!!errors.bankAccount)}
                    />
                  </Field>
                </div>
                <Field
                  id="bankIban"
                  label={t('questionnaire.fields.bankIban.label')}
                  error={errors.bankIban}
                >
                  <input
                    id="bankIban"
                    type="text"
                    placeholder={t(
                      'questionnaire.fields.bankIban.placeholder'
                    )}
                    value={data.bankIban}
                    onChange={update('bankIban')}
                    aria-invalid={!!errors.bankIban}
                    className={inputClass(!!errors.bankIban)}
                  />
                </Field>
              </>
            )}

            {!isZL && (
              <Field
                id="bankIban"
                label={t('questionnaire.fields.bankIban.label')}
                error={errors.bankIban}
              >
                <input
                  id="bankIban"
                  type="text"
                  placeholder={t('questionnaire.fields.bankIban.placeholder')}
                  value={data.bankIban}
                  onChange={update('bankIban')}
                  aria-invalid={!!errors.bankIban}
                  className={inputClass(!!errors.bankIban)}
                />
              </Field>
            )}

            <p className="mt-6 text-sm text-expando-gray-600 leading-relaxed">
              {t('questionnaire.privacy')}
            </p>
          </form>
        )}
      </Modal>

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

function GroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[11px] uppercase font-semibold text-expando-orange
                 tracking-[0.05em] mt-6 first:mt-0 mb-3 pb-2
                 border-b border-expando-gray-200"
    >
      {children}
    </h3>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-expando-gray-700 mb-1.5"
      >
        {label}
        {required && <span className="text-expando-orange ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full rounded-lg px-3.5 py-2.5 text-[15px] text-expando-gray-900 bg-white
          border ${hasError ? 'border-red-400' : 'border-expando-gray-200'}
          focus:outline-none focus:ring-2 focus:ring-expando-orange focus:border-expando-orange
          transition-colors`;
}
