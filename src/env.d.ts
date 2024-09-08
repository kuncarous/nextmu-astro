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
    readonly PRIVATE_REQUEST_COOKIE_SECRETS: string;
    readonly PRIVATE_SESSION_COOKIE_SECRETS: string;

    /*
     * OpenID Connect fields
     */
    readonly PRIVATE_OPENID_ISSUER_URL: string;
    readonly PRIVATE_OPENID_PROJECT_ID: string;

    /*
     * Portal OpenID Connect fields
     */
    readonly PRIVATE_PORTAL_OPENID_CLIENT_ID: string;
    readonly PRIVATE_PORTAL_OPENID_CLIENT_SECRET?: string;
    readonly PRIVATE_PORTAL_OPENID_AUTH_METHOD: string;
    readonly PRIVATE_PORTAL_OPENID_ADDITIONAL_SCOPES: string;

    /*
     * API OpenID Connect fields
     */
    readonly PRIVATE_API_OPENID_CLIENT_ID: string;
    readonly PRIVATE_API_OPENID_CLIENT_SECRET?: string;
    readonly PRIVATE_API_OPENID_AUTH_METHOD: string;

    /*
     * OpenID Connect callback fields
     */
    readonly PRIVATE_AUTH_CALLBACK_URL: string;
    readonly PRIVATE_LOGOUT_CALLBACK_URL: string;

    /*
     * Update Service fields
     */
    readonly PRIVATE_UPDATESERVICE_GAME_ADDRESS: string;
    readonly PRIVATE_UPDATESERVICE_LAUNCHER_ADDRESS: string;

    /*
     * MongoDB fields
     */
    readonly PRIVATE_MONGODB_URI: string;

    /*
     * Redis fields
     */
    readonly PRIVATE_REDIS_HOST: string;
    readonly PRIVATE_REDIS_PORT: string;
    readonly PRIVATE_REDIS_USER?: string;
    readonly PRIVATE_REDIS_PASS?: string;
    readonly PRIVATE_REDIS_SSL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
