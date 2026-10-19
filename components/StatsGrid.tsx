'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
}

function StatCounter({ value, suffix = '', prefix = '', label, sublabel }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const stepMs = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easedProgress * value));
      if (step >= steps) { clearInterval(timer); setCount(value); }
    }, stepMs);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="stat-circle mb-4">
        <span
          className="text-2xl font-bold leading-none"
          style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-heading)' }}
        >
          {prefix}{count}{suffix}
        </span>
        {sublabel && (
          <span className="text-xs mt-1" style={{ color: 'var(--color-clay)' }}>
            {sublabel}
          </span>
        )}
      </div>
      <p
        className="text-sm font-semibold text-center max-w-28"
        style={{ color: 'var(--color-charcoal)' }}
      >
        {label}
      </p>
    </div>
  );
}

interface StatsGridProps {
  counters: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    sublabel?: string;
  }>;
}

export default function StatsGrid({ counters }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
      {counters.map((c, i) => (
        <StatCounter key={i} {...c} />
      ))}
    </div>
  );
}
