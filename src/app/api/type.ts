export interface RefreshTokenResponse {
    data: {
        accessToken: string;
        accessTokenExpiration: string;
    };
    message?: string;
    success: boolean;
}