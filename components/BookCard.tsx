import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface BookCardProps {
  book: {
    _id: string;
    title: string;
    slug: { current: string };
    author?: string;
    cover?: unknown;
    subject?: string;
    status?: 'प्रकाशित' | 'निर्माणाधीन';
    description?: string;
  };
}

export default function BookCard({ book }: BookCardProps) {
  const coverUrl = book.cover
    ? urlFor(book.cover).width(300).height(400).url()
    : null;

  return (
    <article className="card-base overflow-hidden flex flex-col">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-sand)' }}
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`${book.title} — किताब का कवर`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
            style={{ backgroundColor: 'var(--color-sand)' }}
          >
            <svg viewBox="0 0 80 100" width="60" height="75" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="70" height="90" rx="6" fill="#E3B023" opacity="0.3" />
              <rect x="10" y="10" width="60" height="80" rx="4" fill="#C8661E" opacity="0.2" />
              <path d="M20 35 H60 M20 45 H60 M20 55 H50" stroke="#7A4A2B" strokeWidth="2" opacity="0.5" />
            </svg>
            <p className="text-xs mt-2" style={{ color: 'var(--color-clay)' }}>
              TODO: कवर फोटो जोड़ें
            </p>
          </div>
        )}
        {book.status && (
          <div className="absolute top-2 left-2">
            <span className={book.status === 'प्रकाशित' ? 'badge-published' : 'badge-wip'}>
              {book.status}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        {book.subject && (
          <span className="text-xs font-medium" style={{ color: 'var(--color-orange)' }}>
            {book.subject}
          </span>
        )}
        <h3
          className="text-base font-semibold leading-snug"
          style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
        >
          <Link
            href={`/pustakein/${book.slug?.current}`}
            className="hover:underline"
            style={{ color: 'var(--color-charcoal)' }}
          >
            {book.title}
          </Link>
        </h3>
        {book.author && (
          <p className="text-xs" style={{ color: 'var(--color-clay)' }}>
            लेखक: {book.author}
          </p>
        )}
        <div className="mt-auto pt-3">
          <Link
            href={`/pustakein/${book.slug?.current}`}
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--color-orange)' }}
          >
            विवरण देखें →
          </Link>
        </div>
      </div>
    </article>
  );
}
