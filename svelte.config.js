import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // Where to output the built site
      pages: 'build',      // HTML files
      assets: 'build',     // CSS, JS, images
      fallback: 'index.html'       // use 'index.html' if you want SPA routing
    }),
    // If your site uses relative paths
    paths: {
      base: '',           // change if deploying to a subfolder
    }
  }
};

export default config;
