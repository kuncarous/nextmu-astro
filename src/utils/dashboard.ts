import type { IPublicUserInfo } from '~/providers/auth/types';

const DashboardRoles = /^(?:(update\:.*))$/;

export function hasDashboardRoles(user: IPublicUserInfo | null) {
    if (user == null) return false;
    for (const role of user.roles) {
        const found = DashboardRoles.test(role);
        if (found) return true;
    }
    return false;
}
