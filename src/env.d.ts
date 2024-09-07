/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        paraglide: {
            lang: string;
            dir: 'ltr' | 'rtl';
        };
    }
}

interface ImportMetaEnv {
    readonly PRIVATE_BASE_URL: string;
    readonly PRIVATE_BASE_URL_DEV: string;

    /*
     * Secrets separated by '|',
     * the first secret is used for encryption,
     * then each secret is used for decryption,
     * this allows secret rotation.
     */
    readonly PRIVATE_COOKIE_SECRETS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
