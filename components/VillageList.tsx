'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, CheckCircle2 } from 'lucide-react';

interface VillageListProps {
  villages: string[];
}

export default function VillageList({ villages }: VillageListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVillages = useMemo(() => {
    if (!searchTerm.trim()) {
      return villages.map((name, idx) => ({ name, originalIndex: idx + 1 }));
    }
    const term = searchTerm.trim().toLowerCase();
    return villages
      .map((name, idx) => ({ name, originalIndex: idx + 1 }))
      .filter((v) => v.name.toLowerCase().includes(term));
  }, [villages, searchTerm]);

  return (
    <div className="w-full">
      {/* ── Search Bar ──────────────────────────────────── */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-clay)' }}
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="गाँव का नाम खोजें (उदा. छागोला, बरखेड़ा, सालारपाड़ा...)"
            className="input-base pl-12 pr-4 py-3 text-base w-full shadow-sm"
          />
        </div>
        <div
          className="mt-2.5 flex items-center justify-between text-xs px-2"
          style={{ color: 'var(--color-clay)' }}
        >
          <span>कुल गाँव: {villages.length}</span>
          {searchTerm.trim() && (
            <span>खोज परिणाम: {filteredVillages.length} गाँव</span>
          )}
        </div>
      </div>

      {/* ── Village List Grid (No photos, no atlas vivran link) ─ */}
      {filteredVillages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVillages.map(({ name, originalIndex }) => (
            <div
              key={`${name}-${originalIndex}`}
              className="card-base p-4 flex items-center gap-3.5 transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--color-sand-dark)',
              }}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                style={{
                  backgroundColor: 'rgba(200, 102, 30, 0.1)',
                  color: 'var(--color-orange)',
                }}
              >
                {String(originalIndex).padStart(2, '0')}
              </span>

              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-base truncate"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  ग्राम {name}
                </h3>
                <p className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--color-clay)' }}>
                  <MapPin size={11} aria-hidden="true" />
                  सर्वेक्षित गाँव
                </p>
              </div>

              <CheckCircle2 size={16} className="text-emerald-600/70 shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 px-4 rounded-xl border border-dashed"
          style={{ borderColor: 'var(--color-sand-dark)', backgroundColor: 'white' }}
        >
          <p className="text-base font-medium mb-3" style={{ color: 'var(--color-charcoal)' }}>
            "{searchTerm}" नाम से कोई गाँव सूची में नहीं मिला।
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="btn-secondary text-xs px-4 py-1.5"
          >
            सभी गाँव देखें
          </button>
        </div>
      )}
    </div>
  );
}
