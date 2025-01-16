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
    // Your existing fields...
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

    // Potential additional fields you might find useful:
    transcript: z.string().optional(), // For accessibility and SEO
    season: z.number().optional(), // If you plan to organize by seasons
    guests: z.array(z.string()).optional(), // For episodes with guests
    imageUrl: z.string().url().optional(), // Episode-specific cover art
    category: z.enum(['interview', 'tutorial', 'discussion', 'news']).optional(), // Episode type
  })
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Project title is required'),
    description: z.string().min(1, 'Project description is required'),
    image:z.object({
      src: z.string(),
      alt: z.string().default('Project preview image')
    }).optional(),
    techs: z.array(z.string()).default([]),
    githubLink: z.string().url().optional(),
    demoLink: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    projectType: z.enum(['frontend', 'backend', 'fullstack', 'mobile', 'other']),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    draft: z.boolean().optional().default(false)
  })
});

const stackCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Stack title is required'),
    description: z.string().min(1, 'Stack description is required'),
    technologies: z.array(z.object({
      name: z.string(),
      icon: z.string(),
      level: z.number().min(1).max(5),
      category: z.enum([
        'frontend',
        'backend',
        'database',
        'devops',
        'mobile',
        'testing',
        'ai_ml',
        'web3',
        'tools',
        'security',
        'cloud',
        'frameworks',
        'languages',
        'css',
        'state_management'
      ])
    })),
    notes: z.array(z.string()).optional(),
    lastUpdated: z.date().optional()
  })
});

const roadmapCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1, 'Roadmap title is required'),
    description: z.string().min(1, 'Roadmap description is required'),
    topics: z.array(z.object({
      name: z.string(),
      status: z.enum(['completed', 'in-progress', 'planned']),
      description: z.string(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      resources: z.array(z.string()).optional()
    }))
  })
});

export const collections = {
  blog: blogCollection,
  podcast: podcastCollection, 
  project: projectCollection,
  stack: stackCollection,
  roadmap: roadmapCollection
};


