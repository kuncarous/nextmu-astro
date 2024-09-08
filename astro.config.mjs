import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import paraglide from '@inlang/paraglide-astro';
import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        svelte(),
        react(),
        paraglide({
            project: './project.inlang',
            outdir: './src/paraglide',
        }),
    ],
    i18n: {
        defaultLocale: 'en-us',
        locales: ['en-us', 'es-es', 'pt-br'],
        routing: {
            prefixDefaultLocale: true,
        },
    },
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    redirects: {
        '/': {
            status: 301,
            destination: '/en-us/',
        },
    },
    build: {
        redirects: false,
    },
});
