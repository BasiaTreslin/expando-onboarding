import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import {
  mapFormToDb,
  questionnaireFormSchema,
} from '@/lib/validation/questionnaire';

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
      .select('id')
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[questionnaire/submit] unexpected error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
