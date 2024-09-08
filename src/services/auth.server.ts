import * as oidc from 'oauth4webapi';
import {
    type IUserInfo,
    UserInfoVersion,
    ZPublicUserInfo,
} from '~/providers/auth/types';
import { createOrFindAccount } from './mongodb/account.server';
import { getSessionFromRedis, saveSessionInRedis } from './redis/auth.server';
import { environment } from '~/consts/environment';
import type { APIContext } from 'astro';
import { createCookieStorage, type CookieStorage } from '~/utils/cookies';
import { StatusCodes } from 'http-status-codes';

interface ISessionRequestData {
    redirect_url?: string;
    code_challenge_method: string;
    code_challenge: string;
    code_verifier: string;
    nonce?: string;
}

let sessionRequestStorage: CookieStorage<ISessionRequestData> | null = null;
export const getSessionRequestStorage = async () => {
    if (sessionRequestStorage != null) return sessionRequestStorage;
    sessionRequestStorage = createCookieStorage<ISessionRequestData>({
        name: '_session_req', // use any name you want here
        sameSite: 'lax', // this helps with CSRF
        path: '/', // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: environment.cookies.secrets.request, // replace this with an actual secret
        secure: environment.isProduction, // enable this in prod only
    });
    return sessionRequestStorage;
};

interface ISessionData extends oidc.TokenEndpointResponse {
    account_id: string;
}
let sessionStorage: CookieStorage<ISessionData> | null = null;
export const getSessionStorage = async () => {
    if (sessionStorage != null) return sessionStorage;
    sessionStorage = createCookieStorage<ISessionData>({
        name: '_session', // use any name you want here
        sameSite: 'lax', // this helps with CSRF
        path: '/', // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: environment.cookies.secrets.session, // replace this with an actual secret
        secure: environment.isProduction, // enable this in prod only
    });
    return sessionStorage;
};

let authorizationServer: oidc.AuthorizationServer | null = null;
export const getAuthorizationServer = async () => {
    try {
        if (authorizationServer != null) return authorizationServer;

        const { issuerUrl } = environment.openId;
        const response = await oidc.discoveryRequest(issuerUrl);
        if (!response.ok) {
            return null;
        }

        return await oidc.processDiscoveryResponse(issuerUrl, response);
    } catch (error) {
        return null;
    }
};

let portalAuthClient: oidc.Client | null = null;
export const getPortalAuthClient = async () => {
    if (portalAuthClient != null) return portalAuthClient;
    portalAuthClient = {
        client_id: environment.openId.portal.clientId,
        client_secret: environment.openId.portal.clientSecret,
        token_endpoint_auth_method: environment.openId.portal.authMethod,
    };
    return portalAuthClient;
};

let portalApiAuthClient: oidc.Client | null = null;
export const getPortalApiAuthClient = async () => {
    if (portalApiAuthClient != null) return portalApiAuthClient;
    portalApiAuthClient = {
        client_id: environment.openId.api.clientId,
        client_secret: environment.openId.api.clientSecret,
        token_endpoint_auth_method: environment.openId.api.authMethod,
    };
    return portalApiAuthClient;
};

export const getAccessToken = async (context: APIContext) => {
    try {
        const sessionStorage = await getSessionStorage();
        if (sessionStorage == null) return null;

        const sessionData = await sessionStorage.get(context.cookies);
        return sessionData?.access_token ?? null;
    } catch (e) {
        return null;
    }
};

