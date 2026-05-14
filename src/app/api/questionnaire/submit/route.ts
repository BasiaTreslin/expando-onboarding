import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import {
  mapFormToDb,
  questionnaireFormSchema,
} from '@/lib/validation/questionnaire';
import { appendNewHireRow } from '@/lib/google/sheets';
import { createEmployeeFolder } from '@/lib/google/drive';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const hireSlug = (body as { hire_slug?: unknown }).hire_slug;
    if (typeof hireSlug !== 'string' || hireSlug.length === 0) {
      return NextResponse.json({ error: 'Missing hire_slug' }, { status: 400 });
    }

    const parsed = questionnaireFormSchema.safeParse(
      (body as { data?: unknown }).data
    );
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdmin();

    const { data: hire, error: hireError } = await admin
      .from('new_hires')
      .select('id, full_name, work_location, start_date, team, role, contract_type')
      .eq('slug', hireSlug)
      .maybeSingle();

    if (hireError) {
      console.error('[questionnaire/submit] hire lookup error', hireError);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
    if (!hire) {
      return NextResponse.json({ error: 'Hire not found' }, { status: 404 });
    }

    const submissionData = mapFormToDb(parsed.data);
    const now = new Date().toISOString();

    const { error: upsertError } = await admin
      .from('questionnaire_submissions')
      .upsert(
        {
          hire_id: hire.id,
          hire_slug: hireSlug,
          submission_data: submissionData,
          is_draft: false,
          submitted_at: now,
          updated_at: now,
        },
        { onConflict: 'hire_id' }
      );

    if (upsertError) {
      console.error('[questionnaire/submit] upsert error', upsertError);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }

    // Fire-and-forget: sync to Google Sheets + Drive without blocking the response
    void syncToGoogle(hire, submissionData);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[questionnaire/submit] unexpected error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

interface HireRecord {
  full_name: string;
  work_location?: string | null;
  start_date: string;
  team: string;
  role: string;
  contract_type: string;
}

async function syncToGoogle(
  hire: HireRecord,
  submissionData: Record<string, unknown>
): Promise<void> {
  const fullNameParts = hire.full_name.trim().split(' ');
  const firstName = fullNameParts.slice(0, -1).join(' ') || hire.full_name;
  const lastName = fullNameParts.length > 1 ? fullNameParts[fullNameParts.length - 1] : '';

  const str = (v: unknown) => (typeof v === 'string' ? v : '');

  try {
    await appendNewHireRow({
      prijmeni: lastName,
      jmeno: firstName,
      soukromyMail: str(submissionData.personal_email),
      telefon: str(submissionData.phone),
      datum: str(submissionData.birth_date),
      mistoVykonu: hire.work_location ?? '',
      nastup: hire.start_date,
      department: hire.team,
      pozice: hire.role,
      formaUvazku: hire.contract_type,
      dieta: str(submissionData.dietary_restrictions),
      alergie: str(submissionData.food_allergies),
      velikostTricka: str(submissionData.tshirt_size),
      ico: str(submissionData.ico),
      cisloUctu: str(submissionData.bank_account),
      iban: str(submissionData.bank_iban),
    });
  } catch (err) {
    console.error('[questionnaire/submit] Google Sheets sync failed', err);
  }

  try {
    await createEmployeeFolder(hire.full_name);
  } catch (err) {
    console.error('[questionnaire/submit] Google Drive folder creation failed', err);
  }
}
