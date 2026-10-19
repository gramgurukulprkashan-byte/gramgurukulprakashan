import { client } from './sanity';

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      slogan,
      missionStatement,
      counters,
      socialLinks,
      email,
      phone,
      address
    }`,
    {},
    { next: { tags: ['siteSettings'] } }
  );
}

export async function getLatestNotices(limit = 5) {
  return client.fetch(
    `*[_type == "notice"] | order(important desc, publishDate desc)[0...$limit]{
      _id, title, slug, description, publishDate, important,
      "hasPdf": defined(pdf),
      "hasImage": defined(image)
    }`,
    { limit: limit - 1 },
    { next: { tags: ['notices'] } }
  );
}

export async function getAllNotices() {
  return client.fetch(
    `*[_type == "notice"] | order(important desc, publishDate desc){
      _id, title, slug, description, publishDate, important,
      "hasPdf": defined(pdf),
      "hasImage": defined(image)
    }`,
    {},
    { next: { tags: ['notices'] } }
  );
}

export async function getNoticeBySlug(slug: string) {
  return client.fetch(
    `*[_type == "notice" && slug.current == $slug][0]{
      _id, title, slug, description, publishDate, important,
      image, pdf
    }`,
    { slug },
    { next: { tags: [`notice-${slug}`] } }
  );
}

export async function getFeaturedBooks(limit = 4) {
  return client.fetch(
    `*[_type == "book"] | order(publishDate desc)[0...$limit]{
      _id, title, slug, author, cover, subject, status, description
    }`,
    { limit: limit - 1 },
    { next: { tags: ['books'] } }
  );
}

export async function getAllBooks() {
  return client.fetch(
    `*[_type == "book"] | order(publishDate desc){
      _id, title, slug, author, cover, subject, status, description
    }`,
    {},
    { next: { tags: ['books'] } }
  );
}

export async function getBookBySlug(slug: string) {
  return client.fetch(
    `*[_type == "book" && slug.current == $slug][0]{
      _id, title, slug, author, cover, subject, status,
      description, samplePages, samplePdf, allowDownload, publishDate
    }`,
    { slug },
    { next: { tags: [`book-${slug}`] } }
  );
}

export async function getAllVachanalay() {
  return client.fetch(
    `*[_type == "vachanalay"] | order(village asc){
      _id, village, block, district, photos, note
    }`,
    {},
    { next: { tags: ['vachanalay'] } }
  );
}

export async function getVachanalayCounts() {
  return client.fetch(
    `count(*[_type == "vachanalay"])`,
    {},
    { next: { tags: ['vachanalay'] } }
  );
}

export async function getAllVillages() {
  return client.fetch(
    `*[_type == "village"] | order(name asc){
      _id, name, slug, district, block,
      "thumbnail": photos[0]
    }`,
    {},
    { next: { tags: ['villages'] } }
  );
}

export async function getVillageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "village" && slug.current == $slug][0]{
      _id, name, slug, district, block,
      nameStory, settlementHistory,
      riversAndPonds, plantsAndAnimals, grazingAreas,
      traditionalSystem, traditionsAndFestivals,
      photos, contributor, lat, lng
    }`,
    { slug },
    { next: { tags: [`village-${slug}`] } }
  );
}

export async function getAllTraditions() {
  return client.fetch(
    `*[_type == "tradition"] | order(name asc){
      _id, name, slug, meaning,
      "thumbnail": photos[0]
    }`,
    {},
    { next: { tags: ['traditions'] } }
  );
}

export async function getTraditionBySlug(slug: string) {
  return client.fetch(
    `*[_type == "tradition" && slug.current == $slug][0]{
      _id, name, slug, meaning, process,
      socialImportance, lesson, photos,
      mediaEmbed, contributor
    }`,
    { slug },
    { next: { tags: [`tradition-${slug}`] } }
  );
}

export async function getAllRoles() {
  return client.fetch(
    `*[_type == "role"] | order(name asc){
      _id, name, slug, description, responsibilities
    }`,
    {},
    { next: { tags: ['roles'] } }
  );
}

export async function getAllHistoryEntries() {
  return client.fetch(
    `*[_type == "historyEntry"] | order(_createdAt asc){
      _id, title, slug, category, sources, verified,
      "thumbnail": images[0]
    }`,
    {},
    { next: { tags: ['history'] } }
  );
}

export async function getAllKnowledgeTopics() {
  return client.fetch(
    `*[_type == "knowledgeTopic"] | order(title asc){
      _id, title, slug
    }`,
    {},
    { next: { tags: ['knowledge'] } }
  );
}

export async function getKnowledgeTopicBySlug(slug: string) {
  return client.fetch(
    `*[_type == "knowledgeTopic" && slug.current == $slug][0]{
      _id, title, slug,
      traditionalKnowledge, modernScience,
      similarities, differences, uses, images
    }`,
    { slug },
    { next: { tags: [`knowledge-${slug}`] } }
  );
}

export async function getSubjectCategories() {
  return client.fetch(
    `*[_type == "subjectCategory"] | order(name asc){
      _id, name, icon, description
    }`,
    {},
    { next: { tags: ['subjects'] } }
  );
}

export async function getLibraryStories() {
  return client.fetch(
    `*[_type == "libraryStory"] | order(_createdAt desc){
      _id, title, author, village, body, photo
    }`,
    {},
    { next: { tags: ['stories'] } }
  );
}

export async function searchAll(query: string) {
  const q = `*${query}*`;
  const [notices, books, villages, traditions] = await Promise.all([
    client.fetch(
      `*[_type == "notice" && title match $q]{_id, title, slug, _type}`,
      { q }
    ),
    client.fetch(
      `*[_type == "book" && title match $q]{_id, title, slug, _type}`,
      { q }
    ),
    client.fetch(
      `*[_type == "village" && name match $q]{_id, name, slug, _type}`,
      { q }
    ),
    client.fetch(
      `*[_type == "tradition" && name match $q]{_id, name, slug, _type}`,
      { q }
    ),
  ]);
  return { notices, books, villages, traditions };
}
