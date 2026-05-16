import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { profileSubmitSchema } from '@/lib/validation/profile';

export const runtime = 'nodejs';

// ============================================================================
// TODO (Monday — Slack-as-truth + Notion-as-bio integration):
//
// When SLACK_BOT_TOKEN + NOTION_TOKEN + NOTION_PEOPLE_DB_ID are configured
// in Vercel env vars, this route should ALSO:
//
//   1. Upload photo to Slack:
//      - Resize image to recommended <= 1024x1024 to keep API happy
//      - POST to https://slack.com/api/users.setPhoto
//        body: multipart/form-data { image, user (lookup by email) }
//        scope required: users.profile:write + admin token
//
//   2. Write to Notion EXPANDO PEOPLE database:
//      - Look up page by email (databases.query with filter on "email:" field)
//      - If page exists -> update bio block + cover image
//      - If page doesn't exist -> create new page with email, name, bio, image
//      - Notion integration scope: "Update content" + "Insert content"
//        on the EXPANDO PEOPLE database
//
//   3. On any external API failure -> STILL succeed (Supabase has the data,
//      HR can manually port over). Log warnings for admin to follow up.
//
// For now (today) we just persist to Supabase for safekeeping.
// ============================================================================

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

    const parsed = profileSubmitSchema.safeParse(
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
      .select('id, email')
      .eq('slug', hireSlug)
      .maybeSingle();

    if (hireError) {
      console.error('[profile-submit] hire lookup error', hireError);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
    if (!hire) {
      return NextResponse.json({ error: 'Hire not found' }, { status: 404 });
    }

    // Persist to Supabase as the durable record.
    // (Photo stored as data URL for now — Monday refactor moves it to Slack +
    // Notion cover image.)
    const now = new Date().toISOString();
    const { error: upsertError } = await admin
      .from('introduce_yourself_submissions')
      .upsert(
        {
          hire_id: hire.id,
          hire_slug: hireSlug,
          bio: parsed.data.bio,
          photo_data_url: parsed.data.photo?.dataUrl ?? null,
          photo_mime_type: parsed.data.photo?.mimeType ?? null,
          photo_file_name: parsed.data.photo?.fileName ?? null,
          submitted_at: now,
          updated_at: now,
        },
        { onConflict: 'hire_id' }
      );

    if (upsertError) {
      console.error('[profile-submit] upsert error', upsertError);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }

    // TODO Monday: trigger Notion + Slack writes here. Currently no-op.

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[profile-submit] unexpected error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