const code_challenge_method = 'S256';
export const redirectToLogin = async (
    context: APIContext,
): Promise<Response> => {
    try {
        const sessionRequestStorage = await getSessionRequestStorage();
        if (sessionRequestStorage == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const authServer = await getAuthorizationServer();
        if (authServer == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const code_verifier = oidc.generateRandomCodeVerifier();
        const code_challenge =
            await oidc.calculatePKCECodeChallenge(code_verifier);
        let nonce: string | undefined;

        const authorizationUrl = new URL(authServer.authorization_endpoint!);
        authorizationUrl.searchParams.set(
            'client_id',
            environment.openId.portal.clientId,
        );
        authorizationUrl.searchParams.set(
            'redirect_uri',
            new URL('/login/callback', environment.baseUrl).toString(),
        );
        authorizationUrl.searchParams.set('response_type', 'code');
        authorizationUrl.searchParams.set(
            'scope',
            environment.openId.portal.additionalScopes,
        );

        const codeChallengeMethodSupported =
            authServer.code_challenge_methods_supported?.includes(
                code_challenge_method,
            );
        const sessionRequest: ISessionRequestData = {
            redirect_url: context.request.url,
            code_challenge,
            code_verifier,
            code_challenge_method: codeChallengeMethodSupported
                ? code_challenge_method
                : 'nonce',
        };

        if (codeChallengeMethodSupported == false) {
            nonce = oidc.generateRandomNonce();
            authorizationUrl.searchParams.set('nonce', nonce);
            sessionRequest.nonce = nonce;
        } else {
            authorizationUrl.searchParams.set('code_challenge', code_challenge);
            authorizationUrl.searchParams.set(
                'code_challenge_method',
                code_challenge_method,
            );
        }

        authorizationUrl.searchParams.set('prompt', 'login');

        await sessionRequestStorage.set(sessionRequest, context.cookies);
        return context.redirect(authorizationUrl.href);
    } catch (error) {
        return new Response(null, {
            status: StatusCodes.SERVICE_UNAVAILABLE,
            statusText: 'Service Unavailable',
        });
    }
};

export const redirectToRegister = async (
    context: APIContext,
): Promise<Response> => {
    try {
        const sessionRequestStorage = await getSessionRequestStorage();
        if (sessionRequestStorage == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const authServer = await getAuthorizationServer();
        if (authServer == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const code_verifier = oidc.generateRandomCodeVerifier();
        const code_challenge =
            await oidc.calculatePKCECodeChallenge(code_verifier);
        let nonce: string | undefined;

        const authorizationUrl = new URL(authServer.authorization_endpoint!);
        authorizationUrl.searchParams.set(
            'client_id',
            environment.openId.portal.clientId,
        );
        authorizationUrl.searchParams.set(
            'redirect_uri',
            new URL('/login/callback', environment.baseUrl).toString(),
        );
        authorizationUrl.searchParams.set('response_type', 'code');
        authorizationUrl.searchParams.set(
            'scope',
            environment.openId.portal.additionalScopes,
        );

        const codeChallengeMethodSupported =
            authServer.code_challenge_methods_supported?.includes(
                code_challenge_method,
            );
        const sessionRequest: ISessionRequestData = {
            redirect_url: context.request.url,
            code_challenge,
            code_verifier,
            code_challenge_method: codeChallengeMethodSupported
                ? code_challenge_method
                : 'nonce',
        };

        if (codeChallengeMethodSupported == false) {
            nonce = oidc.generateRandomNonce();
            authorizationUrl.searchParams.set('nonce', nonce);
            sessionRequest.nonce = nonce;
        } else {
            authorizationUrl.searchParams.set('code_challenge', code_challenge);
            authorizationUrl.searchParams.set(
                'code_challenge_method',
                code_challenge_method,
            );
        }

        authorizationUrl.searchParams.set('prompt', 'create');

        await sessionRequestStorage.set(sessionRequest, context.cookies);
        return context.redirect(authorizationUrl.href);
    } catch (error) {
        return new Response(null, {
            status: StatusCodes.SERVICE_UNAVAILABLE,
            statusText: 'Service Unavailable',
        });
    }
};

export const redirectToSwitch = async (
    context: APIContext,
): Promise<Response> => {
    try {
        const sessionRequestStorage = await getSessionRequestStorage();
        if (sessionRequestStorage == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const authServer = await getAuthorizationServer();
        if (authServer == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const code_verifier = oidc.generateRandomCodeVerifier();
        const code_challenge =
            await oidc.calculatePKCECodeChallenge(code_verifier);
        let nonce: string | undefined;

        const authorizationUrl = new URL(authServer.authorization_endpoint!);
        authorizationUrl.searchParams.set(
            'client_id',
            environment.openId.portal.clientId,
        );
        authorizationUrl.searchParams.set(
            'redirect_uri',
            new URL('/login/callback', environment.baseUrl).toString(),
        );
        authorizationUrl.searchParams.set('response_type', 'code');
        authorizationUrl.searchParams.set(
            'scope',
            environment.openId.portal.additionalScopes,
        );

        const codeChallengeMethodSupported =
            authServer.code_challenge_methods_supported?.includes(
                code_challenge_method,
            );
        const sessionRequest: ISessionRequestData = {
            redirect_url: context.request.url,
            code_challenge,
            code_verifier,
            code_challenge_method: codeChallengeMethodSupported
                ? code_challenge_method
                : 'nonce',
        };

        if (codeChallengeMethodSupported == false) {
            nonce = oidc.generateRandomNonce();
            authorizationUrl.searchParams.set('nonce', nonce);
            sessionRequest.nonce = nonce;
        } else {
            authorizationUrl.searchParams.set('code_challenge', code_challenge);
            authorizationUrl.searchParams.set(
                'code_challenge_method',
                code_challenge_method,
            );
        }

        authorizationUrl.searchParams.set('prompt', 'select_account');

        await sessionRequestStorage.set(sessionRequest, context.cookies);
        return context.redirect(authorizationUrl.href);
    } catch (error) {
        return new Response(null, {
            status: StatusCodes.SERVICE_UNAVAILABLE,
            statusText: 'Service Unavailable',
        });
    }
};

export const processAuthResponse = async (context: APIContext) => {
    const sessionRequestStorage = await getSessionRequestStorage();
    if (sessionRequestStorage == null) return context.redirect('/');

    const sessionStorage = await getSessionStorage();
    if (sessionStorage == null) return context.redirect('/');

    const sessionRequest = await sessionRequestStorage.get(context.cookies);
    if (sessionRequest == null) return context.redirect('/');

    try {
        const authServer = await getAuthorizationServer();
        if (authServer == null) throw new Error('missing auth server metadata');

        const client = await getPortalAuthClient();
        const currentUrl = new URL(context.request.url);
        const params = oidc.validateAuthResponse(
            authServer,
            client,
            currentUrl,
        );
        if (oidc.isOAuth2Error(params)) {
            throw new Error('failed to validate auth response');
        }

        const authorizationResponse = await oidc.authorizationCodeGrantRequest(
            authServer,
            client,
            params,
            new URL('/login/callback', environment.baseUrl).toString(),
            sessionRequest.code_verifier,
        );
        if (!authorizationResponse.ok) {
            throw new Error('failed to retrieve access token');
        }

        const { nonce } = sessionRequest;
        const authorizationResult =
            await oidc.processAuthorizationCodeOpenIDResponse(
                authServer,
                client,
                authorizationResponse,
                nonce,
            );
        if (oidc.isOAuth2Error(authorizationResult)) {
            throw new Error('failed to process authorization code response');
        }

        const apiClient = await getPortalApiAuthClient();
        const introspectionResponse = await oidc.introspectionRequest(
            authServer,
            apiClient,
            authorizationResult.access_token,
            {
                additionalParameters: {
                    token_hint_type: 'access_token',
                },
            },
        );
        if (!introspectionResponse.ok) {
            throw new Error('failed to retrieve introspection response');
        }

        const introspectionResult = await oidc.processIntrospectionResponse(
            authServer,
            apiClient,
            introspectionResponse,
        );
        if (
            oidc.isOAuth2Error(introspectionResult) ||
            introspectionResult.active == false
        ) {
            throw new Error('failed to process introspection response');
        }

        const accountId = await createOrFindAccount(
            introspectionResult as oidc.IntrospectionResponse,
        );
        if (accountId == null) {
            throw new Error('failed to create or find account');
        }

        const userInfo: IUserInfo = {
            version: UserInfoVersion,
            aud: introspectionResult.aud!,
            sub: introspectionResult.sub!,
            email: introspectionResult.email as string | undefined,
            email_verified: introspectionResult.email_verified as
                | boolean
                | undefined,
            given_name: introspectionResult.given_name as string | undefined,
            family_name: introspectionResult.family_name as string | undefined,
            expire_at: introspectionResult.exp,
            roles: Object.keys(
                introspectionResult['urn:zitadel:iam:org:project:roles'] ?? {},
            ),
        };
        await saveSessionInRedis(
            environment.openId.projectId,
            authorizationResult.access_token,
            userInfo,
        );

        const session: ISessionData = {
            ...authorizationResult,
            account_id: accountId.toHexString(),
        };

        await sessionRequestStorage.delete(context.cookies);
        await sessionStorage.set(session, context.cookies);
        return context.redirect(sessionRequest.redirect_url || '/');
    } catch (error) {
        await sessionRequestStorage.delete(context.cookies);
        return context.redirect('/');
    }
};

export const redirectToLogout = async (
    context: APIContext,
): Promise<Response> => {
    try {
        const sessionStorage = await getSessionStorage();
        if (sessionStorage == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const authServer = await getAuthorizationServer();
        if (authServer == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const sessionData = await sessionStorage.get(context.cookies);
        if (sessionData == null)
            return new Response(null, {
                status: StatusCodes.SERVICE_UNAVAILABLE,
                statusText: 'Service Unavailable',
            });

        const endSessionUrl = new URL(authServer.end_session_endpoint!);
        endSessionUrl.searchParams.set(
            'client_id',
            environment.openId.portal.clientId,
        );
        endSessionUrl.searchParams.set(
            'post_logout_redirect_uri',
            new URL('/logout/callback', environment.baseUrl).toString(),
        );
        if (sessionData.id_token) {
            endSessionUrl.searchParams.set(
                'id_token_hint',
                sessionData.id_token,
            );
        }

        return context.redirect(endSessionUrl.href);
    } catch (error) {
        return new Response(null, {
            status: StatusCodes.SERVICE_UNAVAILABLE,
            statusText: 'Service Unavailable',
        });
    }
};

export const processLogoutResponse = async (context: APIContext) => {
    const sessionStorage = await getSessionStorage();
    if (sessionStorage == null) return context.redirect('/');

    await sessionStorage.delete(context.cookies);
    return context.redirect('/');
};

export const refreshSession = async (context: APIContext) => {
    const authServer = await getAuthorizationServer();
    if (authServer == null) return null;

    const sessionStorage = await getSessionStorage();
    if (sessionStorage == null) return null;

    const sessionData = await sessionStorage.get(context.cookies);
    if (!sessionData?.refresh_token) return null;

    const client = await getPortalAuthClient();
    const response = await oidc.refreshTokenGrantRequest(
        authServer,
        client,
        sessionData.refresh_token,
    );
    if (!response.ok) return null;

    const result = await oidc.processRefreshTokenResponse(
        authServer,
        client,
        response,
    );
    if (oidc.isOAuth2Error(result)) return null;

    const newSession: ISessionData = {
        ...result,
        account_id: sessionData.account_id,
    };

    await sessionStorage.set(newSession, context.cookies);
    return context.redirect(context.request.url);
};

export const clearSession = async (context: APIContext) => {
    const authServer = await getAuthorizationServer();
    if (authServer == null) return null;

    const sessionStorage = await getSessionStorage();
    if (sessionStorage == null) return null;

    await sessionStorage.delete(context.cookies);
    return context.redirect(context.request.url);
};

export const getUserInfo = async (
    accessToken: string,
    options?: oidc.UserInfoRequestOptions,
) => {
    try {
        const authServer = await getAuthorizationServer();
        if (authServer == null) return null;

        const response = await oidc.userInfoRequest(
            authServer,
            await getPortalAuthClient(),
            accessToken,
            options,
        );
        if (!response.ok) {
            return null;
        }

        return await oidc.processDiscoveryResponse(
            environment.openId.issuerUrl,
            response,
        );
    } catch (error) {
        return null;
    }
};

export const isAuthenticated = async (
    context: APIContext,
    accessToken: string | null = null,
) => {
    if (accessToken == null) {
        accessToken = await getAccessToken(context);
    }
    if (accessToken == null) return false;

    const cachedSession = await getSessionFromRedis(
        environment.openId.projectId,
        accessToken,
    );
    if (cachedSession != null) return true;

    const authServer = await getAuthorizationServer();
    if (authServer == null) return false;

    const apiClient = await getPortalApiAuthClient();
    const introspectionResponse = await oidc.introspectionRequest(
        authServer,
        apiClient,
        accessToken,
        {
            additionalParameters: {
                token_hint_type: 'access_token',
            },
        },
    );
    if (!introspectionResponse.ok) {
        return false;
    }

    const introspectionResult = await oidc.processIntrospectionResponse(
        authServer,
        apiClient,
        introspectionResponse,
    );
    if (oidc.isOAuth2Error(introspectionResult)) {
        return false;
    }

    if (introspectionResult.active == false) {
        return await refreshSession(context);
    }

    const userInfo: IUserInfo = {
        version: UserInfoVersion,
        aud: introspectionResult.aud!,
        sub: introspectionResult.sub!,
        email: introspectionResult.email as string | undefined,
        email_verified: introspectionResult.email_verified as
            | boolean
            | undefined,
        given_name: introspectionResult.given_name as string | undefined,
        family_name: introspectionResult.family_name as string | undefined,
        expire_at: introspectionResult.exp,
        roles: Object.keys(
            introspectionResult['urn:zitadel:iam:org:project:roles'] ?? {},
        ),
    };
    await saveSessionInRedis(
        environment.openId.projectId,
        accessToken,
        userInfo,
    );

    return true;
};

export const getPublicUserInfoFromSession = async (
    context: APIContext,
    accessToken: string | null = null,
) => {
    if (accessToken == null) {
        accessToken = await getAccessToken(context);
    }
    if (accessToken == null) return null;

    const cachedSession = await getSessionFromRedis(
        environment.openId.projectId,
        accessToken,
    );
    if (cachedSession != null) return ZPublicUserInfo.parse(cachedSession);

    const authServer = await getAuthorizationServer();
    if (authServer == null) return null;

    const apiClient = await getPortalApiAuthClient();
    const introspectionResponse = await oidc.introspectionRequest(
        authServer,
        apiClient,
        accessToken,
        {
            additionalParameters: {
                token_hint_type: 'access_token',
            },
        },
    );
    if (!introspectionResponse.ok) {
        return null;
    }

    const introspectionResult = await oidc.processIntrospectionResponse(
        authServer,
        apiClient,
        introspectionResponse,
    );
    if (oidc.isOAuth2Error(introspectionResult)) {
        return null;
    }

    if (introspectionResult.active == false) {
        const response = await refreshSession(context);
        if (response != null) return response;
        return await clearSession(context);
    }

    const userInfo: IUserInfo = {
        version: UserInfoVersion,
        aud: introspectionResult.aud!,
        sub: introspectionResult.sub!,
        email: introspectionResult.email as string | undefined,
        email_verified: introspectionResult.email_verified as
            | boolean
            | undefined,
        given_name: introspectionResult.given_name as string | undefined,
        family_name: introspectionResult.family_name as string | undefined,
        expire_at: introspectionResult.exp,
        roles: Object.keys(
            introspectionResult['urn:zitadel:iam:org:project:roles'] ?? {},
        ),
    };
    if (
        userInfo.expire_at != null &&
        Date.now() * 0.001 >= userInfo.expire_at
    ) {
        const response = await refreshSession(context);
        if (response != null) return response;
        return await clearSession(context);
    }

    await saveSessionInRedis(
        environment.openId.projectId,
        accessToken,
        userInfo,
    );

    return ZPublicUserInfo.parse(userInfo);
};
