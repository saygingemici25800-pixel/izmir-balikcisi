// ─── Global Types ─────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface SectionProps {
  className?: string;
}

export interface ImagePlaceholder {
  width: number;
  height: number;
  alt: string;
  src?: string;
}
