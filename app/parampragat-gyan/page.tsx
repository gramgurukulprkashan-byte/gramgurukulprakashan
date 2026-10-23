import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import { getAllKnowledgeTopics } from '@/lib/queries';
import { REAL_KNOWLEDGE_TOPICS } from '@/lib/seedData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'परंपरागत ज्ञान एवं आधुनिक विज्ञान | ग्रामगुरुकुल प्रकाशन',
  description: 'गाँव के सदियों पुराने परंपरागत ज्ञान और आधुनिक विज्ञान के बीच का संवाद — खेती, बीज, पशुपालन, आयुर्वेद, वास्तुकला व जल संरक्षण।',
};

export default async function ParampragatGyanPage() {
  let topics = [];
  try {
    topics = (await getAllKnowledgeTopics()) || [];
  } catch {
    /* empty */
  }
  if (!topics || topics.length === 0) {
    topics = REAL_KNOWLEDGE_TOPICS;
  }

  return (
    <>
      <PageHero
        title="परंपरागत ज्ञान एवं आधुनिक विज्ञान"
        description="गाँव के अनुभव-सिद्ध ज्ञान और समकालीन विज्ञान के बीच एक सार्थक सेतु"
        breadcrumb={[{ label: 'परंपरागत ज्ञान' }]}
        variant="cream"
      />

      {/* Intro */}
      <section className="py-12 section-sand" aria-label="परिचय">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-6 md:p-8 rounded-2xl"
              style={{
                backgroundColor: 'rgba(122, 74, 43, 0.08)',
                border: '2px solid rgba(122, 74, 43, 0.2)',
              }}
            >
              <h2
                className="text-xl font-bold mb-3 flex items-center gap-2"
                style={{ color: 'var(--color-clay)', fontFamily: 'var(--font-heading)' }}
              >
                <span>🌾</span>
                <span>परंपरागत ज्ञान</span>
              </h2>
              <p className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--color-clay)' }}>
                सदियों के अनुभव से अर्जित लोक-ज्ञान — जो गाँव की मिट्टी, पानी, नक्षत्र, वनस्पति, पशु और मानव समाज के आपसी सह-अस्तित्व को गहराई से समझता है।
              </p>
            </div>

            <div
              className="p-6 md:p-8 rounded-2xl"
              style={{
                backgroundColor: 'rgba(63, 91, 46, 0.08)',
                border: '2px solid rgba(63, 91, 46, 0.2)',
              }}
            >
              <h2
                className="text-xl font-bold mb-3 flex items-center gap-2"
                style={{ color: 'var(--color-green)', fontFamily: 'var(--font-heading)' }}
              >
                <span>🔬</span>
                <span>आधुनिक विज्ञान</span>
              </h2>
              <p className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--color-green)' }}>
                समकालीन शोध, प्रयोगशाला परीक्षण और उन्नत तकनीकें — जो पारंपरिक ज्ञान के वैज्ञानिक आधार की पुष्टि करती हैं और नए समाधान प्रस्तुत करती हैं।
              </p>
            </div>
          </div>

          <div
            className="text-center mt-8 p-4 rounded-xl max-w-2xl mx-auto"
            style={{ backgroundColor: 'white', border: '1px solid var(--color-sand-dark)' }}
          >
            <p
              className="text-base md:text-lg font-semibold flex items-center justify-center gap-2"
              style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
            >
              <Sparkles size={18} style={{ color: 'var(--color-orange)' }} />
              <span>इन दोनों के बीच संवाद से गाँव और विज्ञान दोनों समृद्ध होते हैं।</span>
            </p>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16 section-cream" aria-label="विषय">
        <div className="container-main">
          <SectionTitle
            title="विषय"
            subtitle="प्रत्येक विषय पर पारंपरिक समझ और आधुनिक वैज्ञानिक दृष्टिकोण का विस्तृत तुलनात्मक अध्ययन"
          />

          {topics.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t: any, idx: number) => (
                <Link
                  key={t._id || t.slug?.current || idx}
                  href={`/parampragat-gyan/${t.slug?.current}`}
                  className="card-base p-6 no-underline flex flex-col justify-between group hover:shadow-xl transition-all duration-200"
                  style={{ textDecoration: 'none', backgroundColor: 'white' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{
                          backgroundColor: 'rgba(200, 102, 30, 0.1)',
                          color: 'var(--color-orange)',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded font-medium"
                        style={{
                          backgroundColor: 'rgba(63, 91, 46, 0.1)',
                          color: 'var(--color-green)',
                        }}
                      >
                        ज्ञान संवाद
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 group-hover:text-[var(--color-orange)] transition-colors"
                      style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                    >
                      {t.title}
                    </h3>

                    {t.summary && (
                      <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--color-clay)' }}>
                        {t.summary}
                      </p>
                    )}
                  </div>

                  <div
                    className="pt-3 border-t border-[var(--color-sand-dark)] flex items-center justify-between text-xs font-semibold"
                    style={{ color: 'var(--color-orange)' }}
                  >
                    <span>परंपरागत vs आधुनिक पढ़ें</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
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
