<template>
  <div class="roadmap-container">
    <!-- Topics List -->
    <div v-if="topics?.length" class="space-y-8">
      <article 
        v-for="topic in topics" 
        :key="topic.name"
        class="topic-card border-l-2 border-blue-500 pl-4 py-4 
               transition-all duration-200 hover:border-blue-600"
      >
        <!-- Header Section -->
        <header class="flex items-center gap-3 mb-2">
          <span 
            :class="getStatusClasses(topic.status)" 
            class="status-badge px-2 py-1 text-sm rounded-full"
          >
            {{ formatStatus(topic.status) }}
          </span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ topic.name }}
          </h3>
        </header>
        
        <!-- Description -->
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          {{ topic.description }}
        </p>
        
        <!-- Dates -->
        <div class="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span v-if="topic.startDate" class="date-info">
            <span class="font-medium">Started:</span> {{ formatDate(topic.startDate) }}
          </span>
          <span v-if="topic.endDate" class="date-info">
            <span class="font-medium">Completed:</span> {{ formatDate(topic.endDate) }}
          </span>
        </div>
  
        <!-- Resources Section -->
        <div 
          v-if="topic.resources?.length" 
          class="resources-section mt-3"
        >
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Learning Resources:
          </h4>
          <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li 
              v-for="(resource, index) in topic.resources" 
              :key="index"
              class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              {{ resource }}
            </li>
          </ul>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div 
      v-else 
      class="empty-state text-center py-8 text-gray-500 dark:text-gray-400"
    >
      No roadmap topics available.
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
type TopicStatus = 'completed' | 'in-progress' | 'planned';

interface Topic {
  name: string;
  status: TopicStatus;
  description: string;
  startDate?: Date;
  endDate?: Date;
  resources?: string[];
}

// Props
interface Props {
  topics: Topic[];
  backRoute?: string;
  backText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  topics: () => [],
  backRoute: '/',
  backText: 'Back to Main Page'
});

// Base path handling
const base = computed(() => import.meta.env.BASE_URL.replace(/\/$/, ''));

// Path resolver
const resolveBackPath = (path: string): string => {
  return `${base.value}${path.startsWith('/') ? path : `/${path}`}`;
};

// Status Classes Mapping
const statusClassMap: Record<TopicStatus, string> = {
  'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'planned': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
} as const;

// Formatting methods
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

const formatStatus = (status: TopicStatus): string => {
  return status.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getStatusClasses = (status: TopicStatus): string => {
  return statusClassMap[status];
};
</script>

<style scoped>
.topic-card {
  @apply transition-all duration-200;
}

.topic-card:hover {
  @apply transform translate-x-1;
}

.status-badge {
  @apply transition-colors duration-200;
}

.back-link:focus {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900;
}

.resources-section ul li::marker {
  @apply text-blue-500 dark:text-blue-400;
}
</style>