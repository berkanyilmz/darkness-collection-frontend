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