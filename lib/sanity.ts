import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const projectId =
  rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : 'placeholder';

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
