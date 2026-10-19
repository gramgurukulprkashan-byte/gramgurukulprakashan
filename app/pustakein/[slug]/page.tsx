import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getBookBySlug } from '@/lib/queries';
import { ArrowLeft, Download } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const SEED_BOOKS: Record<string, any> = {
  'mera-jila-bhag-1': {
    title: 'मेरा जिला — भाग 1',
    slug: { current: 'mera-jila-bhag-1' },
    author: 'ग्राम गुरुकुल प्रकाशन',
    subject: 'सामाजिक विज्ञान',
    status: 'निर्माणाधीन',
    description: 'कक्षा 6 के लिए झाबुआ ज़िले पर आधारित सामाजिक विज्ञान की पाठ्यपुस्तक। इस पुस्तक में बच्चे अपने परिवार, समाज, खेत, नदी-तालाब और परंपराओं के माध्यम से सीखते हैं।',
    allowDownload: false,
  },
  'gram-atlas-jhabua': {
    title: 'ग्राम एटलस — झाबुआ',
    slug: { current: 'gram-atlas-jhabua' },
    author: 'ग्राम गुरुकुल प्रकाशन',
    subject: 'इतिहास एवं भूगोल',
    status: 'निर्माणाधीन',
    description: 'झाबुआ ज़िले के हर गाँव की कहानी, इतिहास, नदी-पहाड़, परंपराएँ और संस्कृति का एक विस्तृत दस्तावेज़।',
    allowDownload: false,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug).catch(() => SEED_BOOKS[slug]);
  if (!book) return { title: 'पुस्तक नहीं मिली' };
  return { title: book.title, description: book.description?.slice(0, 160) };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  let book: any = null;
  try { book = await getBookBySlug(slug); } catch { /* empty */ }
  if (!book && SEED_BOOKS[slug]) book = SEED_BOOKS[slug];
  if (!book) notFound();

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
                className="rounded-2xl flex flex-col items-center justify-center p-8"
                style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-sand)', border: '2px solid var(--color-sand-dark)' }}
                role="img"
                aria-label={`${book.title} — कवर`}
              >
                <svg viewBox="0 0 80 100" width="80" height="100" fill="none" aria-hidden="true">
                  <rect x="5" y="5" width="70" height="90" rx="6" fill="var(--color-mustard)" opacity="0.4" />
                  <path d="M20 35 H60 M20 45 H60 M20 55 H50 M20 65 H55" stroke="var(--color-clay)" strokeWidth="2" opacity="0.5" />
                </svg>
                <p className="text-xs text-center mt-2" style={{ color: 'var(--color-clay)' }}>TODO: कवर फोटो</p>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {book.subject && (
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}>
                    {book.subject}
                  </span>
                )}
                {book.status && (
                  <span className={book.status === 'प्रकाशित' ? 'badge-published' : 'badge-wip'}>
                    {book.status}
                  </span>
                )}
              </div>

              {book.author && (
                <p className="text-sm mb-4" style={{ color: 'var(--color-clay)' }}>
                  <span className="font-semibold">लेखक:</span> {book.author}
                </p>
              )}

              {book.description && (
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-charcoal)' }}>
                  {book.description}
                </p>
              )}

              {/* Download */}
              {book.allowDownload && book.samplePdf ? (
                <a
                  href={book.samplePdf?.asset?.url || '#'}
                  download
                  className="btn-primary mb-4"
                >
                  <Download size={18} aria-hidden="true" />
                  नमूना PDF डाउनलोड करें
                </a>
              ) : (
                /* PHASE 3 extension point: Order button (disabled) */
                <button className="btn-disabled mb-4" disabled aria-disabled="true" title="जल्द उपलब्ध होगा">
                  ऑर्डर जल्द उपलब्ध होगा
                </button>
              )}

              <div className="mt-4">
                <Link href="/pustakein" className="btn-secondary flex items-center gap-2 w-fit">
                  <ArrowLeft size={16} aria-hidden="true" />
                  सभी पुस्तकें
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
