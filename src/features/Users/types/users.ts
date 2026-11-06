import { MenuItemDto } from "@/features/menu/types/type";

export interface UserDto {
    id?: number;
    userFirstName: string;
    userLastName: string;
    userPhoneNumber?: string;
    userEmail: string;
    deleted: boolean;
    createdAt?: string;
    role: string;
    allowedPages: string[]; // Kullanıcının erişebileceği sayfaların listesi
    allowedMenus: MenuItemDto[]; // Sol menüyü dinamik getirmek için
}