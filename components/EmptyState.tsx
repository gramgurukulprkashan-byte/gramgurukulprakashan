interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  message = 'अभी कोई सामग्री उपलब्ध नहीं है।',
  icon,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-2xl"
      style={{ backgroundColor: 'var(--color-sand)', border: '2px dashed var(--color-sand-dark)' }}
      role="status"
      aria-live="polite"
    >
      {icon ? (
        <div className="mb-4 opacity-40" aria-hidden="true">{icon}</div>
      ) : (
        <div className="mb-4" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
            <circle cx="40" cy="40" r="35" fill="var(--color-clay)" opacity="0.1" />
            <path d="M25 30 H55 M25 40 H50 M25 50 H45" stroke="var(--color-clay)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
      )}
      <p className="text-base" style={{ color: 'var(--color-clay)' }}>
        {message}
      </p>
    </div>
  );
}
