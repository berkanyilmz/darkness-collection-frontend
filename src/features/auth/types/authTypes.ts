import { UserDto } from "@/features/Users/types/users";

export interface AuthRegister {
    name: string;
    surname: string;
    phoneNumber?: string; // Telefon alanını opsiyonel
    email: string;
    password: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface AuthState {
    user: UserDto | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}