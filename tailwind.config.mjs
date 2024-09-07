/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/preline/preline.js',
    ],
    theme: {
        extend: {
            colors: {
                'nextmu-green': '#008016',
                'nextmu-green-selected': '#00c016',
                'nextmu-green-hover': '#00d016',
                'nextmu-green-active': '#00ff16',
                mudevs: '#f91668',
            },
            dropShadow: {
                text: [
                    '1px 1px 2px rgba(0, 0, 0, 0.8)',
                    '1px 1px 2px rgba(0, 0, 0, 0.8)',
                ],
            },
            boxShadow: {
                repo: '0 0 2rem #3fac0766',
            },
        },
        screens: {
            mobile: '820px',
        },
    },
    plugins: [require('preline/plugin')],
};
