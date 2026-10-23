import type { MetadataRoute } from 'next';
import { REAL_BOOKS, REAL_VILLAGES, REAL_KNOWLEDGE_TOPICS } from '@/lib/seedData';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gramgurukulprakashan.com';
  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/pustakein`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/gram-vachanalay`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gram-atlas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/karya`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/bhil-itihas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/sanskriti-parampara`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/parampragat-gyan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/gaon-se-shiksha`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/hamare-bare-mein`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hamse-judein`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sampark`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/soochna`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  // Dynamic books
  const bookRoutes: MetadataRoute.Sitemap = REAL_BOOKS.map((book) => ({
    url: `${siteUrl}/pustakein/${book.slug.current}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic village atlases
  const villageRoutes: MetadataRoute.Sitemap = REAL_VILLAGES.map((v) => ({
    url: `${siteUrl}/gram-atlas/${v.slug.current}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic knowledge topics
  const knowledgeRoutes: MetadataRoute.Sitemap = REAL_KNOWLEDGE_TOPICS.map((topic) => ({
    url: `${siteUrl}/parampragat-gyan/${topic.slug.current}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Traditions
  const traditionRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/sanskriti-parampara/halma`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];

  return [...staticRoutes, ...bookRoutes, ...villageRoutes, ...knowledgeRoutes, ...traditionRoutes];
}
