<script lang="ts">
    import {
        availableLanguageTags,
        isAvailableLanguageTag,
        languageTag,
        type AvailableLanguageTag,
    } from '~/paraglide/runtime.js';
    import { Languages } from '~/consts/languages.ts';
    import { getRelativeLocaleUrl } from 'astro:i18n';
    export let url: string;

    function getCurrentUrl() {
        const [locale, ...path] = url.split('/').slice(1);
        return isAvailableLanguageTag(locale) ? path.join('/') || '/' : url;
    }

    function getRedirectUrl(locale: string) {
        if (languageTag() === locale) return '#';
        return getRelativeLocaleUrl(locale, getCurrentUrl());
    }

    interface IAvailableLocale {
        lang: string;
        country: string;
        locale: AvailableLanguageTag;
    }
    function getAvailableLocales(): IAvailableLocale[] {
        return availableLanguageTags.map((locale) => {
            const [lang, country] = locale.toLowerCase().split('-');
            return {
                lang,
                country,
                locale,
            };
        });
    }
</script>

<div
    id="nxmu-language-modal"
    class="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden"
>
    <div
        class="sm:mx-auto sm:w-full sm:max-w-lg m-3 mt-0 flex min-h-[calc(100%-3.5rem)] items-center justify-center opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500"
    >
        <div
            class="pointer-events-auto flex max-w-80 flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70"
        >
            <div
                class="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700"
            >
                <h3 class="font-bold text-gray-800 dark:text-white">
                    Select Language
                </h3>
                <button
                    type="button"
                    class="flex size-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700"
                    data-hs-overlay="#nxmu-language-modal"
                >
                    <span class="sr-only">Close</span>
                    <svg
                        class="size-4 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
            <div
                class="flex max-w-[80vw] flex-row flex-wrap gap-4 overflow-y-auto p-4"
            >
                {#each getAvailableLocales() as locale}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <a
                        class="group flex cursor-pointer flex-col items-center gap-1.5 rounded border border-sky-300 p-2 text-sky-300 hover:border-sky-400 hover:text-sky-600 active:border-sky-600 active:text-sky-700"
                        href={getRedirectUrl(locale.locale)}
                        data-hs-overlay="#nxmu-language-modal"
                    >
                        <span
                            class="fi fi-{locale.country} h-8 !w-full opacity-60 group-hover:opacity-80 group-active:opacity-100"
                        />
                        <span class="text-xs font-medium capitalize"
                            >{Languages[locale.locale]}</span
                        >
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @use 'sass:list';
    $flag-icons-included-countries: us, es, br;
    $flag-icons-path: '/flags';
    $flag-icons-use-square: false;
    @import '../../node_modules/flag-icons/sass/flag-icons.scss';
</style>
