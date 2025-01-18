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
    assets: 'assets',  // Add this to optimize asset handling
    inlineStylesheets: 'auto',
    minify: true,
    splitting: true,
    format: 'file'
  },
  image: {
    // Add image optimization settings
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{
      protocol: 'https'
    }],
    // Enable performance optimizations
    inlineStylesheets: 'auto',
    minify: true,
    // Split large pages into smaller chunks
    splitting: true,
    // Reduce the size of your JavaScript bundles
    format: 'file'
  }
});