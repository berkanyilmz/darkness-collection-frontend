import { UserDto } from "@/features/Users/types/users";

export interface AuthRegister {
    firstName: string;
    lastName: string;
    phoneNumber: string;
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