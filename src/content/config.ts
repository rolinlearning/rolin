import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    pubDate: z.date({
      required_error: "Publication date is required",
      invalid_type_error: "Publication date must be a valid date",
    }),
    author: z.string().min(1, 'Author is required'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional().default(false),
  })
});

const podcastCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    pubDate: z.date({
      required_error: "Publication date is required",
      invalid_type_error: "Publication date must be a valid date",
    }),
    author: z.string().min(1, 'Host/Author is required'),
    episodeNumber: z.number().optional(),
    duration: z.string().optional(),
    audioUrl: z.string().url('Must be a valid URL'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional().default(false),
  })
});


export const collections = {
  blog: blogCollection,
  podcast: podcastCollection
};