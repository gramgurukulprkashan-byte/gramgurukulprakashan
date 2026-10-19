import type { Metadata } from 'next';
import NoticeCard from '@/components/NoticeCard';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllNotices } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'सूचना एवं जानकारी',
  description: 'ग्राम गुरुकुल प्रकाशन की सभी सूचनाएँ, कार्यक्रम और जानकारी।',
};

const SEED_NOTICES = [
  {
    _id: 'seed-1',
    title: 'ग्राम वाचनालय की नई पुस्तकें उपलब्ध',
    slug: { current: 'gram-vachanalay-nayi-pustakein' },
    description: 'झाबुआ ज़िले के ग्राम वाचनालयों में नई पुस्तकें पहुँचाई जा रही हैं।',
    publishDate: '2026-10-15',
    important: true,
    hasPdf: false,
    hasImage: true,
  },
  {
    _id: 'seed-2',
    title: 'सशक्तिकरण वर्ग — अगला सत्र',
    slug: { current: 'sashaktikaran-varg-agla-satra' },
    description: 'अगले सशक्तिकरण वर्ग में भाग लेने के इच्छुक लोग अभी आवेदन कर सकते हैं।',
    publishDate: '2026-10-10',
    important: false,
    hasPdf: true,
    hasImage: false,
  },
  {
    _id: 'seed-3',
    title: '"मेरा जिला" पुस्तक में सहयोग करें',
    slug: { current: 'mera-jila-sahyog' },
    description: 'कक्षा 6 सामाजिक विज्ञान के लिए "मेरा जिला" पुस्तक के निर्माण में आपका सहयोग आमंत्रित है।',
    publishDate: '2026-10-01',
    important: false,
    hasPdf: false,
    hasImage: false,
  },
];

export default async function SoochnaPage() {
  let notices: typeof SEED_NOTICES = [];
  try {
    notices = await getAllNotices() || [];
  } catch { /* empty */ }
  if (!notices || notices.length === 0) notices = SEED_NOTICES;

  const pinned = notices.filter((n) => n.important);
  const regular = notices.filter((n) => !n.important);

  return (
    <>
      <PageHero
        title="सूचना एवं जानकारी"
        description="ग्राम गुरुकुल प्रकाशन की ताज़ा सूचनाएँ, कार्यक्रम और जानकारी"
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
