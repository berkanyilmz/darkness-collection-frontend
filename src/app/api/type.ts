export interface RefreshTokenResponse {
    accessToken: string;
}

export interface ApiResponse<T> {
    result: boolean;
    errorMessage: string | null;
    data: T;
}