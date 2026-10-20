'use client';

import { useState, useId } from 'react';
import { CheckCircle, AlertTriangle, Upload } from 'lucide-react';

type State = 'idle' | 'loading' | 'success' | 'error';
type JankariType = 'gaon' | 'tasveerin' | 'lokkatha' | 'parampara' | 'anya';

const JANKARI_OPTIONS: { value: JankariType; label: string }[] = [
  { value: 'gaon', label: 'गाँव की जानकारी' },
  { value: 'tasveerin', label: 'तस्वीरें' },
  { value: 'lokkatha', label: 'लोककथा' },
  { value: 'parampara', label: 'परंपरा का विवरण' },
  { value: 'anya', label: 'अन्य' },
];

export default function JoinForm() {
  const id = useId();
  const [state, setState] = useState<State>('idle');
  const [serverError, setServerError] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    naam: '',
    emailPhone: '',
    gaon: '',
    vikaskhand: '',
    jankariType: '' as JankariType | '',
    vivaran: '',
    honeypot: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(f.type)) {
      setFileError('केवल JPEG, PNG, WebP या GIF तस्वीरें मान्य हैं।');
      return;
    }
    if (f.size > maxSize) {
      setFileError('तस्वीर का आकार 5MB से कम होना चाहिए।');
      return;
    }
    setFileError('');
    setFile(f);
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!formData.naam.trim()) errs.naam = 'कृपया अपना नाम लिखें।';
    if (!formData.emailPhone.trim()) errs.emailPhone = 'ईमेल या फोन नम्बर ज़रूरी है।';
    if (!formData.gaon.trim()) errs.gaon = 'गाँव का नाम ज़रूरी है।';
    if (!formData.jankariType) errs.jankariType = 'जानकारी का प्रकार चुनें।';
    if (!formData.vivaran.trim() || formData.vivaran.trim().length < 10)
      errs.vivaran = 'विवरण कम से कम 10 अक्षरों का होना चाहिए।';
    if (!consent) errs.consent = 'सहमति देना ज़रूरी है।';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (formData.honeypot) return; // Silently block bots

    setState('loading');
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([k, v]) => form.append(k, v));
      if (file) form.append('file', file);
      form.append('consent', 'true');

      const res = await fetch('/api/join', { method: 'POST', body: form });
      if (res.ok) {
        setState('success');
      } else {
        const d = await res.json().catch(() => ({}));
        setServerError(d.message || 'कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें।');
        setState('error');
      }
    } catch {
      setServerError('नेटवर्क में समस्या है।');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div
        className="flex flex-col items-center gap-4 p-8 rounded-2xl text-center"
        style={{ backgroundColor: '#d4edda', border: '2px solid #c3e6cb' }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={48} color="#155724" aria-hidden="true" />
        <h3 className="text-xl font-bold" style={{ color: '#155724', fontFamily: 'var(--font-heading)' }}>
          धन्यवाद!
        </h3>
        <p style={{ color: '#155724' }}>
          आपकी जानकारी हमें मिल गई है। हम उसकी जाँच करने के बाद आपसे संपर्क करेंगे।
          प्रकाशित करने से पहले आपकी सहमति ली जाएगी।
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="जानकारी भेजने का फ़ॉर्म" encType="multipart/form-data">
      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <input
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      {/* Server error */}
      {state === 'error' && serverError && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{ backgroundColor: '#f8d7da', border: '2px solid #f5c6cb' }} role="alert">
          <AlertTriangle size={20} color="#721c24" aria-hidden="true" />
          <p style={{ color: '#721c24' }}>{serverError}</p>
        </div>
      )}

      {/* Notice */}
      <div
        className="p-4 rounded-xl mb-6"
        style={{ backgroundColor: 'rgba(227, 176, 35, 0.1)', border: '1.5px solid rgba(227, 176, 35, 0.3)' }}
        role="note"
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--color-orange)' }}>
          ⚠️ प्रकाशित करने से पहले सामग्री की जाँच की जाएगी और संबंधित लोगों की सहमति ली जाएगी।
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* नाम */}
        <div>
          <label htmlFor={`${id}-naam`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>नाम *</label>
          <input id={`${id}-naam`} type="text" className={`input-base ${errors.naam ? 'input-error' : ''}`}
            value={formData.naam} onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
            placeholder="आपका नाम" aria-invalid={!!errors.naam} />
          {errors.naam && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{errors.naam}</p>}
        </div>

        {/* Email/Phone */}
        <div>
          <label htmlFor={`${id}-ep`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>ईमेल / फोन *</label>
          <input id={`${id}-ep`} type="text" className={`input-base ${errors.emailPhone ? 'input-error' : ''}`}
            value={formData.emailPhone} onChange={(e) => setFormData({ ...formData, emailPhone: e.target.value })}
            placeholder="ईमेल या फोन नम्बर" aria-invalid={!!errors.emailPhone} />
          {errors.emailPhone && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{errors.emailPhone}</p>}
        </div>

        {/* गाँव */}
        <div>
          <label htmlFor={`${id}-gaon`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>गाँव *</label>
          <input id={`${id}-gaon`} type="text" className={`input-base ${errors.gaon ? 'input-error' : ''}`}
            value={formData.gaon} onChange={(e) => setFormData({ ...formData, gaon: e.target.value })}
            placeholder="गाँव का नाम" aria-invalid={!!errors.gaon} />
          {errors.gaon && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{errors.gaon}</p>}
        </div>

        {/* विकासखंड */}
        <div>
          <label htmlFor={`${id}-vk`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>विकासखंड</label>
          <input id={`${id}-vk`} type="text" className="input-base"
            value={formData.vikaskhand} onChange={(e) => setFormData({ ...formData, vikaskhand: e.target.value })}
            placeholder="विकासखंड का नाम" />
        </div>
      </div>

      {/* जानकारी का प्रकार */}
      <div className="mt-5">
        <label htmlFor={`${id}-jt`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>जानकारी का प्रकार *</label>
        <select id={`${id}-jt`} className={`input-base ${errors.jankariType ? 'input-error' : ''}`}
          value={formData.jankariType} onChange={(e) => setFormData({ ...formData, jankariType: e.target.value as JankariType })}
          aria-invalid={!!errors.jankariType}>
          <option value="">प्रकार चुनें</option>
          {JANKARI_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {errors.jankariType && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{errors.jankariType}</p>}
      </div>

      {/* विवरण */}
      <div className="mt-5">
        <label htmlFor={`${id}-vivaran`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>विवरण *</label>
        <textarea id={`${id}-vivaran`} rows={5} className={`input-base resize-y ${errors.vivaran ? 'input-error' : ''}`}
          value={formData.vivaran} onChange={(e) => setFormData({ ...formData, vivaran: e.target.value })}
          placeholder="जानकारी का विवरण यहाँ लिखें..." aria-invalid={!!errors.vivaran} />
        {errors.vivaran && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{errors.vivaran}</p>}
      </div>

      {/* File upload */}
      <div className="mt-5">
        <label htmlFor={`${id}-file`} className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-charcoal)' }}>
          तस्वीर (वैकल्पिक, अधिकतम 5MB)
        </label>
        <div
          className="flex items-center gap-3 p-4 rounded-xl cursor-pointer"
          style={{ backgroundColor: 'var(--color-sand)', border: '2px dashed var(--color-sand-dark)' }}
        >
          <Upload size={20} style={{ color: 'var(--color-clay)' }} aria-hidden="true" />
          <input
            id={`${id}-file`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFile}
            className="text-sm"
            style={{ color: 'var(--color-charcoal)' }}
          />
        </div>
        {fileError && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{fileError}</p>}
        {file && <p className="text-sm mt-1" style={{ color: 'var(--color-clay)' }}>चुनी गई: {file.name}</p>}
      </div>

      {/* Consent */}
      <div className="mt-5">
        <label className={`flex items-start gap-3 cursor-pointer ${errors.consent ? 'ring-2 ring-red-400 rounded-lg p-2' : ''}`}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); setErrors({ ...errors, consent: '' }); }}
            className="mt-1 w-5 h-5 shrink-0"
            aria-required="true"
            aria-invalid={!!errors.consent}
          />
          <span className="text-sm" style={{ color: 'var(--color-charcoal)' }}>
            मैं सहमत हूँ कि यह जानकारी ग्रामगुरुकुल प्रकाशन को दे रहा/रही हूँ। प्रकाशन से पहले मेरी सहमति ली जाएगी। *
          </span>
        </label>
        {errors.consent && <p role="alert" className="text-sm mt-1" style={{ color: '#dc3545' }}>{errors.consent}</p>}
      </div>

      <button type="submit" disabled={state === 'loading'} className="btn-primary w-full justify-center mt-6" aria-busy={state === 'loading'}>
        {state === 'loading' ? 'भेजा जा रहा है...' : 'जानकारी भेजें'}
      </button>
    </form>
  );
}
