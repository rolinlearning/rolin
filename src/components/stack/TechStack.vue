<template>
  <div class="tech-skills-container">
    <!-- Main Content -->
    <div v-if="groupedTech.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="category in groupedTech" 
        :key="category.name" 
        class="p-6 rounded-lg border border-gray-200 dark:border-gray-700 
               bg-white dark:bg-gray-800 transition-all duration-300 
               hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400"
      >
        <!-- Category Header -->
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ category.name }}
        </h3>

        <!-- Technologies List -->
        <div class="space-y-3">
          <div 
            v-for="tech in category.items" 
            :key="tech.name"
            class="flex items-center justify-between group"
          >
            <!-- Technology Name and Icon -->
            <div class="flex items-center gap-2">
              <span 
                class="text-lg text-gray-700 dark:text-gray-300 
                       group-hover:text-blue-500 dark:group-hover:text-blue-400 
                       transition-colors" 
                v-html="tech.icon"
              ></span>
              <span 
                class="text-gray-700 dark:text-gray-300 
                       group-hover:text-blue-500 dark:group-hover:text-blue-400 
                       transition-colors"
              >
                {{ tech.name }}
              </span>
            </div>

            <!-- Skill Level Indicators -->
            <div class="flex gap-1">
              <div 
                v-for="n in tech.level" 
                :key="`filled-${n}`"
                class="w-2 h-2 rounded-full bg-blue-500 
                       group-hover:bg-blue-600 transition-colors"
              ></div>
              <div 
                v-for="n in (5 - tech.level)" 
                :key="`empty-${n}`"
                class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 
                       group-hover:bg-gray-400 dark:group-hover:bg-gray-500 
                       transition-colors"
              ></div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div 
      v-else 
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      No technologies found.
    </div>

    <!-- Navigation Footer -->
    <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <a 
        :href="resolveBackPath(backRoute)"
        class="back-link inline-flex items-center text-gray-600 dark:text-gray-400 
               hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <svg 
          class="w-5 h-5 mr-2 rotate-180" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fill-rule="evenodd" 
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ backText }}</span>
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Types
interface Technology {
  name: string;
  icon: string;
  level: number;
  category: string;
}

interface TechnologyGroup {
  name: string;
  items: Technology[];
}

// Props
interface Props {
  technologies: Technology[];
  backRoute?: string;
  backText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  technologies: () => [],
  backRoute: '/',
  backText: 'Back to Main Page'
});

// Base path handling
const base = computed(() => import.meta.env.BASE_URL.replace(/\/$/, ''));

// Path resolver
const resolveBackPath = (path: string): string => {
  return `${base.value}${path.startsWith('/') ? path : `/${path}`}`;
};

// Computed: Group technologies by category
const groupedTech = computed<TechnologyGroup[]>(() => {
  if (!props.technologies?.length) return [];
  
  const groups: Record<string, Technology[]> = {};
  
  // Sort technologies by level (descending) within each category
  props.technologies.forEach(tech => {
    if (!groups[tech.category]) {
      groups[tech.category] = [];
    }
    groups[tech.category].push(tech);
  });

  // Sort categories alphabetically and sort technologies by level within each category
  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, items]) => ({
      name,
      items: items.sort((a, b) => b.level - a.level)
    }));
});
</script>

<style scoped>
/* Hover effect for skill dots */
.group:hover .rounded-full {
  @apply transform scale-110;
}

/* Smooth transitions */
.rounded-full {
  @apply transition-all duration-200;
}

/* Article card hover effect */
article {
  @apply transition-all duration-300;
}

article:hover {
  @apply transform -translate-y-1;
}

/* Footer styles */
.back-link:focus {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900;
}
</style>