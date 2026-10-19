import Breadcrumb from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  variant?: 'mustard' | 'cream' | 'charcoal';
}

export default function PageHero({
  title,
  description,
  breadcrumb,
  variant = 'mustard',
}: PageHeroProps) {
  const bgStyles: Record<string, { bg: string; titleColor: string; descColor: string }> = {
    mustard: {
      bg: 'var(--color-mustard)',
      titleColor: 'var(--color-charcoal)',
      descColor: 'rgba(26, 26, 26, 0.75)',
    },
    cream: {
      bg: 'var(--color-cream)',
      titleColor: 'var(--color-charcoal)',
      descColor: 'var(--color-clay)',
    },
    charcoal: {
      bg: 'var(--color-charcoal)',
      titleColor: 'white',
      descColor: 'var(--color-sand)',
    },
  };

  const s = bgStyles[variant];

  return (
    <section
      className="relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-14 dot-pattern"
      style={{ backgroundColor: s.bg }}
      aria-label="पृष्ठ शीर्षक"
    >
      <div className="container-main relative z-10">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="mb-4">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        <h1
          className="text-3xl md:text-5xl font-bold mb-3"
          style={{ color: s.titleColor, fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-lg max-w-2xl"
            style={{ color: s.descColor }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
