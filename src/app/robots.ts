import { MetadataRoute } from 'next';
import { SEO } from '@/data/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SEO.url}/sitemap.xml`,
  };
}
