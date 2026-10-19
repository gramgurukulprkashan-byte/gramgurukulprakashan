import type { Metadata } from 'next';
import { Mail, Link as LinkIcon } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/Icons';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { SOCIAL_LINKS } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'संपर्क करें',
  description: 'ग्राम गुरुकुल प्रकाशन से संपर्क करें — ईमेल, सोशल मीडिया या संपर्क फ़ॉर्म के ज़रिए।',
};

const CONTACT_ITEMS = [
  {
    icon: <Mail size={24} aria-hidden="true" />,
    label: 'ईमेल',
    value: SOCIAL_LINKS.email,
    href: `mailto:${SOCIAL_LINKS.email}`,
    external: false,
  },
  {
    icon: <InstagramIcon size={24} aria-hidden="true" />,
    label: 'इंस्टाग्राम',
    value: '@gramgurukulprakashan',
    href: SOCIAL_LINKS.instagram,
    external: true,
  },
  {
    icon: <FacebookIcon size={24} aria-hidden="true" />,
    label: 'फेसबुक',
    value: 'ग्रामगुरुकुल प्रकाशन',
    href: SOCIAL_LINKS.facebook,
    external: true,
  },
  {
    icon: <LinkIcon size={24} aria-hidden="true" />,
    label: 'लिंकट्री',
    value: 'linktr.ee/gramgurukulprakashan',
    href: SOCIAL_LINKS.linktree,
    external: true,
  },
];

export default function SamparkPage() {
  return (
    <>
      <PageHero
        title="संपर्क करें"
        description="हमसे बात करें — किसी भी सवाल, सहयोग या सुझाव के लिए"
        breadcrumb={[{ label: 'संपर्क करें' }]}
        variant="cream"
      />

      <section className="py-16 section-cream" aria-label="संपर्क विवरण और फ़ॉर्म">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <SectionTitle title="हमसे जुड़ें" />

              <div className="space-y-4 mb-8">
                {CONTACT_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all no-underline group"
                    style={{
                      backgroundColor: 'white',
                      border: '2px solid var(--color-sand)',
                      color: 'var(--color-charcoal)',
                      textDecoration: 'none',
                    }}
                    aria-label={`${item.label}${item.external ? ' (नया टैब में खुलेगा)' : ''}`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(200, 102, 30, 0.1)', color: 'var(--color-orange)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-clay)' }}>
                        {item.label}
                      </p>
                      <p className="font-medium" style={{ color: 'var(--color-charcoal)' }}>
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Address placeholder */}
              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: 'var(--color-sand)', border: '2px dashed var(--color-sand-dark)' }}
              >
                <p className="font-semibold mb-1" style={{ color: 'var(--color-charcoal)' }}>
                  📍 पता
                </p>
                <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                  TODO: वास्तविक पता यहाँ जोड़ें — झाबुआ, मध्य प्रदेश
                </p>
                <p className="font-semibold mt-3 mb-1" style={{ color: 'var(--color-charcoal)' }}>
                  📞 फोन
                </p>
                <p className="text-sm" style={{ color: 'var(--color-clay)' }}>
                  TODO: फोन नम्बर यहाँ जोड़ें
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <SectionTitle title="हमें लिखें" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
