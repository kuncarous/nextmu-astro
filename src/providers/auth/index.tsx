import type { IPublicUserInfo } from './types';
import { persistentAtom } from '@nanostores/persistent';

export const $profile = persistentAtom<IPublicUserInfo | null>(
    'profile',
    null,
    {
        encode: JSON.stringify,
        decode: JSON.parse,
    },
);
