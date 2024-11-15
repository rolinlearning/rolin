<template>
  <button
    @click="toggleTheme"
    class="fixed bottom-4 right-4 rounded-full bg-gray-200 p-2 text-gray-700 shadow-lg dark:bg-gray-700 dark:text-gray-200"
  >
    <sun-icon v-if="isDark" class="h-6 w-6" />
    <moon-icon v-else class="h-6 w-6" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

onMounted(() => {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  isDark.value = theme === 'dark';
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  }
});
</script>