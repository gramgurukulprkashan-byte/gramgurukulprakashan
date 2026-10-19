import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllBooks } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'पुस्तकें एवं प्रकाशन',
  description: 'ग्राम गुरुकुल प्रकाशन की प्रकाशित और निर्माणाधीन पुस्तकें।',
};

const SEED_BOOKS = [
  {
    _id: 'book-1',
    title: 'मेरा जिला — भाग 1',
    slug: { current: 'mera-jila-bhag-1' },
    author: 'ग्राम गुरुकुल प्रकाशन',
    cover: null,
    subject: 'सामाजिक विज्ञान',
    status: 'निर्माणाधीन',
    description: 'कक्षा 6 के लिए झाबुआ ज़िले पर आधारित सामाजिक विज्ञान की पाठ्यपुस्तक, जो बच्चों को उनके परिवेश से जोड़ती है।',
  },
  {
    _id: 'book-2',
    title: 'ग्राम एटलस — झाबुआ',
    slug: { current: 'gram-atlas-jhabua' },
    author: 'ग्राम गुरुकुल प्रकाशन',
    cover: null,
    subject: 'इतिहास एवं भूगोल',
    status: 'निर्माणाधीन',
    description: 'झाबुआ ज़िले के हर गाँव की कहानी, इतिहास, नदी-पहाड़, परंपराएँ और संस्कृति।',
  },
];

export default async function PustakeinPage() {
  let books: typeof SEED_BOOKS = [];
  try {
    books = await getAllBooks() || [];
  } catch { /* empty */ }
  if (!books || books.length === 0) books = SEED_BOOKS;

  return (
    <>
      <PageHero
        title="पुस्तकें एवं प्रकाशन"
        description="ग्राम गुरुकुल प्रकाशन की पुस्तकें — गाँव के ज्ञान से, गाँव के लिए"
        breadcrumb={[{ label: 'पुस्तकें एवं प्रकाशन' }]}
        variant="mustard"
      />

      <section className="py-16 section-cream">
        <div className="container-main">
          <SectionTitle title="सभी पुस्तकें" />
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <article key={book._id} className="card-base overflow-hidden flex flex-col">
                  {/* Cover placeholder */}
                  <div
                    className="flex flex-col items-center justify-center p-8"
                    style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-sand)' }}
                  >
                    <svg viewBox="0 0 80 100" width="60" height="75" fill="none" aria-hidden="true">
                      <rect x="5" y="5" width="70" height="90" rx="6" fill="var(--color-mustard)" opacity="0.3" />
                      <rect x="10" y="10" width="60" height="80" rx="4" fill="var(--color-orange)" opacity="0.2" />
                      <path d="M20 35 H60 M20 45 H60 M20 55 H50" stroke="var(--color-clay)" strokeWidth="2" opacity="0.5" />
                    </svg>
                    <p className="text-xs text-center mt-2" style={{ color: 'var(--color-clay)' }}>
                      TODO: कवर
                    </p>
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    {book.subject && (
                      <span className="text-xs font-medium" style={{ color: 'var(--color-orange)' }}>
                        {book.subject}
                      </span>
                    )}
                    <h2
                      className="text-base font-bold"
                      style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                    >
                      <Link href={`/pustakein/${book.slug?.current}`} className="hover:underline" style={{ color: 'var(--color-charcoal)' }}>
                        {book.title}
                      </Link>
                    </h2>
                    {book.author && (
                      <p className="text-xs" style={{ color: 'var(--color-clay)' }}>लेखक: {book.author}</p>
                    )}
                    {book.status && (
                      <span className={book.status === 'प्रकाशित' ? 'badge-published' : 'badge-wip'}>
                        {book.status}
                      </span>
                    )}
                    {book.description && (
                      <p className="text-sm line-clamp-2" style={{ color: 'var(--color-clay)' }}>{book.description}</p>
                    )}
                    <div className="mt-auto pt-2">
                      <Link href={`/pustakein/${book.slug?.current}`} className="text-sm font-medium hover:underline" style={{ color: 'var(--color-orange)' }}>
                        विवरण देखें →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई पुस्तक उपलब्ध नहीं है।" />
          )}
        </div>
      </section>
    </>
  );
}
