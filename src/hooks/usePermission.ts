import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const usePermission = () => {
    const { user, isAuthenticated} = useSelector((state: RootState) => state.auth)

    const allowedPages = user?.allowedPages || [];
    const allowedMenus = user?.allowedMenus || [];
    const role = user?.role || '';

    const canAccess = (pathname: string): boolean => {
        if (pathname === '/dashboard' || pathname === '/403') {
            return true;
        }
        return allowedPages.some((allowedPath) => pathname.startsWith(allowedPath));
    }

    const hasRole = (role: string): boolean => {
        if (!role) return false;
        return role.toLocaleLowerCase() === role.toLocaleLowerCase();
    };

    return {
        user,
        role,
        isAuthenticated,
        allowedPages,
        allowedMenus,
        canAccess,
        hasRole,
        isAdmin: role.toLocaleLowerCase() === 'admin',
    };
}