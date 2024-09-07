const isProduction = import.meta.env.PROD;
const baseUrl = isProduction
    ? import.meta.env.PRIVATE_BASE_URL
    : import.meta.env.PRIVATE_BASE_URL_DEV;

export const environment = {
    isProduction,
    baseUrl,
    cookies: {
        secrets: (import.meta.env.PRIVATE_COOKIE_SECRETS ?? '').split('|'),
    },
};
