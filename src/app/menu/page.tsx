import type { Metadata } from 'next';
import MenuPage from './MenuPage';

export const metadata: Metadata = {
  title: 'Menü',
  description: 'İzmir Balıkçısı tam menüsü — çorbalar, mezeler, taze balıklar, deniz mahsülleri ve tatlılar.',
};

export default function Page() {
  return <MenuPage />;
}
