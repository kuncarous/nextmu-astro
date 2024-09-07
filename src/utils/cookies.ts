import type {
    AstroCookieGetOptions,
    AstroCookies,
    AstroCookieSetOptions,
} from 'astro';
import * as crypto from 'crypto';
import { environment } from '~/consts/environment';

const cipherAlgorithm = 'aes-256-gcm';
const cipherIVLength = 12; // it is recommended 12 bytes for GCM and 16 bytes for CBC
const cipherAuthTagLength = 16; // GCM only
const cipherUseAuthTag = cipherAlgorithm.endsWith('-gcm');

export interface CookieStorage<
    Data extends Record<string, any> = Record<string, any>,
> {
    get: (cookies: AstroCookies) => Promise<Data | null>;
    set: (data: Data, cookies: AstroCookies) => Promise<void>;
    delete: (cookies: AstroCookies) => Promise<void>;
}

const encodeData = <Data extends Record<string, any>>(data: Data) => {
    try {
        return Buffer.from(JSON.stringify(data), 'utf-8').toString('base64url');
    } catch (error) {
        return null;
    }
};

const decodeData = <Data extends Record<string, any>>(data: string) => {
    try {
        return <Data>(
            JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'))
        );
    } catch (error) {
        return null;
    }
};

const encryptCookie = async <Data extends Record<string, any>>(
    data: Data,
    secret: string,
): Promise<string | null> => {
    try {
        const encoded = Buffer.from(JSON.stringify(data), 'utf-8').toString(
            'base64url',
        );
        if (!encoded) return null;
        const iv = crypto.randomBytes(cipherIVLength);
        const cipher = crypto.createCipheriv(
            cipherAlgorithm,
            secret,
            iv,
            cipherUseAuthTag
                ? { authTagLength: cipherAuthTagLength }
                : undefined,
        );
        const encrypted = cipherUseAuthTag
            ? Buffer.concat([
                  iv,
                  cipher.getAuthTag(),
                  cipher.update(encoded),
                  cipher.final(),
              ])
            : Buffer.concat([iv, cipher.update(encoded), cipher.final()]);
        return encrypted.toString('base64url');
    } catch (error) {
        return null;
    }
};

const decryptCookie = async <Data extends Record<string, any>>(
    data: string,
    secret: string,
): Promise<Data | null> => {
    try {
        const buffer = Buffer.from(data, 'base64url');
        const bufferStartIndex = cipherUseAuthTag
            ? cipherIVLength + cipherAuthTagLength
            : cipherIVLength;
        const [iv, tag, encrypted] = [
            buffer.subarray(0, cipherIVLength),
            cipherUseAuthTag
                ? buffer.subarray(cipherIVLength, bufferStartIndex)
                : null,
            buffer.subarray(bufferStartIndex),
        ];
        const decipher = crypto.createDecipheriv(
            cipherAlgorithm,
            secret,
            iv,
            cipherUseAuthTag
                ? { authTagLength: cipherAuthTagLength }
                : undefined,
        );
        if (cipherUseAuthTag) decipher.setAuthTag(tag!);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final(),
        ]).toString();
        return JSON.parse(
            Buffer.from(decrypted, 'base64url').toString('utf-8'),
        );
    } catch (error) {
        return null;
    }
};

type CreateCookiStorageOptions = AstroCookieSetOptions &
    AstroCookieGetOptions & {
        name: string;
        secrets?: string[];
    };
export const createCookieStorage = <
    Data extends Record<string, any> = Record<string, any>,
>({
    name,
    secrets,
    decode,
    ...options
}: CreateCookiStorageOptions): CookieStorage<Data> => {
    secrets ??= [];

    return {
        get: async (cookies) => {
            const cookie = cookies.get(name, { decode });
            if (cookie == null) return null;
            if (secrets.length === 0) return decodeData(cookie.value);
            for (const secret of secrets) {
                const data = await decryptCookie(cookie.value, secret);
                if (data != null) return data as Data;
            }
            return null;
        },
        set: async (data, cookies) => {
            const encoded =
                secrets.length > 0
                    ? await encryptCookie(data, secrets[0])
                    : encodeData(data);
            if (encoded == null) return;
            cookies.set(name, encoded, options);
        },
        delete: async (cookies) => {
            cookies.delete(name, options);
        },
    };
};
