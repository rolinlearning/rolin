<template>
  <button
    @click="toggleTheme"
    class="fixed bottom-4 right-4 p-2 rounded-full 
           bg-gray-200 dark:bg-gray-700 
           text-gray-700 dark:text-gray-200 
           shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600
           transform transition-all duration-200 ease-in-out
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
           active:scale-95"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <SunIcon v-if="isDark" class="h-6 w-6" />
    <MoonIcon v-else class="h-6 w-6" />
    <span class="sr-only">{{ isDark ? 'Switch to light theme' : 'Switch to dark theme' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = ref(false)
let mediaQuery: MediaQueryList | null = null

const updateTheme = (value: boolean) => {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('theme', value ? 'dark' : 'light')
  document.documentElement.style.colorScheme = value ? 'dark' : 'light'
}

const toggleTheme = () => {
  document.documentElement.classList.add('theme-transition')
  updateTheme(!isDark.value)
  
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition')
  }, 200)
}

// Handle system theme changes
const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
  if (!localStorage.getItem('theme')) {
    updateTheme(e.matches)
  }
}

onMounted(() => {
  // Initialize MediaQuery after mounting
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = mediaQuery.matches
  
  updateTheme(savedTheme ? savedTheme === 'dark' : systemPrefersDark)
  
  // Add system theme change listener
  mediaQuery.addEventListener('change', handleSystemThemeChange)
})

onBeforeUnmount(() => {
  // Clean up system theme change listener
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
})
</script>

<style>
.theme-transition,
.theme-transition * {
  transition: background-color 200ms ease-in-out, 
              color 200ms ease-in-out,
              border-color 200ms ease-in-out,
              box-shadow 200ms ease-in-out !important;
}
</style>