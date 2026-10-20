# ग्रामगुरुकुल प्रकाशन (Gram Gurukul Prakashan)

> **"जो बांचेगा वही बचेगा"**  
> A rural-knowledge publishing and community-library initiative based in Jhabua (झाबुआ), Madhya Pradesh, India, working with the Bhil (भील) community.

A production-ready Next.js 16 (App Router) web application entirely in Hindi (Devanagari), powered by Sanity CMS, TypeScript, and Tailwind CSS v4.

---

## Table of Contents
1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Project Structure](#project-structure)
3. [Setup & Local Development](#setup--local-development)
4. [Sanity CMS Setup & Seed Data](#sanity-cms-setup--seed-data)
5. [Revalidation Webhook Configuration](#revalidation-webhook-configuration)
6. [Deployment on Vercel](#deployment-on-vercel)
7. [Admin Content Management](#admin-content-management)
8. [Customizing Logo and Colours](#customizing-logo-and-colours)
9. [Phase 3 Extension Points](#phase-3-extension-points)
10. [Consolidated Client TODO List](#consolidated-client-todo-list)
11. [हिंदी में प्रशासक मार्गदर्शिका](#-हिंदी-में-प्रशासक-मार्गदर्शिका-admin-guide)

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 with custom earthy palette tokens ("आँगन" theme)
- **Typography**: Google Fonts — *Noto Sans Devanagari* (Body) & *Tiro Devanagari Hindi* (Headings)
- **CMS**: Sanity v3 / v6 Studio embedded at `/studio` with custom Devanagari schemas
- **Icons**: Lucide React + custom accessible SVGs
- **Form Handling & Validation**: Zod v4 schemas + Next.js API Routes + Honeypot spam protection + In-memory IP rate limiting
- **Email Service**: Resend integration (optional, with dev console fallback)
- **Search**: Fuse.js client-side search + server-side GROQ search
- **SEO & Accessibility**: WCAG AAA/AA contrast compliance, ARIA landmarks, JSON-LD Schema.org organization metadata, semantic HTML5, skip-to-content links.

---

## Project Structure

```text
website/
├── app/
│   ├── api/
│   │   ├── contact/route.ts          # Contact & Join form endpoint with rate limiting & Honeypot
│   │   └── revalidate/route.ts       # On-demand ISR revalidation webhook for Sanity
│   ├── bhil-itihas/page.tsx          # History of Bhil community & Mangarh Dham
│   ├── gaon-se-shiksha/page.tsx      # Rural education vision & "Mera Jila" book
│   ├── gram-atlas/                   # Village Atlas listing & [slug] dynamic pages
│   ├── gram-vachanalay/page.tsx      # Village libraries (900+ villages, 14 subjects)
│   ├── hamare-bare-mein/page.tsx     # About us, mission, timeline, values
│   ├── hamse-judein/page.tsx         # Join us (writers, researchers, teachers, elders)
│   ├── karya/page.tsx                # Work areas & empowerment programs
│   ├── parampragat-gyan/             # Traditional knowledge vs modern science
│   ├── pustakein/                    # Books listing & [slug] book details
│   ├── sampark/page.tsx              # Contact details & interactive message form
│   ├── sanskriti-parampara/          # Traditions (Halma, Matavan, etc.) & traditional roles
│   ├── soochna/                      # Notices & announcements listing & [slug]
│   ├── studio/[[...tool]]/page.tsx   # Embedded Sanity Studio for client staff
│   ├── globals.css                   # Tailwind v4 theme, custom properties & animations
│   ├── layout.tsx                    # Root layout, fonts, JSON-LD schema, Header & Footer
│   ├── not-found.tsx                 # 404 page in village-friendly Hindi
│   └── page.tsx                      # Homepage with Hero, counters, work cards & books
├── components/                       # Modular UI components (Header, Footer, BookCard, etc.)
├── lib/
│   ├── design-tokens.ts              # HSL / HEX color tokens
│   ├── queries.ts                    # GROQ queries for Sanity CMS
│   ├── sanity.ts                     # Sanity client & image URL builder
│   └── utils.ts                      # Date formatting, navigation items, rate limiter
├── sanity/
│   ├── schemas/                      # 11 Hindi-first Sanity document schemas
│   │   ├── book.ts
│   │   ├── historyEntry.ts
│   │   ├── knowledgeTopic.ts
│   │   ├── libraryStory.ts
│   │   ├── notice.ts
│   │   ├── role.ts
│   │   ├── siteSettings.ts
│   │   ├── subjectCategory.ts
│   │   ├── tradition.ts
│   │   ├── vachanalay.ts
│   │   └── village.ts
│   └── seed.ts                       # Database seeding script with realistic Bhil culture data
├── public/                           # Static assets, SVG icons, logo placeholder
├── postcss.config.mjs                # PostCSS with @tailwindcss/postcss
└── sanity.config.ts                  # Sanity Studio configuration
```

---

## Setup & Local Development

### Prerequisites
- Node.js 20+ installed
- `pnpm` (recommended), `npm`, or `yarn`

### 1. Install Dependencies
```bash
cd website
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Sanity credentials and Resend API key (optional for local testing).

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

---

## Sanity CMS Setup & Seed Data

### 1. Create a Free Sanity Project
If you don't have one yet, run:
```bash
npm create sanity@latest -- --template clean
```
or create one at [sanity.io/manage](https://www.sanity.io/manage).

### 2. Add Environment Variables
In `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_with_editor_or_admin_permission
SANITY_WEBHOOK_SECRET=your_secret_passphrase
```

### 3. Populate Initial Content (Seed)
Run the automated seed script to populate all 11 schemas with initial data (books, 14 library subjects, traditional roles, Halma & Matavan traditions, Mangarh history):
```bash
npx tsx sanity/seed.ts
```

### 4. Access the Admin Studio
Once running, client staff can manage content at:
`http://localhost:3000/studio` (or `https://yourdomain.com/studio` in production).

---

## Revalidation Webhook Configuration

To ensure instant updates whenever staff publish or edit content in Sanity:

1. Open your project on [sanity.io/manage](https://www.sanity.io/manage).
2. Go to **API** > **Webhooks** > **Create Webhook**.
3. Set the following:
   - **Name**: Next.js On-Demand Revalidation
   - **URL**: `https://yourdomain.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave empty or `_type in ["notice", "book", "village", "tradition", "historyEntry", "siteSettings"]`
   - **HTTP Headers**: Add header `x-sanity-webhook-secret: your_secret_passphrase`
4. Now, any change made in Sanity updates the live website within seconds without requiring a redeploy!

---

## Deployment on Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your repository and set the root directory to `website` (if deploying from a monorepo or subdirectory).
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `SANITY_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://gramgurukulprakashan.org`)
   - `RESEND_API_KEY` (optional)
   - `CONTACT_EMAIL` (e.g. `gramgurukulprakashan@gmail.com`)
5. Click **Deploy**. Vercel will build and launch your production site.

---

## Admin Content Management

### How to Add / Edit / Delete Content

All administrative tasks can be performed directly through the embedded Studio at `/studio`:

1. **Notices (सूचनाएँ)**:
   - Navigate to `/studio` -> **सूचना एवं समाचार (Notices)**.
   - Click **+ Create**. Fill in Title, Slug (auto-generated), Date, Description, and optionally mark "क्या यह महत्वपूर्ण सूचना है?".
   - Click **Publish**.

2. **Books (पुस्तकें एवं प्रकाशन)**:
   - Go to **पुस्तक एवं प्रकाशन (Books)**.
   - Enter title, author, subject (e.g., 'सामाजिक विज्ञान'), publication status ('प्रकाशित' / 'निर्माणाधीन'), upload cover image, and attach a sample PDF or chapter images.

3. **Village Atlas (ग्राम एटलस)**:
   - Go to **ग्राम एटलस — गाँव (Villages)**.
   - Add Village Name, Block, Name Story (नामकरण की कहानी), Settlement History (बसने का इतिहास), water bodies, pasture lands, traditional governance system, and local photos.

4. **Traditions & Cultural Roles (संस्कृति एवं परंपराएँ)**:
   - Select **संस्कृति और परंपराएँ (Traditions)** or **पारंपरिक भूमिकाएँ (Traditional Roles)**.
   - Document traditions like हलमा, मातावन, भिड़हा, नवाई, जातर, सलावणी, फाळा, नौतरां, or community roles like बड़वा, तड़वी, कोटवाल, पुजारा, वार्तिया.

5. **History Entries (भील समाज का इतिहास)**:
   - Select **भील समाज का इतिहास (History Entries)**.
   - Add historical events, heroes (टंट्या भील, गोविंद गुरु), sources, and verification status.

---

## Customizing Logo and Colours

### 1. Logo
- Replace `/public/logo.png` with the official high-resolution logo (recommended: 512x512 transparent PNG or SVG).
- The SVG emblem in the header and footer can also be swapped in `components/Header.tsx` and `components/Footer.tsx`.

### 2. Colour Palette ("आँगन" Theme)
All colours are defined as CSS variables in `app/globals.css`:
```css
:root {
  --color-mustard: #E3B023;  /* सरसो पीला (Accent & Highlights) */
  --color-orange: #C8661E;   /* मिट्टी नारंगी (Primary actions & callouts) */
  --color-charcoal: #1A1A1A; /* गहरा कोयला (Header, Footer & dark sections) */
  --color-cream: #FBF5E6;    /* आँगन क्रीम (Primary background) */
  --color-clay: #7A4A2B;     /* पक्की मिट्टी (Body text & borders) */
  --color-green: #3F5B2E;    /* पलाश हरा (Secondary accents) */
  --color-sand: #F0E4C8;     /* रेतीला रेत (Card backgrounds & dividers) */
}
```
Modifying these tokens automatically updates all pages and components across the site.

---

## Phase 3 Extension Points

The architecture includes hooks for planned Phase 3 enhancements:
1. **Interactive Leaflet / OpenStreetMap**: Placeholder components and latitude/longitude fields in the `village` schema are already configured in `app/gram-atlas/`.
2. **Audio/Video Oral Archive**: Embedded player support (`mediaEmbed` field) ready in `tradition` schema for recording elders' voices and songs.
3. **Book Ordering / Online Distribution**: Product cards include pricing & availability states ready for Razorpay/UPI gateway integration.
4. **Author Portal / Community Submissions**: The `/api/contact` route and `/hamse-judein` form structure are primed to accept document attachments and manuscript uploads.

---

## Consolidated Client TODO List

| क्र.सं. | कार्य मद (Action Item) | स्थिति | विवरण |
|---|---|---|---|
| 1 | **वास्तविक लोगो फ़ाइल** | ⏳ लंबित | `/public/logo.png` पर संस्था का असली लोगो (512x512 PNG) अपलोड करें |
| 2 | **फ़ोन नम्बर और पता** | ⏳ लंबित | झाबुआ कार्यालय का वास्तविक फ़ोन नम्बर व डाक पता CMS में दर्ज करें |
| 3 | **14 वाचनालय विषय सत्यापन** | ⏳ लंबित | वाचनालय की 14 विषय श्रेणियों की सूची क्लाइंट से अंतिम रूप से प्रमाणित कराएँ |
| 4 | **मानगढ़ नरसंहार (1507 आँकड़ा)** | ⚠️ सत्यापन अपेक्षित | 1507 बलिदानियों की संख्या व ऐतिहासिक स्रोतों का क्लाइंट/शोधकर्ताओं से सत्यापन |
| 5 | **बुजुर्गों से प्रमाणित परंपरा विवरण** | ⏳ संकलन जारी | मातावन, भिड़हा, नवाई, जातर, सलावणी, फाळा का बुजुर्गों से सत्यापित विवरण |
| 6 | **वास्तविक छायाचित्र (Photos)** | ⏳ संकलन जारी | ग्राम वाचनालय पेटियों, गाँवों, और कार्यक्रमों के उच्च गुणवत्ता वाले फ़ोटो |

---

## 🇮🇳 हिंदी में प्रशासक मार्गदर्शिका (Admin Guide)

> **ग्रामगुरुकुल प्रकाशन के गैर-तकनीकी साथियों के लिए सरल मार्गदर्शिका**

### 1. व्यवस्थापक पैनल (Admin Studio) कैसे खोलें?
- अपने कंप्यूटर या मोबाइल ब्राउज़र में वेबसाइट के पते के आगे `/studio` लिखें।  
  (उदा. `https://gramgurukulprakashan.org/studio`)
- अपने ईमेल और पासवर्ड से लॉगिन करें।

### 2. नई सूचना कैसे प्रकाशित करें?
1. बाईं पट्टी में **"सूचना एवं समाचार"** पर क्लिक करें।
2. ऊपर दाईं ओर **"+ Create"** बटन दबाएँ।
3. **सूचना का शीर्षक**, **तारीख** और **विवरण** भरें।
4. यदि यह बहुत ज़रूरी सूचना है तो *"क्या यह महत्वपूर्ण सूचना है?"* पर सही का निशान लगाएँ।
5. दाईं ओर नीचे हरा **"Publish"** बटन दबाएँ। सूचना तुरंत वेबसाइट पर दिखने लगेगी।

### 3. नई पुस्तक कैसे जोड़ें?
1. बाईं पट्टी में **"पुस्तक एवं प्रकाशन"** चुनें।
2. **"+ Create"** दबाएँ।
3. पुस्तक का नाम, लेखक, विषय, और स्थिति (जैसे 'प्रकाशित' या 'निर्माणाधीन') चुनें।
4. मुखपृष्ठ (Cover Image) और नमूना पीडीएफ अपलोड करें।
5. **"Publish"** दबाएँ।

### 4. ग्राम एटलस में गाँव कैसे जोड़ें?
1. **"ग्राम एटलस — गाँव"** पर क्लिक करें।
2. गाँव का नाम, विकासखंड, नामकरण की कहानी, नदियाँ-तालाब, और पारंपरिक व्यवस्था का विवरण लिखें।
3. गाँव के फ़ोटो अपलोड करें और **"Publish"** दबाएँ।

### 5. कोई पुरानी प्रविष्टि कैसे बदलें या हटाएँ?
- जिस प्रविष्टि को बदलना हो उस पर क्लिक करें, बदलाव करें और **"Publish"** दबाएँ।
- हटाने के लिए नीचे दिए गए तीन बिंदुओं (`...`) पर क्लिक करके **"Delete"** चुनें।
