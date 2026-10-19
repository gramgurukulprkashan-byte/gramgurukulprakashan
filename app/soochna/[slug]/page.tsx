import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import PageHero from '@/components/PageHero';
import { getNoticeBySlug } from '@/lib/queries';
import { formatHindiDate } from '@/lib/utils';
import { FileText, Pin, ArrowLeft, Share2 } from 'lucide-react';
import { urlFor } from '@/lib/sanity';

interface Props {
  params: Promise<{ slug: string }>;
}

import { REAL_NOTICES } from '@/lib/seedData';

// Map of real notices for immediate offline/seed lookup
const SEED_LOOKUP: Record<string, any> = Object.fromEntries(
  REAL_NOTICES.map((n) => [n.slug.current, n])
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let notice: any = await getNoticeBySlug(slug).catch(() => null);
  if (!notice) notice = SEED_LOOKUP[slug];
  if (!notice) return { title: 'सूचना नहीं मिली' };
  return {
    title: notice.title,
    description: typeof notice.description === 'string' ? notice.description.slice(0, 160) : '',
  };
}

export default async function NoticePage({ params }: Props) {
  const { slug } = await params;
  let notice: any = null;

  try {
    notice = await getNoticeBySlug(slug);
  } catch { /* empty */ }

  if (!notice && SEED_LOOKUP[slug]) {
    notice = SEED_LOOKUP[slug];
  }

  if (!notice) notFound();

  let imageUrl: string | null = null;
  if (typeof notice.image === 'string') {
    imageUrl = notice.image;
  } else if (notice.image) {
    try {
      imageUrl = urlFor(notice.image).width(800).height(500).url();
    } catch {
      imageUrl = null;
    }
  }

  return (
    <>
      <PageHero
        title={notice.title}
        breadcrumb={[
          { label: 'सूचना एवं जानकारी', href: '/soochna' },
          { label: notice.title },
        ]}
        variant="cream"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-3xl">
          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {notice.important && (
              <span className="badge-important flex items-center gap-1">
                <Pin size={12} aria-hidden="true" />
                महत्वपूर्ण
              </span>
            )}
            <time
              dateTime={notice.publishDate}
              className="text-sm"
              style={{ color: 'var(--color-clay)' }}
            >
              {formatHindiDate(notice.publishDate)}
            </time>
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={`${notice.title} — सूचना की फोटो`}
                width={800}
                height={500}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="prose-hindi mb-8">
            {typeof notice.description === 'string' ? (
              <p>{notice.description}</p>
            ) : (
              <PortableText value={notice.description} />
            )}
          </div>

          {/* PDF download */}
          {notice.pdf && (
            <div
              className="mb-8 p-4 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: 'var(--color-sand)', border: '2px solid var(--color-sand-dark)' }}
            >
              <FileText size={24} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-charcoal)' }}>
                  PDF दस्तावेज़ उपलब्ध है
                </p>
                <a
                  href={notice.pdf?.asset?.url || '#'}
                  download
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--color-orange)' }}
                >
                  डाउनलोड करें →
                </a>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Link href="/soochna" className="btn-secondary flex items-center gap-2">
              <ArrowLeft size={16} aria-hidden="true" />
              सभी सूचनाएँ
            </Link>
            <button
              className="btn-secondary flex items-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined' && navigator.share) {
                  navigator.share({ title: notice.title, url: window.location.href });
                }
              }}
              aria-label="यह सूचना साझा करें"
            >
              <Share2 size={16} aria-hidden="true" />
              साझा करें
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
