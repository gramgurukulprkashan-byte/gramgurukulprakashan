import Link from 'next/link';
import { formatHindiDate } from '@/lib/utils';
import { FileText, ImageIcon, Pin } from 'lucide-react';

interface NoticeCardProps {
  notice: {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    publishDate: string;
    important?: boolean;
    hasPdf?: boolean;
    hasImage?: boolean;
  };
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <article className="card-base p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {notice.important && (
          <span className="badge-important flex items-center gap-1 shrink-0">
            <Pin size={12} aria-hidden="true" />
            महत्वपूर्ण
          </span>
        )}
        <h3
          className="text-base font-semibold leading-snug flex-1"
          style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
        >
          <Link
            href={`/soochna/${notice.slug?.current}`}
            className="hover:underline transition-colors"
            style={{ color: 'var(--color-charcoal)' }}
          >
            {notice.title}
          </Link>
        </h3>
      </div>

      {notice.description && (
        <p className="text-sm line-clamp-2" style={{ color: 'var(--color-clay)' }}>
          {typeof notice.description === 'string'
            ? notice.description
            : ''}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--color-sand)' }}>
        <time
          dateTime={notice.publishDate}
          className="text-xs"
          style={{ color: 'var(--color-clay)' }}
        >
          {formatHindiDate(notice.publishDate)}
        </time>
        <div className="flex items-center gap-2">
          {notice.hasImage && (
            <span title="फोटो उपलब्ध" aria-label="फोटो उपलब्ध">
              <ImageIcon size={14} style={{ color: 'var(--color-clay)' }} aria-hidden="true" />
            </span>
          )}
          {notice.hasPdf && (
            <span title="PDF उपलब्ध" aria-label="PDF उपलब्ध">
              <FileText size={14} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
            </span>
          )}
          <Link
            href={`/soochna/${notice.slug?.current}`}
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--color-orange)' }}
          >
            पढ़ें →
          </Link>
        </div>
      </div>
    </article>
  );
}
