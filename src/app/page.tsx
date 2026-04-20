import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EXPANDO Onboarding',
  description: 'The EXPANDO personalised onboarding platform.',
  robots: { index: false, follow: false },
};

export default function RootPage() {
  return (
    <main className="min-h-screen bg-expando-gray-900 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">EXPANDO</h1>
      <p className="text-white/60 text-lg mb-8 max-w-md">
        Onboarding guides are personalised. If you received a link, use that link directly.
      </p>
      <p className="text-white/40 text-sm">
        HR team: see{' '}
        <code className="text-expando-orange bg-white/5 px-2 py-0.5 rounded">
          src/data/newHires/
        </code>{' '}
        to add a new hire.
      </p>
    </main>
  );
}
