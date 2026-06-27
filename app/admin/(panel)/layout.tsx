import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthed()) redirect('/admin/login');
  return <>{children}</>;
}
