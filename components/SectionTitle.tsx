interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
        style={{
          color: light ? 'white' : 'var(--color-charcoal)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base md:text-lg max-w-2xl"
          style={{
            color: light ? 'var(--color-sand)' : 'var(--color-clay)',
            marginLeft: centered ? 'auto' : undefined,
            marginRight: centered ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-3 w-16 h-1 rounded-full" style={{ backgroundColor: 'var(--color-mustard)', marginLeft: centered ? 'auto' : 0, marginRight: centered ? 'auto' : 0 }} aria-hidden="true" />
    </div>
  );
}
