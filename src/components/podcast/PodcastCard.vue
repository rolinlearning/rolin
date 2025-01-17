<template>
  <article 
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
           transition-all duration-300 hover:shadow-xl group
           border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
  >
    <div class="p-6">
      <!-- Episode Header -->
      <div class="flex items-center gap-2 mb-4">
        <div class="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          <Mic class="text-blue-600 dark:text-blue-400 w-5 h-5" />
        </div>
        <span 
          v-if="processedPodcast.episodeNumber" 
          class="text-sm font-medium text-blue-600 dark:text-blue-400"
        >
          Episodio {{ processedPodcast.episodeNumber }}
        </span>
      </div>

      <!-- Title -->
      <h2
        class="text-xl font-bold text-gray-900 dark:text-white mb-2 
               group-hover:text-blue-600 dark:group-hover:text-blue-400
               transition-colors duration-300"
      >
        <a :href="resolvePodcastPath(processedPodcast.slug)">
          {{ processedPodcast.title }}
        </a>
      </h2>

      <!-- Metadata -->
      <div class="flex items-center gap-3 text-sm text-gray-500 mb-3">
        <time :datetime="processedPodcast.pubDate.toISOString()">
          {{ formatDate(processedPodcast.pubDate) }}
        </time>
        <template v-if="processedPodcast.duration">
          <span class="w-1 h-1 rounded-full bg-gray-400" />
          <span class="flex items-center gap-1">
            <Clock class="text-gray-500 w-4 h-4" />
            {{ processedPodcast.duration }}
          </span>
        </template>
      </div>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
        {{ processedPodcast.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in processedPodcast.tags"
          :key="tag"
          class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 
                 text-gray-700 dark:text-gray-300 rounded-full"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Audio Player -->
      <div class="mt-4 border-t pt-4 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <button
            class="play-button flex items-center justify-center w-12 h-12
                   bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                   text-white rounded-full transition-colors duration-300"
            :aria-label="isPlaying ? 'Pause episode' : 'Play episode'"
            @click="togglePlay"
          >
            <Play v-if="!isPlaying" class="text-white w-6 h-6" />
            <Pause v-else class="text-white w-6 h-6" />
          </button>
          <div class="flex-1">
            <audio
              ref="audioPlayer"
              class="w-full h-8 audio-preview"
              controls
              preload="none"
              @play="onPlay"
              @pause="onPause"
            >
              <source :src="processedPodcast.audioUrl" type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        </div>
        <a
          :href="resolvePodcastPath(processedPodcast.slug)"
          class="mt-3 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400
                 dark:hover:text-blue-300 inline-flex items-center gap-1"
        >
          <span>Ver episodio completo</span>
          <ArrowRight class="w-4 h-4" />
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Mic, Clock, ArrowRight, Play, Pause } from 'lucide-vue-next';
import type { CollectionEntry } from 'astro:content';

// Types
interface ProcessedPodcast {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  duration?: string;
  episodeNumber?: number;
  audioUrl: string;
  tags: string[];
}

// Props
interface Props {
  podcast: CollectionEntry<'podcast'>;
}

const props = defineProps<Props>();

// Base path
const base = computed(() => import.meta.env.BASE_URL.replace(/\/$/, ''));

// Path resolver
const resolvePodcastPath = (slug: string): string => {
  return `${base.value}/podcast/${slug}`;
};

// Process the podcast data
const processedPodcast = computed<ProcessedPodcast>(() => ({
  slug: props.podcast.slug,
  title: props.podcast.data.title,
  description: props.podcast.data.description,
  pubDate: props.podcast.data.pubDate,
  duration: props.podcast.data.duration,
  episodeNumber: props.podcast.data.episodeNumber,
  audioUrl: props.podcast.data.audioUrl,
  tags: props.podcast.data.tags || []
}));

// Audio player state
const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);

// Format date helper function
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Audio control methods
const togglePlay = (): void => {
  if (!audioPlayer.value) return;
  
  if (audioPlayer.value.paused) {
    // Stop all other playing audio first
    document.querySelectorAll('audio').forEach((audio: HTMLAudioElement) => {
      if (audio !== audioPlayer.value && !audio.paused) {
        audio.pause();
      }
    });
    audioPlayer.value.play();
  } else {
    audioPlayer.value.pause();
  }
};

const onPlay = (): void => {
  isPlaying.value = true;
};

const onPause = (): void => {
  isPlaying.value = false;
};
</script>

<style scoped>
.audio-preview::-webkit-media-controls-panel {
  @apply bg-gray-100 dark:bg-gray-700;
}

.audio-preview::-webkit-media-controls-current-time-display,
.audio-preview::-webkit-media-controls-time-remaining-display {
  @apply text-gray-700 dark:text-gray-300;
}
</style>