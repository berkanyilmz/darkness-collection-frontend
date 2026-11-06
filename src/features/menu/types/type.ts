export interface MenuItemDto {
    id: number;
    title: string;
    path: string;
    icon?: string;
    sortOrder: number;
    requiredRoles?: string;
    active: boolean;
}