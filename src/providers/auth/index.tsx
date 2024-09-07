import type { IPublicUserInfo } from './types';
import { map } from 'nanostores';

export const $profile = map<{
    profile: IPublicUserInfo | null;
}>({
    profile: null,
});
