import { redirect } from 'next/navigation';

// Middleware handles most root redirects, but this is a safety net.
export default function RootPage() {
  redirect('/login');
}
