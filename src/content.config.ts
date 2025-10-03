import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/aether/30 Hobbies/31 Homelab/05 Site/Posts" }),
  schema: z.object({
    title: z.string().optional(),
    created: z.date().optional(),
    modified: z.date().optional(),
    tags: z.array(z.string()).nullable().optional(),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/data/aether/30 Hobbies/31 Homelab/05 Site" }),
  schema: z.object({
  }),
});

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/aether/20 IT" }),
  schema: z.object({
    publish: z.boolean().optional(),
    tags: z.array(z.string()).nullable().optional(),
  }),
});

export const collections = { docs, blog, home, wiki };