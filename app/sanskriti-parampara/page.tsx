import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllTraditions, getAllRoles } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'संस्कृति और परंपराएँ',
  description: 'भील समाज की सांस्कृतिक विरासत — हलमा, मातावन, फाळा और पारंपरिक भूमिकाएँ।',
};

const SEED_TRADITIONS = [
  {
    _id: 't1', name: 'हलमा', slug: { current: 'halma' },
    meaning: 'सामूहिक श्रम की पारंपरिक भील परंपरा, जिसमें पूरा गाँव मिलकर काम करता है।',
  },
  {
    _id: 't2', name: 'मातावन', slug: { current: 'matavan' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
  {
    _id: 't3', name: 'भिड़हा', slug: { current: 'bhidha' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
  {
    _id: 't4', name: 'नवाई', slug: { current: 'navai' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
  {
    _id: 't5', name: 'जातर', slug: { current: 'jatar' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
  {
    _id: 't6', name: 'सलावणी', slug: { current: 'salavani' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
  {
    _id: 't7', name: 'फाळा', slug: { current: 'phala' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
  {
    _id: 't8', name: 'नौतरां', slug: { current: 'nautara' },
    meaning: 'TODO: ग्राम बुज़ुर्गों से प्रमाणित विवरण लें।',
  },
];

const SEED_ROLES = [
  { _id: 'r1', name: 'बड़वा', slug: { current: 'badwa' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
  { _id: 'r2', name: 'तड़वी', slug: { current: 'tadvi' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
  { _id: 'r3', name: 'कोटवाल', slug: { current: 'kotwal' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
  { _id: 'r4', name: 'पुजारा', slug: { current: 'pujara' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
  { _id: 'r5', name: 'वार्तिया', slug: { current: 'wartiya' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
  { _id: 'r6', name: 'वातड़िया', slug: { current: 'vatadiya' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
  { _id: 'r7', name: 'होयणपणी', slug: { current: 'hoynapani' }, description: 'TODO: भूमिका का विवरण दर्ज करें।' },
];

export default async function SanskritiPage() {
  let traditions: typeof SEED_TRADITIONS = [];
  let roles: typeof SEED_ROLES = [];
  try { traditions = await getAllTraditions() || []; } catch { /* empty */ }
  try { roles = await getAllRoles() || []; } catch { /* empty */ }
  if (!traditions || traditions.length === 0) traditions = SEED_TRADITIONS;
  if (!roles || roles.length === 0) roles = SEED_ROLES;

  return (
    <>
      <PageHero
        title="संस्कृति और परंपराएँ"
        description="भील समाज की समृद्ध सांस्कृतिक विरासत"
        breadcrumb={[{ label: 'संस्कृति और परंपराएँ' }]}
        variant="mustard"
      />

      {/* Traditions */}
      <section className="py-16 section-cream" aria-label="परंपराएँ">
        <div className="container-main">
          <SectionTitle title="परंपराएँ" subtitle="भील समाज की सामाजिक परंपराएँ" />
          <p className="mb-6 text-sm italic" style={{ color: 'var(--color-clay)' }}>
            * TODO: सभी विवरण ग्राम बुज़ुर्गों से प्रमाणित कराएँ। प्रकाशन से पहले सामुदायिक सहमति ली जाएगी।
          </p>
          {traditions.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {traditions.map((t: any) => (
                <Link
                  key={t._id}
                  href={`/sanskriti-parampara/${t.slug?.current}`}
                  className="card-base p-5 no-underline block"
                  style={{ textDecoration: 'none' }}
                >
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {t.name}
                  </h2>
                  {t.meaning && (
                    <p className="text-sm line-clamp-3" style={{ color: 'var(--color-clay)' }}>
                      {t.meaning}
                    </p>
                  )}
                  <span className="mt-3 text-sm font-medium" style={{ color: 'var(--color-orange)', display: 'block' }}>
                    अधिक जानें →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="अभी परंपराओं की जानकारी उपलब्ध नहीं है।" />
          )}
        </div>
      </section>

      {/* Roles */}
      <section className="py-16 section-sand" aria-label="पारंपरिक भूमिकाएँ">
        <div className="container-main">
          <SectionTitle title="पारंपरिक भूमिकाएँ" subtitle="ज्ञान की परंपरा" />
          {roles.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {roles.map((r: any) => (
                <div
                  key={r._id}
                  className="card-base p-5"
                >
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-heading)' }}
                  >
                    {r.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="अभी भूमिकाओं की जानकारी उपलब्ध नहीं है।" />
          )}
        </div>
      </section>
    </>
  );
}
