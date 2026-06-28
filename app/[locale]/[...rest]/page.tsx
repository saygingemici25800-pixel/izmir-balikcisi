import { notFound } from 'next/navigation';

// Any unknown path under a valid locale falls through to the localized 404.
export default function CatchAllPage() {
  notFound();
}
