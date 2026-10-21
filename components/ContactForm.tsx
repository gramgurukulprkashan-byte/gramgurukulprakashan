'use client';

import { useState, useId } from 'react';
import { Send, CheckCircle, AlertTriangle, Loader2, RotateCcw, Phone, Mail } from 'lucide-react';

const VISHAY_OPTIONS = [
  { value: '', label: 'विषय चुनें' },
  { value: 'samanya', label: 'सामान्य जानकारी' },
  { value: 'pustak', label: 'पुस्तक एवं प्रकाशन' },
  { value: 'shodh', label: 'शोध एवं सहयोग' },
  { value: 'sujhav', label: 'सुझाव' },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  naam?: string;
  email?: string;
  vishay?: string;
  sandesh?: string;
}

export default function ContactForm() {
  const formId = useId();
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    vishay: '',
    sandesh: '',
    honeypot: '',
  });

  const [submittedSnapshot, setSubmittedSnapshot] = useState({
    naam: '',
    email: '',
  });

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.naam.trim()) errs.naam = 'कृपया अपना नाम लिखें।';
    else if (formData.naam.trim().length < 2) errs.naam = 'नाम कम से कम 2 अक्षर का होना चाहिए।';

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) errs.email = 'कृपया ईमेल पता लिखें।';
    else if (!emailRe.test(formData.email)) errs.email = 'कृपया सही ईमेल पता लिखें।';

    if (!formData.vishay) errs.vishay = 'कृपया विषय चुनें।';

    if (!formData.sandesh.trim()) errs.sandesh = 'कृपया संदेश लिखें।';
    else if (formData.sandesh.trim().length < 10) errs.sandesh = 'संदेश कम से कम 10 अक्षरों का होना चाहिए।';

    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setState('loading');
    setSubmittedSnapshot({
      naam: formData.naam.trim(),
      email: formData.email.trim(),
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setState('success');
      } else {
        setServerError(data.message || 'संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें।');
        setState('error');
      }
    } catch {
      setServerError('नेटवर्क में समस्या है। कृपया बाद में प्रयास करें।');
      setState('error');
    }
  }

  function handleReset() {
    setFormData({
      naam: '',
      email: '',
      vishay: '',
      sandesh: '',
      honeypot: '',
    });
    setErrors({});
    setServerError('');
    setState('idle');
  }

  if (state === 'success') {
    return (
      <div
        className="p-8 rounded-3xl text-center transition-all animate-fadeIn"
        style={{
          backgroundColor: '#F3FAF4',
          border: '2px solid #C4E7CC',
          boxShadow: '0 12px 32px rgba(21, 87, 36, 0.08)',
        }}
        role="status"
        aria-live="polite"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#D8F3DF', color: '#1B6E32' }}
        >
          <CheckCircle size={36} strokeWidth={2.5} aria-hidden="true" />
        </div>

        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: '#14532D', fontFamily: 'var(--font-heading)' }}
        >
          संदेश सफलतापूर्वक भेज दिया गया!
        </h3>

        <p className="text-base mb-6" style={{ color: '#276738', lineHeight: 1.6 }}>
          धन्यवाद, <strong>{submittedSnapshot.naam || 'मित्र'}</strong> जी! आपका संदेश हमें प्राप्त हो चुका है।
        </p>

        {/* Info card */}
        <div
          className="p-4 rounded-2xl mb-6 text-left space-y-2 text-sm"
          style={{ backgroundColor: 'white', border: '1px solid #D6EFE0' }}
        >
          <div className="flex items-center gap-2" style={{ color: '#1F5E34' }}>
            <Mail size={16} className="shrink-0 text-emerald-600" aria-hidden="true" />
            <span>
              उत्तर ईमेल: <strong>{submittedSnapshot.email}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2" style={{ color: '#1F5E34' }}>
            <Phone size={16} className="shrink-0 text-emerald-600" aria-hidden="true" />
            <span>
              सहायता सूत्र: <strong>+91 96852 71507</strong> (शिवगंगा गुरुकुल)
            </span>
          </div>
          <p className="text-xs mt-2 pt-2 border-t border-emerald-100" style={{ color: '#527E5F' }}>
            ⏱️ हमारी टीम सामान्यतः 24 घंटों के भीतर आपके संदेश का उत्तर देती है।
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            backgroundColor: '#1B6E32',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(27, 110, 50, 0.25)',
          }}
        >
          <RotateCcw size={16} aria-hidden="true" />
          एक और संदेश भेजें
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="संपर्क फ़ॉर्म">
      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>इसे खाली छोड़ें</label>
        <input
          id={`${formId}-hp`}
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      {/* Server error */}
      {state === 'error' && serverError && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl mb-6"
          style={{ backgroundColor: '#f8d7da', border: '2px solid #f5c6cb' }}
          role="alert"
          aria-live="assertive"
        >
          <AlertTriangle size={20} color="#721c24" aria-hidden="true" />
          <p style={{ color: '#721c24' }}>{serverError}</p>
        </div>
      )}

      {/* नाम */}
      <div className="mb-5">
        <label
          htmlFor={`${formId}-naam`}
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--color-charcoal)' }}
        >
          नाम <span aria-label="ज़रूरी">*</span>
        </label>
        <input
          id={`${formId}-naam`}
          name="naam"
          type="text"
          required
          autoComplete="name"
          placeholder="आपका पूरा नाम"
          className={`input-base ${errors.naam ? 'input-error' : ''}`}
          value={formData.naam}
          onChange={(e) => { setFormData({ ...formData, naam: e.target.value }); setErrors({ ...errors, naam: '' }); }}
          aria-describedby={errors.naam ? `${formId}-naam-err` : undefined}
          aria-invalid={!!errors.naam}
        />
        {errors.naam && (
          <p id={`${formId}-naam-err`} role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>
            {errors.naam}
          </p>
        )}
      </div>

      {/* ईमेल */}
      <div className="mb-5">
        <label
          htmlFor={`${formId}-email`}
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--color-charcoal)' }}
        >
          ईमेल <span aria-label="ज़रूरी">*</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="aapka@email.com"
          className={`input-base ${errors.email ? 'input-error' : ''}`}
          value={formData.email}
          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
          aria-describedby={errors.email ? `${formId}-email-err` : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id={`${formId}-email-err`} role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* विषय */}
      <div className="mb-5">
        <label
          htmlFor={`${formId}-vishay`}
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--color-charcoal)' }}
        >
          विषय <span aria-label="ज़रूरी">*</span>
        </label>
        <select
          id={`${formId}-vishay`}
          name="vishay"
          required
          className={`input-base ${errors.vishay ? 'input-error' : ''}`}
          value={formData.vishay}
          onChange={(e) => { setFormData({ ...formData, vishay: e.target.value }); setErrors({ ...errors, vishay: '' }); }}
          aria-describedby={errors.vishay ? `${formId}-vishay-err` : undefined}
          aria-invalid={!!errors.vishay}
        >
          {VISHAY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={!opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.vishay && (
          <p id={`${formId}-vishay-err`} role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>
            {errors.vishay}
          </p>
        )}
      </div>

      {/* संदेश */}
      <div className="mb-5">
        <label
          htmlFor={`${formId}-sandesh`}
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--color-charcoal)' }}
        >
          संदेश <span aria-label="ज़रूरी">*</span>
        </label>
        <textarea
          id={`${formId}-sandesh`}
          name="sandesh"
          required
          rows={5}
          placeholder="आपका संदेश यहाँ लिखें..."
          className={`input-base resize-y ${errors.sandesh ? 'input-error' : ''}`}
          style={{ minHeight: '120px' }}
          value={formData.sandesh}
          onChange={(e) => { setFormData({ ...formData, sandesh: e.target.value }); setErrors({ ...errors, sandesh: '' }); }}
          aria-describedby={errors.sandesh ? `${formId}-sandesh-err` : undefined}
          aria-invalid={!!errors.sandesh}
        />
        {errors.sandesh && (
          <p id={`${formId}-sandesh-err`} role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>
            {errors.sandesh}
          </p>
        )}
      </div>

      {/* Privacy note */}
      <p className="text-xs mb-6" style={{ color: 'var(--color-clay)' }}>
        🔒 आपकी जानकारी केवल आपके संदेश का उत्तर देने के लिए उपयोग की जाएगी। हम आपका डेटा किसी तीसरे पक्ष के साथ साझा नहीं करते।
      </p>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-primary w-full justify-center transition-all"
        aria-busy={state === 'loading'}
        style={{
          opacity: state === 'loading' ? 0.85 : 1,
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {state === 'loading' ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            संदेश भेजा जा रहा है...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Send size={18} aria-hidden="true" />
            संदेश भेजें
          </span>
        )}
      </button>
    </form>
  );
}
