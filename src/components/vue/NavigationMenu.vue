<template>
  <nav class="mt-6 md:mt-8">
    <ul class="flex items-center justify-center md:justify-start space-x-8">
      <li>
        <a href="/" class="group relative flex items-center space-x-2" :class="[
          isCurrentRoute('/')
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        ]">
          <HomeIcon class="w-8 h-8 transition-transform duration-300" :class="{ 'scale-110': isCurrentRoute('/') }"
          />
          <span
      class="absolute inset-x-0 -left-2 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400 transform transition-transform duration-300"
      :class="[
        isCurrentRoute('/')
          ? 'scale-x-100'
          : 'scale-x-0 group-hover:scale-x-100'
      ]"
    ></span>
        </a>
      </li>
      <li v-for="item in navItems" :key="item.path">
        <a :href="item.path"
          class="group relative flex items-center px-4 py-3 font-medium text-sm uppercase tracking-wider transition-colors duration-300"
          :class="[
            isCurrentRoute(item.path)
              ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700/50'
              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
          ]">
          <component :is="item.icon" class="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          <span>{{ item.label }}</span>
          <span
            class="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 dark:bg-blue-400 transform transition-transform duration-300"
            :class="[
              isCurrentRoute(item.path)
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100'
            ]"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { HomeIcon, DocumentTextIcon, RectangleStackIcon, MicrophoneIcon } from '@heroicons/vue/24/outline'

const currentPath = ref('/')

const navItems = [
  { path: '/blog', label: 'Blog', icon: DocumentTextIcon },
  { path: '/projects', label: 'Proyectos', icon: RectangleStackIcon },
  { path: '/podcast', label: 'Podcasts', icon: MicrophoneIcon }
]

const isCurrentRoute = (path) => {
  return currentPath.value === path
}

onMounted(() => {
  currentPath.value = window.location.pathname

  window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname
  })
})
</script>