import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/utils';
import { Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" style={{ backgroundColor: 'var(--color-charcoal)', color: 'var(--color-sand)' }}>
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white p-1"
                style={{ border: '2px solid var(--color-mustard)' }}
                aria-hidden="true"
              >
                <Image
                  src="/images/logo.webp"
                  alt="ग्राम गुरुकुल प्रकाशन लोगो"
                  width={34}
                  height={34}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <div
                  className="font-bold text-sm leading-none"
                  style={{ color: 'var(--color-mustard)', fontFamily: 'var(--font-heading)' }}
                >
                  ग्रामगुरुकुल प्रकाशन
                </div>
              </div>
            </div>
            <blockquote
              className="text-lg font-semibold mb-4 italic"
              style={{ color: 'var(--color-mustard)', fontFamily: 'var(--font-heading)' }}
            >
              "जो बांचेगा वही बचेगा"
            </blockquote>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240, 228, 200, 0.7)' }}>
              गाँव का परंपरागत ज्ञान और शहरों का आधुनिक विज्ञान — ज्ञान का आदान-प्रदान।
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-mustard)' }}>
              मुख्य पृष्ठ
            </h3>
            <ul className="space-y-2 list-none m-0 p-0">
              {NAV_ITEMS[0].items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'var(--color-sand)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {NAV_ITEMS[3].items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'var(--color-sand)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-mustard)' }}>
              ज्ञान
            </h3>
            <ul className="space-y-2 list-none m-0 p-0">
              {NAV_ITEMS[1].items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'var(--color-sand)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {NAV_ITEMS[2].items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'var(--color-sand)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-mustard)' }}>
              संपर्क और सोशल
            </h3>
            <ul className="space-y-3 list-none m-0 p-0">
              <li>
                <a
                  href={`tel:${SOCIAL_LINKS.phoneRaw}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="फोन नंबर"
                >
                  <Phone size={16} aria-hidden="true" />
                  {SOCIAL_LINKS.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="ईमेल"
                >
                  <Mail size={16} aria-hidden="true" />
                  {SOCIAL_LINKS.email}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="इंस्टाग्राम (नया टैब में खुलेगा)"
                >
                  <InstagramIcon size={16} aria-hidden="true" />
                  इंस्टाग्राम
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="फेसबुक (नया टैब में खुलेगा)"
                >
                  <FacebookIcon size={16} aria-hidden="true" />
                  फेसबुक
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-sand)' }}
                  aria-label="लिंकट्री (नया टैब में खुलेगा)"
                >
                  <LinkIcon size={16} aria-hidden="true" />
                  लिंकट्री
                </a>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-mustard)' }}>
                📍 कार्यालय का पता
              </p>
              <p className="text-xs leading-relaxed mb-2" style={{ color: 'rgba(240, 228, 200, 0.85)' }}>
                शिवगंगा गुरुकुल, धरमपुरी
                <br />
                ज़िला — झाबुआ (मध्य प्रदेश)
              </p>
              <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--color-mustard)' }}>
                📞 फोन:
              </p>
              <a
                href={`tel:${SOCIAL_LINKS.phoneRaw}`}
                className="text-xs hover:underline block"
                style={{ color: 'rgba(240, 228, 200, 0.9)' }}
              >
                {SOCIAL_LINKS.phone}
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240, 228, 200, 0.5)' }}
        >
          <p>© {year} ग्राम गुरुकुल प्रकाशन। सभी अधिकार सुरक्षित।</p>
          <p>
            आपकी जानकारी सुरक्षित है। हम आपका डेटा तीसरे पक्ष के साथ साझा नहीं करते।
          </p>
        </div>
      </div>
    </footer>
  );
}
