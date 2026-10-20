import type { Metadata } from 'next';
import NoticeCard from '@/components/NoticeCard';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllNotices } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'सूचना एवं जानकारी',
  description: 'ग्रामगुरुकुल प्रकाशन की सभी सूचनाएँ, कार्यक्रम और जानकारी।',
};

import { REAL_NOTICES } from '@/lib/seedData';

export default async function SoochnaPage() {
  let notices: any[] = [];
  try {
    notices = await getAllNotices() || [];
  } catch { /* empty */ }
  if (!notices || notices.length === 0) notices = REAL_NOTICES;

  const pinned = notices.filter((n) => n.important);
  const regular = notices.filter((n) => !n.important);

  return (
    <>
      <PageHero
        title="सूचना एवं जानकारी"
        description="ग्रामगुरुकुल प्रकाशन की ताज़ा सूचनाएँ, कार्यक्रम और जानकारी"
        breadcrumb={[{ label: 'सूचना एवं जानकारी' }]}
        variant="cream"
      />

      <section className="py-16 section-cream" aria-label="सूचनाएँ">
        <div className="container-main">
          {/* Pinned notices */}
          {pinned.length > 0 && (
            <div className="mb-12">
              <SectionTitle title="महत्वपूर्ण सूचनाएँ" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinned.map((n) => (
                  <NoticeCard key={n._id} notice={n as any} />
                ))}
              </div>
            </div>
          )}

          {/* Regular notices */}
          {regular.length > 0 ? (
            <div>
              <SectionTitle title={pinned.length > 0 ? 'अन्य सूचनाएँ' : 'सभी सूचनाएँ'} />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map((n) => (
                  <NoticeCard key={n._id} notice={n as any} />
                ))}
              </div>
            </div>
          ) : pinned.length === 0 ? (
            <EmptyState message="अभी कोई सूचना उपलब्ध नहीं है।" />
          ) : null}
        </div>
      </section>
    </>
  );
}
