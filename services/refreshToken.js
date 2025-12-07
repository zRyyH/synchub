import { DIRECTUS_BASE_URL } from '@/config/directus';
import { tokenStorage } from '@/utils/tokenStorage';
import axios from 'axios';

export const refreshTokenService = async () => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await axios.post(`${DIRECTUS_BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    tokenStorage.setTokens(access_token, newRefreshToken);

    return access_token;
};