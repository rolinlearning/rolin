<template>
    <div v-if="topics?.length" class="space-y-8">
      <div v-for="topic in topics" :key="topic.name" 
           class="border-l-2 border-blue-500 pl-4 py-4">
        <div class="flex items-center gap-3 mb-2">
          <span :class="getStatusClasses(topic.status)" 
                class="px-2 py-1 text-sm rounded-full">
            {{ formatStatus(topic.status) }}
          </span>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ topic.name }}
          </h3>
        </div>
        
        <p class="text-gray-700 dark:text-gray-300 mb-3">
          {{ topic.description }}
        </p>
        
        <div class="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span v-if="topic.startDate">
            Iniciado: {{ formatDate(topic.startDate) }}
          </span>
          <span v-if="topic.endDate">
            Finalizado: {{ formatDate(topic.endDate) }}
          </span>
        </div>
  
        <div v-if="topic.resources?.length" class="mt-3">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Recursos de Aprendizaje:
          </h4>
          <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li v-for="resource in topic.resources" :key="resource">
              {{ resource }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      No roadmap topics found.
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface Topic {
    name: string;
    status: 'completed' | 'in-progress' | 'planned';
    description: string;
    startDate?: Date;
    endDate?: Date;
    resources?: string[];
  }
  
  export default defineComponent({
    name: 'RoadmapItem',
    props: {
      topics: {
        type: Array as () => Topic[],
        required: true,
        default: () => []
      }
    },
    methods: {
      formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        });
      },
      formatStatus(status: string): string {
        return status.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      },
      getStatusClasses(status: string): string {
        const classes = {
          'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          'planned': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        };
        return classes[status] || classes.planned;
      }
    }
  });
  </script>