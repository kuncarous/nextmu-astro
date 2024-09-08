import type { ClientAuthenticationMethod } from 'oauth4webapi';

const isProduction = import.meta.env.PROD;
const baseUrl = isProduction
    ? import.meta.env.PRIVATE_BASE_URL
    : import.meta.env.PRIVATE_BASE_URL_DEV;

function getAdditionalScopes(
    additionalScopes: string,
    defaultScopes = 'openid profile email offline_access',
) {
    const scopes = new Set<string>();
    [defaultScopes, additionalScopes]
        .join(' ')
        .split(' ')
        .forEach((scope) => scopes.add(scope.toLowerCase()));
    return Array.from(scopes).join(' ');
}

export const environment = {
    isProduction,
    baseUrl,
    cookies: {
        secrets: {
            request: (
                import.meta.env.PRIVATE_REQUEST_COOKIE_SECRETS ?? ''
            ).split('|'),
            session: (
                import.meta.env.PRIVATE_SESSION_COOKIE_SECRETS ?? ''
            ).split('|'),
        },
    },
    openId: {
        issuerUrl: new URL(import.meta.env.PRIVATE_OPENID_ISSUER_URL),
        projectId: import.meta.env.PRIVATE_OPENID_PROJECT_ID,
        portal: {
            clientId: import.meta.env.PRIVATE_PORTAL_OPENID_CLIENT_ID,
            clientSecret:
                import.meta.env.PRIVATE_PORTAL_OPENID_CLIENT_SECRET ||
                undefined,
            authMethod: (import.meta.env.PRIVATE_PORTAL_OPENID_AUTH_METHOD ||
                'none') as ClientAuthenticationMethod,
            additionalScopes: getAdditionalScopes(
                import.meta.env.PRIVATE_PORTAL_OPENID_ADDITIONAL_SCOPES,
            ),
        },
        api: {
            clientId: import.meta.env.PRIVATE_API_OPENID_CLIENT_ID,
            clientSecret:
                import.meta.env.PRIVATE_API_OPENID_CLIENT_SECRET || undefined,
            authMethod: (import.meta.env.PRIVATE_API_OPENID_AUTH_METHOD ||
                'client_secret_basic') as ClientAuthenticationMethod,
        },
        callbacks: {
            auth: import.meta.env.PRIVATE_AUTH_CALLBACK_URL,
            logout: import.meta.env.PRIVATE_LOGOUT_CALLBACK_URL,
        },
    },
    updateService: {
        game: import.meta.env.PRIVATE_UPDATESERVICE_GAME_ADDRESS,
        launcher: import.meta.env.PRIVATE_UPDATESERVICE_LAUNCHER_ADDRESS,
    },
    mongoDb: {
        uri: import.meta.env.PRIVATE_MONGODB_URI,
    },
    redis: {
        host: import.meta.env.PRIVATE_REDIS_HOST,
        port: new Number(
            import.meta.env.PRIVATE_REDIS_PORT || '6379',
        ).valueOf(),
        user: import.meta.env.PRIVATE_REDIS_USER,
        pass: import.meta.env.PRIVATE_REDIS_PASS,
        ssl: new Number(import.meta.env.PRIVATE_REDIS_SSL || '0').valueOf() > 0,
    },
};
