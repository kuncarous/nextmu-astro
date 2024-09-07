import type { StatusCodes } from 'http-status-codes';

export function json<Data>(data: Data, init: StatusCodes | ResponseInit = {}) {
    const responseInit = typeof init === 'number' ? { status: init } : init;

    const headers = new Headers(responseInit.headers);
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    return new Response(JSON.stringify(data), {
        ...responseInit,
        headers,
    });
}
