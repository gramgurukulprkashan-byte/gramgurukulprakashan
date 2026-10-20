import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { AlertTriangle, Shield, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'भील समाज का इतिहास एवं धरोहर',
  description: 'भील समाज का गौरवशाली इतिहास, वीर कोटिया भील, मानगढ़ नरसंहार, मालवई के प्राचीन मंदिर और स्वतंत्रता संग्राम में अप्रतिम योगदान।',
};

const FREEDOM_HEROES = [
  {
    name: 'वीर शिरोमणि कोटिया भील',
    title: 'कोटा राज्य के संस्थापक व अमर योद्धा',
    desc: 'सिर धड़ से अलग होने पर भी वीरता से लड़ते रहे कोटिया भील। कोटा नगर का नामकरण इन्हीं के शौर्य पर हुआ।',
    image: '/content-media/veer-kotia-bhil.webp',
  },
  {
    name: 'राणा पूंजा भील',
    title: 'हल्दीघाटी के अजेय सेनानायक',
    desc: 'महाराणा प्रताप के विश्वस्त सहयोगी जिन्होंने भील धनुर्धरों के साथ मिलकर मुग़ल सेना के दाँत खट्टे किए।',
    icon: '🏹',
  },
  {
    name: 'क्रांतिसूर्य टंट्या भील (टंट्या मामा)',
    title: 'निमाड़-मालवा के जननायक',
    desc: 'अंग्रेज़ी हुकूमत के ख़िलाफ़ गुरिल्ला युद्ध लड़कर ग़रीबों के संरक्षक बने अमर क्रांतिकारी।',
    icon: '⚡',
  },
  {
    name: 'गोविंद गुरु',
    title: 'भगत आंदोलन के प्रणेता',
    desc: 'मानगढ़ धाम में भील समाज को नशामुक्ति, शिक्षा और आत्मसम्मान का मार्ग दिखाने वाले आध्यात्मिक संत।',
    icon: '🔥',
  },
];

const HERITAGE_PHOTOS = [
  {
    src: '/content-media/malvai-ancient-temple.webp',
    title: 'मालवई प्राचीन मंदिर — 10वीं/11वीं सदी',
    desc: 'झाबुआ के मालवई में स्थित परमार कालीन ऐतिहासिक शिव मंदिर का अध्ययन दल द्वारा निरीक्षण।',
  },
  {
    src: '/content-media/temple-sculpture.webp',
    title: 'प्राचीन पाषाण शिल्पकला',
    desc: 'देवझीरी व मालवई क्षेत्र के प्राचीन मंदिरों में उकेरी गई सूक्ष्म भारतीय मूर्तिकला।',
  },
  {
    src: '/content-media/deojhiri-temple.webp',
    title: 'देवझीरी पुरातात्विक धरोहर',
    desc: 'प्राचीन जलकुंड और सदियों पुराने आस्था स्थल की वास्तुकला।',
  },
];

