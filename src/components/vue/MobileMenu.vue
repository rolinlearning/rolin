<template>
  <div class="flex items-center md:hidden">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex items-center justify-center rounded-md p-2 
             text-gray-600 hover:text-blue-600 hover:bg-gray-100 
             dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800
             transition-colors duration-300"
    >
      <span class="sr-only">Open main menu</span>
      <Bars3Icon v-if="!isOpen" class="h-6 w-6" />
      <XMarkIcon v-else class="h-6 w-6" />
    </button>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md 
               bg-white shadow-lg ring-1 ring-black ring-opacity-5 
               dark:bg-gray-800 dark:ring-gray-700"
      >
        <div class="py-2">
          <!-- Home Link -->
          <a
            :href="`${base}/`"
            :class="[
              'group flex items-center px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-300',
              isActive('/') 
                ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700/50'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            ]"
          >
            <HomeIcon class="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            Home
          </a>
          <!-- Nav Items -->
          <a
            v-for="item in navItems"
            :key="item.path"
            :href="`${base}${item.path}`"
            :class="[
              'group flex items-center px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-300',
              isActive(item.path)
                ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700/50'
                : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            ]"
          >
            <component 
              :is="item.icon"
              class="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" 
            />
            {{ item.label }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  MicrophoneIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  pathname: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

const navItems = [
  { path: '/blog', label: 'Blog', icon: DocumentTextIcon },
  { path: '/projects', label: 'Proyectos', icon: RectangleStackIcon },
  { path: '/podcast', label: 'Podcasts', icon: MicrophoneIcon }
]

const isActive = (path: string) => props.pathname.replace(base, '') === path
</script>