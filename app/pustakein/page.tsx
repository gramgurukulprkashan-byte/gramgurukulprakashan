import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import EmptyState from '@/components/EmptyState';
import BookCard from '@/components/BookCard';
import { getAllBooks } from '@/lib/queries';
import { REAL_BOOKS } from '@/lib/seedData';

export const metadata: Metadata = {
  title: 'पुस्तकें एवं प्रकाशन',
  description: 'ग्राम गुरुकुल प्रकाशन की प्रकाशित और निर्माणाधीन पुस्तकें — नवभगीरथ, भीलांचल की आवाज, मेरा जिला और ग्राम एटलस।',
};

export default async function PustakeinPage() {
  let books: any[] = [];
  try {
    books = await getAllBooks() || [];
  } catch { /* empty */ }
  if (!books || books.length === 0) {
    books = REAL_BOOKS;
  }

  return (
    <>
      <PageHero
        title="पुस्तकें एवं प्रकाशन"
        description="ग्राम गुरुकुल प्रकाशन की पुस्तकें — गाँव के ज्ञान से, गाँव के लिए"
        breadcrumb={[{ label: 'पुस्तकें एवं प्रकाशन' }]}
        variant="mustard"
      />

      <section className="py-16 section-cream">
        <div className="container-main">
          <SectionTitle
            title="सभी पुस्तकें एवं पत्रिकाएँ"
            subtitle="गाँव के अनुभव, स्थानीय इतिहास, जल-संरक्षण और लोक-संस्कृति पर आधारित मौलिक प्रकाशन"
          />
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState message="अभी कोई पुस्तक उपलब्ध नहीं है।" />
          )}
        </div>
      </section>
    </>
  );
}
