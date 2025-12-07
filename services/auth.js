import { tokenStorage } from '@/utils/tokenStorage';
import { NEXT_PUBLIC_URL } from "@/config/next";
import { directus } from '@/config/directus';

export const authService = {
    login: async (credentials) => {
        const response = await directus.post('/auth/login', credentials);
        const { access_token, refresh_token } = response.data.data;
        tokenStorage.setTokens(access_token, refresh_token);
        return response;
    },

    forgotPassword: async (email) => {
        return await directus.post('/auth/password/request', { email, reset_url: `${NEXT_PUBLIC_URL}/reset-password` });
    },

    resetPassword: async (password, token) => {
        return await directus.post('/auth/password/reset', { token, password });
    },

    logout: () => {
        tokenStorage.clearTokens();
    }
};