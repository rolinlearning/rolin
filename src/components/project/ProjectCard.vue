<template>
    <article class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                  hover:shadow-xl group transition-all duration-300">
        <div class="relative">
            <div class="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <img v-if="project.data.image?.src" 
                     :src="resolveImagePath(project.data.image.src)"
                     :alt="project.data.image.alt"
                     @error="handleImageError"
                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                    <Code class="w-12 h-12" />
                </div>
            </div>
        </div>

        <div class="p-6">
            <!-- Title -->
            <h3 class="mb-3">
                <a :href="resolveProjectPath(project.slug)" 
                   class="text-xl font-bold text-gray-900 dark:text-white
                          group-hover:text-blue-600 dark:group-hover:text-blue-400 
                          transition-colors duration-300 inline-flex items-center gap-2">
                    {{ project.data.title }}
                    <ArrowUpRight class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            </h3>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                {{ project.data.description }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tech in project.data.techs" 
                      :key="tech"
                      class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                            px-3 py-1 rounded-full font-medium">
                    {{ tech }}
                </span>
            </div>

            <!-- Links -->
            <div class="flex items-center gap-4">
                <a v-if="project.data.githubLink"
                   :href="project.data.githubLink"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 
                          dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
                   aria-label="View source code on GitHub">
                    <Github class="w-5 h-5" />
                    <span>Source</span>
                </a>
                <a v-if="project.data.demoLink"
                   :href="project.data.demoLink"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 
                          dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                   aria-label="View live demo">
                    <ExternalLink class="w-5 h-5" />
                    <span>Live Demo</span>
                </a>
            </div>
        </div>
    </article>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowUpRight, ExternalLink, Github, Code } from 'lucide-vue-next';
import type { CollectionEntry } from 'astro:content';

// Types remain the same...
interface Props {
    project: CollectionEntry<'project'>;
}

const props = defineProps<Props>();
const imageLoadError = ref(false);

// Updated path resolution for GitHub Pages
const base = computed(() => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const repoName = import.meta.env.PUBLIC_GITHUB_REPO || '';
    return import.meta.env.PROD ? `/${repoName}${baseUrl}` : baseUrl;
});

const resolveImagePath = (path: string): string => {
    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    
    // Remove any leading slashes
    const cleanPath = path.replace(/^\/+/, '');
    
    // Construct the full path
    return `${base.value}/${cleanPath}`;
};

const handleImageError = () => {
    imageLoadError.value = true;
    console.error(`Failed to load image: ${props.project.data.image?.src}`);
};

const resolveProjectPath = (slug: string): string => {
    return `${base.value}/projects/${slug}`;
};
</script>