import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: articleSchema,
});

const literatureReview = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/literature-review' }),
  schema: articleSchema,
});

export const collections = { blog, literatureReview };
