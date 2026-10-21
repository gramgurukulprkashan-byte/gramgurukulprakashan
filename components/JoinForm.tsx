'use client';

import Link from 'next/link';
import { Sparkles, Mail, Phone, ArrowRight, Clock, ShieldCheck, FileText } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/utils';

export default function JoinForm() {
  return (
    <div
      className="p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
      style={{
        backgroundColor: '#FAF6ED',
        border: '2px solid #E6D8BA',
        boxShadow: '0 16px 40px rgba(90, 44, 16, 0.06)',
      }}
    >
      {/* Subtle decorative background motif */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-20"
        style={{ backgroundColor: 'var(--color-orange)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-10"
        style={{ backgroundColor: 'var(--color-terracotta)' }}
        aria-hidden="true"
      />

      {/* Coming Soon Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 tracking-wide"
        style={{
          backgroundColor: 'rgba(200, 102, 30, 0.12)',
          color: 'var(--color-orange)',
          border: '1px solid rgba(200, 102, 30, 0.25)',
        }}
      >
        <Clock size={14} className="animate-pulse" aria-hidden="true" />
        डिजिटल प्रपत्र पोर्टल — शीघ्र उपलब्ध होगा (Coming Soon)
      </div>

      {/* Main Heading */}
      <h3
        className="text-2xl md:text-3xl font-bold mb-4"
        style={{ color: 'var(--color-charcoal)', fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}
      >
        गाँव की जानकारी एवं तस्वीरें साझा करने का पोर्टल विकास में है
      </h3>

      {/* Graceful explanation */}
      <p
        className="text-base max-w-2xl mx-auto mb-8"
        style={{ color: 'var(--color-clay)', lineHeight: 1.75 }}
      >
        गाँव का परंपरागत ज्ञान, दुर्लभ तस्वीरें, लोकसंस्कृति, बोलियाँ, कृषि परंपराएँ और हस्तशिल्प को 
        सुरक्षित डिजिटल डेटाबेस में सहेजने के लिए हमारा विशेष संकलन पोर्टल तैयार किया जा रहा है। 
        यह सुविधा जल्द ही सीधे वेबसाइट पर उपलब्ध होगी।
      </p>

      {/* Feature Highlights Grid */}
      <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
        <div className="p-4 rounded-2xl bg-white/80 border border-[#EADBBD]">
          <div className="flex items-center gap-2 font-bold text-sm mb-1" style={{ color: 'var(--color-terracotta)' }}>
            <FileText size={16} />
            <span>दस्तावेज़ीकरण</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-clay)' }}>
            लोककथाओं एवं परंपरागत ज्ञान का व्यवस्थित डिजिटल संकलन।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-[#EADBBD]">
          <div className="flex items-center gap-2 font-bold text-sm mb-1" style={{ color: 'var(--color-terracotta)' }}>
            <Sparkles size={16} />
            <span>तस्वीरें व अभिलेखागार</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-clay)' }}>
            उच्च गुणवत्ता में ग्राम-जीवन की दुर्लभ तस्वीरों का सुरक्षित संग्रहण।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 border border-[#EADBBD]">
          <div className="flex items-center gap-2 font-bold text-sm mb-1" style={{ color: 'var(--color-terracotta)' }}>
            <ShieldCheck size={16} />
            <span>सहमति व श्रेय</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-clay)' }}>
            सामग्री प्रेषक का नाम, गाँव और पूर्ण श्रेय के साथ सुरक्षित प्रकाशन।
          </p>
        </div>
      </div>

      {/* Alternative actions right now */}
      <div
        className="p-6 rounded-2xl max-w-2xl mx-auto mb-8"
        style={{
          backgroundColor: '#FFFDF9',
          border: '1.5px dashed var(--color-sand-dark)',
        }}
      >
        <p className="text-sm font-bold mb-3" style={{ color: 'var(--color-charcoal)' }}>
          वर्तमान में सामग्री अथवा जानकारी भेजने के लिए आप सीधे हमसे संपर्क कर सकते हैं:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sampark"
            className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5"
            style={{ textDecoration: 'none' }}
          >
            <span>संपर्क फ़ॉर्म से भेजें</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              backgroundColor: 'white',
              color: 'var(--color-charcoal)',
              border: '1.5px solid var(--color-sand-dark)',
              textDecoration: 'none',
            }}
          >
            <Mail size={16} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
            <span>{SOCIAL_LINKS.email}</span>
          </a>

          <a
            href={`tel:${SOCIAL_LINKS.phoneRaw}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{
              backgroundColor: 'white',
              color: 'var(--color-charcoal)',
              border: '1.5px solid var(--color-sand-dark)',
              textDecoration: 'none',
            }}
          >
            <Phone size={16} style={{ color: 'var(--color-orange)' }} aria-hidden="true" />
            <span>{SOCIAL_LINKS.phone}</span>
          </a>
        </div>
      </div>

      <p className="text-xs" style={{ color: 'var(--color-clay)' }}>
        📍 शिवगंगा गुरुकुल, धरमपुरी, ज़िला — झाबुआ (मध्य प्रदेश) - 457661
      </p>
    </div>
  );
}
