import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { getBookBySlug } from '@/lib/queries';
import { REAL_BOOKS } from '@/lib/seedData';
import { ArrowLeft, BookOpen, User, Building2, Mail } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SEED_LOOKUP: Record<string, any> = Object.fromEntries(
  REAL_BOOKS.map((b) => [b.slug.current, b])
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let book: any = null;
  try {
    book = await getBookBySlug(slug);
  } catch { /* empty */ }
  if (!book) book = SEED_LOOKUP[slug];
  if (!book) return { title: 'पुस्तक नहीं मिली' };
  return {
    title: `${book.title} — ग्रामगुरुकुल प्रकाशन`,
    description: book.description?.slice(0, 160),
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  let book: any = null;
  try {
    book = await getBookBySlug(slug);
  } catch { /* empty */ }
  if (!book && SEED_LOOKUP[slug]) book = SEED_LOOKUP[slug];
  if (!book) notFound();

  const coverUrl = book.coverImage || book.cover?.asset?.url || null;

  return (
    <>
      <PageHero
        title={book.title}
        breadcrumb={[
          { label: 'पुस्तकें एवं प्रकाशन', href: '/pustakein' },
          { label: book.title },
        ]}
        variant="mustard"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-4xl">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Cover */}
            <div className="md:col-span-1">
              <div
                className="relative rounded-2xl overflow-hidden shadow-xl"
                style={{
                  aspectRatio: '3/4',
                  backgroundColor: 'var(--color-sand)',
                  border: '3px solid var(--color-sand-dark)',
                }}
              >
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={`${book.title} — कवर पृष्ठ`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <BookOpen size={48} style={{ color: 'var(--color-orange)' }} />
                    <p className="text-xs text-center mt-3" style={{ color: 'var(--color-clay)' }}>
                      कवर पृष्ठ निर्माणाधीन
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {book.subject && (
                  <span
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(200, 102, 30, 0.1)',
                      color: 'var(--color-orange)',
                    }}
                  >
                    {book.subject}
                  </span>
                )}
                {book.status && (
                  <span className={book.status === 'प्रकाशित' ? 'badge-published' : 'badge-wip'}>
                    {book.status}
                  </span>
                )}
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
              >
                {book.title}
              </h2>

              {book.author && (
                <p className="text-sm mb-2 flex items-center gap-2" style={{ color: 'var(--color-clay)' }}>
                  <User size={16} aria-hidden="true" style={{ color: 'var(--color-orange)' }} />
                  <span className="font-semibold">लेखक / संपादक:</span> {book.author}
                </p>
              )}

              {book.publisher && (
                <p className="text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--color-clay)' }}>
                  <Building2 size={16} aria-hidden="true" style={{ color: 'var(--color-orange)' }} />
                  <span className="font-semibold">प्रकाशन:</span> {book.publisher}
                </p>
              )}

              {book.pages && (
                <p className="text-xs mb-4" style={{ color: 'var(--color-clay)' }}>
                  <strong>विस्तार:</strong> {book.pages}
                </p>
              )}

              {(book.author || book.publisher || book.pages) && (
                <hr className="my-4 border-t border-[var(--color-sand-dark)]" />
              )}

              {book.description && (
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-charcoal)' }}>
                  {book.description}
                </p>
              )}

              {/* Action Button */}
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <Link href="/sampark" className="btn-primary inline-flex items-center gap-2">
                  <Mail size={18} aria-hidden="true" />
                  पुस्तक प्राप्त करने हेतु संपर्क करें
                </Link>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--color-sand-dark)]">
                <Link href="/pustakein" className="btn-secondary flex items-center gap-2 w-fit">
                  <ArrowLeft size={16} aria-hidden="true" />
                  सभी पुस्तकें देखें
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