export default function BhilItihasPage() {
  return (
    <>
      <PageHero
        title="भील समाज का इतिहास"
        description="शौर्य, स्वाभिमान, मानगढ़ नरसंहार और हज़ारों वर्षों की सांस्कृतिक धरोहर"
        breadcrumb={[{ label: 'भील समाज का इतिहास' }]}
        variant="charcoal"
      />

      {/* Intro */}
      <section className="py-16 section-cream" aria-label="परिचय">
        <div className="container-main max-w-4xl">
          <SectionTitle title="भील समाज: एक गौरवशाली व अविजित इतिहास" />
          <div className="prose-hindi text-base md:text-lg leading-relaxed">
            <p>
              भील समाज भारत के सबसे प्राचीन, स्वाभिमानी और प्रकृति-पूजक समुदायों में से एक है। विंध्याचल और अरावली की पर्वतमालाओं, नर्मदा और माही की घाटियों में सदियों से बसे इस समाज ने कभी विदेशी आक्रांताओं के समक्ष घुटने नहीं टेके।
            </p>
            <p>
              झाबुआ ज़िला इस समृद्ध भील संस्कृति का हृदय स्थल है, जहाँ आज भी परंपरागत लोक-जीवन, हलमा, गोत्र-व्यवस्था और स्वतंत्रता सेनानियों की गाथाएँ जीवित हैं।
            </p>
          </div>
        </div>
      </section>

      {/* Featured Hero: Veer Kotia Bhil */}
      <section className="py-16 section-sand" aria-label="वीर कोटिया भील">
        <div className="container-main">
          <div
            className="card-base p-6 md:p-10 overflow-hidden"
            style={{ border: '3px solid var(--color-orange)' }}
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: '320px',
                    aspectRatio: '3/4',
                    border: '4px solid var(--color-mustard)',
                  }}
                >
                  <Image
                    src="/content-media/veer-kotia-bhil.webp"
                    alt="वीर कोटिया भील — सिर धड़ से अलग होने पर भी लड़ता रहा कोटिया भील"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold w-fit bg-[var(--color-mustard)] text-[var(--color-charcoal)]">
                  <Shield size={14} />
                  <span>इतिहास के अमर नायक</span>
                </div>

                <h2
                  className="text-2xl md:text-4xl font-bold"
                  style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                >
                  वीर शिरोमणि कोटिया भील
                </h2>

                <p className="text-base md:text-lg leading-relaxed font-semibold" style={{ color: 'var(--color-orange)' }}>
                  "सिर धड़ से अलग होने पर भी लड़ता रहा कोटिया भील — जानिए कोटा का वास्तविक इतिहास"
                </p>

                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                  राजस्थान के कोटा नगर का नामकरण इसी अजेय योद्धा कोटिया भील के नाम पर हुआ। उनके शौर्य और आत्मोत्सर्ग की गाथा भील समाज की स्वाधीनता और मातृभूमि रक्षा के संकल्प का अमर प्रतीक है। ग्रामगुरुकुल प्रकाशन ऐसे विस्मृत नायकों की गाथाओं को पाठ्यपुस्तकों और वाचनालयों तक पहुँचाने के लिए कार्यरत है।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mangarh Dham */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: '#26170d' }}
        aria-label="मानगढ़ नरसंहार"
      >
        <div className="container-main max-w-4xl">
          <div
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: 'rgba(255,200,0,0.12)', border: '1.5px solid rgba(255,200,0,0.3)' }}
            role="note"
          >
            <AlertTriangle size={20} style={{ color: '#FFC107', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <p className="text-sm" style={{ color: '#FFC107' }}>
              <strong>ऐतिहासिक संदर्भ:</strong> 17 नवंबर 1913 को मानगढ़ पहाड़ी पर ब्रिटिश सेना ने शांतिपूर्ण भगत भीलों पर अंधाधुंध गोलियाँ बरसाई थीं।
            </p>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: 'var(--color-mustard)', fontFamily: 'var(--font-heading)' }}
          >
            मानगढ़ नरसंहार — 1500+ भील हुतात्माओं का महाबलिदान
          </h2>

          <div className="prose-hindi text-base md:text-lg leading-relaxed text-amber-100/90 space-y-4">
            <p>
              जलियांवाला बाग से छह वर्ष पूर्व राजस्थान-गुजरात-मध्य प्रदेश सीमा पर स्थित मानगढ़ धाम में ब्रिटिश हुकूमत ने अमानवीय नरसंहार किया था।
            </p>
            <p>
              गोविंद गुरु के आह्वान पर एकत्रित <strong>1500 से अधिक भील वीरों, महिलाओं और बालकों</strong> ने हंसते-हंसते अपने प्राणों की आहुति दे दी, लेकिन विदेशी सत्ता के अन्याय को स्वीकार नहीं किया।
            </p>
            <p>
              यह देश के स्वाधीनता संग्राम का सबसे बड़ा सामूहिक बलिदान था, जिसे मुख्यधारा के इतिहास में यथोचित स्थान दिलाना हमारा पावन कर्तव्य है।
            </p>
          </div>
        </div>
      </section>

      {/* Freedom Heroes Cards */}
      <section className="py-16 section-cream" aria-label="अन्य स्वतंत्रता सेनानी">
        <div className="container-main">
          <SectionTitle
            title="भील समाज के अमर क्रांतिवीर"
            subtitle="मातृभूमि की स्वतंत्रता और आत्मसम्मान के लिए सर्वस्व न्योछावर करने वाले महापुरुष"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FREEDOM_HEROES.map((hero, idx) => (
              <div key={idx} className="card-base p-6 flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                  >
                    {hero.icon || '🛡️'}
                  </div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {hero.name}
                  </h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-orange)' }}>
                    {hero.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                    {hero.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ancient Temple Architecture Gallery */}
      <section className="py-16 section-sand" aria-label="प्राचीन मंदिर एवं पुरातात्विक धरोहर">
        <div className="container-main">
          <SectionTitle
            title="झाबुआ की पुरातात्विक एवं सांस्कृतिक धरोहर"
            subtitle="मालवई और देवझीरी के 10वीं/11वीं सदी के प्राचीन मंदिर एवं शिल्पकला"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HERITAGE_PHOTOS.map((item, idx) => (
              <div key={idx} className="card-base overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                <div className="relative aspect-4/3 overflow-hidden bg-[var(--color-sand)]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1 flex-1">
                  <h3
                    className="text-base font-bold"
                    style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-clay)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
