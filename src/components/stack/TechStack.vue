<!-- src/components/stack/TechStack.vue -->
<template>
    <div v-if="technologies?.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="category in groupedTech" :key="category.name" 
           class="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {{ category.name }}
        </h3>
        <div class="space-y-3">
          <div v-for="tech in category.items" :key="tech.name"
               class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg" v-html="tech.icon"></span>
              <span class="text-gray-700 dark:text-gray-300">{{ tech.name }}</span>
            </div>
            <div class="flex gap-1">
              <div v-for="n in tech.level" :key="n"
                   class="w-2 h-2 rounded-full bg-blue-500"></div>
              <div v-for="n in 5-tech.level" :key="n"
                   class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      No technologies found.
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  interface Technology {
    name: string;
    icon: string;
    level: number;
    category: string;
  }
  
  export default defineComponent({
    name: 'TechStack',
    props: {
      technologies: {
        type: Array as () => Technology[],
        required: true,
        default: () => []
      }
    },
    setup(props) {
      const groupedTech = computed(() => {
        if (!props.technologies?.length) return [];
        
        const groups: Record<string, Technology[]> = {};
        props.technologies.forEach(tech => {
          if (!groups[tech.category]) {
            groups[tech.category] = [];
          }
          groups[tech.category].push(tech);
        });
        return Object.entries(groups).map(([name, items]) => ({ name, items }));
      });
  
      return {
        groupedTech
      };
    }
  });
  </script>