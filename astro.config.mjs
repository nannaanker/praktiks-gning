import { defineConfig } from 'astro/config';

import alpinejs from "@astrojs/alpinejs";

import svelte from '@astrojs/svelte';

import { defineConfig } from 'astro/config';




// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), svelte()], 
});





