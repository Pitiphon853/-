import { MetadataRoute } from 'next';
import { getCalcs } from '../lib/toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://xn--42c4ar0dtc7i.com';
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const tools = getCalcs("TH");
  const toolPages: MetadataRoute.Sitemap = tools.map(calc => ({
    url: `${baseUrl}/${encodeURI(calc.slug || calc.id)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
