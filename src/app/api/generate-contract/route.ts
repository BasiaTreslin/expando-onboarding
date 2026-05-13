import { NextResponse } from 'next/server';
import { generateContract, type ContractData } from '@/lib/contractGenerator';

export async function POST(req: Request) {
  let body: ContractData;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { jmeno_prijmeni, ico, misto_podnikani, email, hodinova_sazba, datum_nastupu } = body;

  if (!jmeno_prijmeni || !ico || !misto_podnikani || !email || !hodinova_sazba || !datum_nastupu) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const buffer = await generateContract(body);
    const filename = `Smlouva_OSVC_${jmeno_prijmeni.replace(/\s+/g, '_')}.docx`;

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('[generate-contract]', err);
    return NextResponse.json({ error: 'Failed to generate contract' }, { status: 500 });
  }
}
