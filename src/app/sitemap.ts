import { MetadataRoute } from 'next';
import { SEO } from '@/data/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.url;

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/menu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
