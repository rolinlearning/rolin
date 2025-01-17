import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(
    {
      applyBaseStyles: true,
      config: {
        applyBaseStyles: false,
        darkMode: 'class'
      }
    }
  ), vue()],
  site: 'https://rolinlearning.github.io',
  base: '/rolin/',
  output: 'static',
  build: {
    // Enable performance optimizations
    inlineStylesheets: 'auto',
    minify: true,
    // Split large pages into smaller chunks
    splitting: true,
    // Reduce the size of your JavaScript bundles
    format: 'file'
  }
});