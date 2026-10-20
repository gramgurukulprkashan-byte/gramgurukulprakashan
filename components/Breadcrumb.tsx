import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1 flex-wrap">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
        style={{ color: 'var(--color-clay)' }}
        aria-label="मुख्य पृष्ठ"
      >
        <Home size={14} aria-hidden="true" />
        <span>मुख्य पृष्ठ</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} aria-hidden="true" style={{ color: 'var(--color-clay)', opacity: 0.5 }} />
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: 'var(--color-clay)' }}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--color-orange)' }}
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
