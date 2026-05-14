import type { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in — EXPANDO Onboarding',
  description: 'Sign in to your personalised EXPANDO onboarding guide.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-expando-gray-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, #FF4D00 0%, transparent 50%),
                              radial-gradient(circle at 70% 80%, #FF4D00 0%, transparent 45%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo/expando-logo-white.png"
            alt="EXPANDO"
            width={210}
            height={40}
            priority
            className="h-10 w-auto mb-2"
          />
          <p className="text-white/60 text-sm">Onboarding</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 bg-expando-orange" />
          <div className="p-7">
            <h1 className="text-xl font-bold text-expando-gray-900 mb-1">Welcome back</h1>
            <p className="text-expando-gray-600 text-sm mb-6">
              Sign in with the credentials HR sent you.
            </p>
            <LoginForm />
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          Don&apos;t have credentials? Contact{' '}
          <a href="mailto:people@expando.com" className="text-expando-orange hover:underline">
            people@expando.com
          </a>
        </p>
      </div>
    </main>
  );
}
