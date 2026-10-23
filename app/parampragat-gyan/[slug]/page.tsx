import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getKnowledgeTopicBySlug } from '@/lib/queries';
import { REAL_KNOWLEDGE_TOPICS, KnowledgeTopicItem } from '@/lib/seedData';
import { ArrowLeft, BookOpen, Lightbulb, Scale, Users, Mail } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const TOPIC_LOOKUP: Record<string, KnowledgeTopicItem> = Object.fromEntries(
  REAL_KNOWLEDGE_TOPICS.map((t) => [t.slug.current, t])
);

export async function generateStaticParams() {
  return REAL_KNOWLEDGE_TOPICS.map((t) => ({
    slug: t.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let topic: any = null;
  try {
    topic = await getKnowledgeTopicBySlug(slug);
  } catch {
    /* empty */
  }
  if (!topic) topic = TOPIC_LOOKUP[slug];
  if (!topic) return { title: 'विषय नहीं मिला | ग्रामगुरुकुल प्रकाशन' };

  return {
    title: `${topic.title} | परंपरागत ज्ञान एवं आधुनिक विज्ञान`,
    description: topic.summary || `${topic.title} पर पारंपरिक ज्ञान और आधुनिक विज्ञान का तुलनात्मक अध्ययन।`,
  };
}

export default async function KnowledgeTopicPage({ params }: Props) {
  const { slug } = await params;
  let topic: any = null;
  try {
    topic = await getKnowledgeTopicBySlug(slug);
  } catch {
    /* empty */
  }
  if (!topic && TOPIC_LOOKUP[slug]) {
    topic = TOPIC_LOOKUP[slug];
  }

  if (!topic) notFound();

  return (
    <>
      <PageHero
        title={topic.title}
        description="परंपरागत अनुभव-सिद्ध ज्ञान और आधुनिक वैज्ञानिक शोध का प्रामाणिक संवाद"
        breadcrumb={[
          { label: 'परंपरागत ज्ञान', href: '/parampragat-gyan' },
          { label: topic.title },
        ]}
        variant="cream"
      />

      <article className="py-16 section-cream">
        <div className="container-main max-w-4xl">
          {/* Summary Callout if available */}
          {topic.summary && (
            <div
              className="p-5 md:p-6 rounded-2xl mb-10"
              style={{
                backgroundColor: 'white',
                border: '2px solid var(--color-sand-dark)',
              }}
            >
              <p
                className="text-base md:text-lg font-medium leading-relaxed text-center"
                style={{ color: 'var(--color-charcoal)' }}
              >
                {topic.summary}
              </p>
            </div>
          )}

          {/* Two-column comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Traditional Knowledge */}
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(122, 74, 43, 0.06)',
                border: '2px solid rgba(122, 74, 43, 0.25)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl" aria-hidden="true">🌾</span>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: 'var(--color-clay)', fontFamily: 'var(--font-heading)' }}
                  >
                    परंपरागत लोक-ज्ञान
                  </h2>
                </div>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--color-clay)', whiteSpace: 'pre-line' }}
                >
                  {topic.traditionalKnowledge}
                </p>
              </div>
              <div
                className="mt-6 pt-3 border-t text-xs font-semibold"
                style={{ borderColor: 'rgba(122, 74, 43, 0.2)', color: 'var(--color-clay)' }}
              >
                स्रोत: भील अंचल की वाचिक परंपरा एवं ग्राम बुजुर्ग
              </div>
            </div>

            {/* Modern Science */}
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(63, 91, 46, 0.06)',
                border: '2px solid rgba(63, 91, 46, 0.25)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl" aria-hidden="true">🔬</span>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: 'var(--color-green)', fontFamily: 'var(--font-heading)' }}
                  >
                    आधुनिक विज्ञान
                  </h2>
                </div>
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--color-green)', whiteSpace: 'pre-line' }}
                >
                  {topic.modernScience}
                </p>
              </div>
              <div
                className="mt-6 pt-3 border-t text-xs font-semibold"
                style={{ borderColor: 'rgba(63, 91, 46, 0.2)', color: 'var(--color-green)' }}
              >
                स्रोत: समकालीन वैज्ञानिक शोध एवं कृषि-पर्यावरण विज्ञान
              </div>
            </div>
          </div>

          {/* Deep Analysis Cards: Similarities, Differences, Uses */}
          <div className="space-y-6 mb-12">
            {topic.similarities && (
              <section
                className="card-base p-6 md:p-7"
                style={{ backgroundColor: 'white' }}
                aria-label="समानताएँ"
              >
                <h3
                  className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  <Users size={20} style={{ color: 'var(--color-orange)' }} />
                  <span>समानताएँ एवं साझा ध्येय</span>
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                  {topic.similarities}
                </p>
              </section>
            )}

            {topic.differences && (
              <section
                className="card-base p-6 md:p-7"
                style={{ backgroundColor: 'white' }}
                aria-label="अंतर"
              >
                <h3
                  className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  <Scale size={20} style={{ color: 'var(--color-orange)' }} />
                  <span>दृष्टिकोण और पद्धति में अंतर</span>
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                  {topic.differences}
                </p>
              </section>
            )}

            {topic.uses && (
              <section
                className="card-base p-6 md:p-7"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--color-orange)',
                }}
                aria-label="समन्वय व उपयोग"
              >
                <h3
                  className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  <Lightbulb size={20} style={{ color: 'var(--color-orange)' }} />
                  <span>व्यावहारिक समन्वय एवं भविष्य का मार्ग</span>
                </h3>
                <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: 'var(--color-charcoal)' }}>
                  {topic.uses}
                </p>
              </section>
            )}
          </div>

          {/* Mission Quote */}
          <div
            className="p-6 md:p-8 rounded-2xl text-center mb-10"
            style={{
              backgroundColor: 'var(--color-mustard)',
              color: 'var(--color-charcoal)',
            }}
          >
            <p
              className="font-bold text-lg md:text-xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              "आधुनिक विज्ञान गाँव तक पहुँचे और गाँव का ज्ञान देश तक — यही ग्रामगुरुकुल का संकल्प है।"
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--color-sand-dark)]">
            <Link
              href="/parampragat-gyan"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              सभी विषय देखें
            </Link>

            <Link
              href="/sampark"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <Mail size={16} aria-hidden="true" />
              शोध एवं सहयोग हेतु संपर्क करें
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
