import { defineCollection, z } from 'astro:content';

export const collections = {
  'blog': defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      author: z.string().default('Rolin Espinoza 2'),
      image: z.string().optional(),
      tags: z.array(z.string()).default([])
    })
  })
};