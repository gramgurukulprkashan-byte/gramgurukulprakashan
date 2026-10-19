import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllKnowledgeTopics } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'परंपरागत ज्ञान एवं आधुनिक विज्ञान',
  description: 'गाँव के परंपरागत ज्ञान और आधुनिक विज्ञान के बीच का संवाद।',
};

const SEED_TOPICS = [
  { _id: 'k1', title: 'पारंपरिक खेती और आधुनिक कृषि-विज्ञान', slug: { current: 'kheti' } },
  { _id: 'k2', title: 'बीज संरक्षण और स्थानीय कृषि पद्धतियाँ', slug: { current: 'beej-sanrakshan' } },
  { _id: 'k3', title: 'पशुपालन और पशुओं की देखभाल', slug: { current: 'pashupalan' } },
  { _id: 'k4', title: 'आयुर्वेद और औषधीय पौधे', slug: { current: 'ayurved' } },
  { _id: 'k5', title: 'लकड़ी का काम और घर बनाने की कला', slug: { current: 'lakdi-ghar' } },
  { _id: 'k6', title: 'जल संरक्षण और प्राकृतिक संसाधन', slug: { current: 'jal-sanrakshan' } },
  { _id: 'k7', title: 'गाँव की पारंपरिक व्यवस्थाओं का अध्ययन', slug: { current: 'gram-vyavastha' } },
];

export default async function ParampragatGyanPage() {
  let topics: typeof SEED_TOPICS = [];
  try { topics = await getAllKnowledgeTopics() || []; } catch { /* empty */ }
  if (!topics || topics.length === 0) topics = SEED_TOPICS;

  return (
    <>
      <PageHero
        title="परंपरागत ज्ञान एवं आधुनिक विज्ञान"
        description="गाँव के ज्ञान और विज्ञान के बीच का संवाद"
        breadcrumb={[{ label: 'परंपरागत ज्ञान' }]}
        variant="cream"
      />

      {/* Intro */}
      <section className="py-12 section-sand" aria-label="परिचय">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(122, 74, 43, 0.08)', border: '2px solid rgba(122, 74, 43, 0.2)' }}
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ color: 'var(--color-clay)', fontFamily: 'var(--font-heading)' }}
              >
                🌾 परंपरागत ज्ञान
              </h2>
              <p style={{ color: 'var(--color-clay)' }}>
                सदियों के अनुभव से अर्जित ज्ञान — जो गाँव की मिट्टी, पानी, पशु और मनुष्य के बीच के संबंध को समझता है।
              </p>
            </div>
            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(63, 91, 46, 0.08)', border: '2px solid rgba(63, 91, 46, 0.2)' }}
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ color: 'var(--color-green)', fontFamily: 'var(--font-heading)' }}
              >
                🔬 आधुनिक विज्ञान
              </h2>
              <p style={{ color: 'var(--color-green)' }}>
                नए शोध और तकनीक — जो परंपरागत ज्ञान की पुष्टि करते हैं या नए रास्ते सुझाते हैं।
              </p>
            </div>
          </div>
          <p className="text-center mt-8 text-lg font-semibold" style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}>
            इन दोनों के बीच संवाद से गाँव और विज्ञान दोनों समृद्ध होते हैं।
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 section-cream" aria-label="विषय">
        <div className="container-main">
          <SectionTitle title="विषय" />
          {topics.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {topics.map((t: any) => (
                <Link
                  key={t._id}
                  href={`/parampragat-gyan/${t.slug?.current}`}
                  className="card-base p-6 no-underline block group"
                  style={{ textDecoration: 'none' }}
                >
                  <h2
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {t.title}
                  </h2>
                  <span className="text-sm font-medium group-hover:underline" style={{ color: 'var(--color-orange)', display: 'block' }}>
                    परंपरागत vs आधुनिक →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई विषय उपलब्ध नहीं है।" />
          )}
        </div>
      </section>
    </>
  );
}
