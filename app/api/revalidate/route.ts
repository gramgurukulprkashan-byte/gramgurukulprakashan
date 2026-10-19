import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-sanity-webhook-secret') || req.nextUrl.searchParams.get('secret');

    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'अमान्य सुरक्षा टोकन (Invalid Secret)' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const type = body?._type;
    const slug = body?.slug?.current;

    // Map Sanity document types to Next.js cache tags
    const typeTagMap: Record<string, string[]> = {
      siteSettings: ['siteSettings'],
      notice: ['notices'],
      book: ['books'],
      vachanalay: ['vachanalay'],
      village: ['villages'],
      tradition: ['traditions'],
      role: ['roles'],
      historyEntry: ['history'],
      knowledgeTopic: ['knowledge'],
      subjectCategory: ['subjects'],
      libraryStory: ['stories'],
    };

    const tagsToRevalidate = new Set<string>();

    if (type && typeTagMap[type]) {
      for (const t of typeTagMap[type]) {
        tagsToRevalidate.add(t);
      }
    }

    // Specific item tags
    if (slug) {
      tagsToRevalidate.add(`${type}-${slug}`);
    }

    // Always revalidate general list tags when documents change
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({
      revalidated: true,
      tags: Array.from(tagsToRevalidate),
      now: Date.now(),
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'रीवैलिडेशन में समस्या हुई' }, { status: 500 });
  }
}
