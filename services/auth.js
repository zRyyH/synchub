import { tokenStorage } from '@/utils/tokenStorage';
import { directus } from '@/config/directus';
import { express } from "@/config/express";

export const authService = {
    login: async (credentials) => {
        const response = await directus.post('/auth/login', credentials);

        console.log("Codigos chegando:", response.data.data)

        const { access_token, refresh_token } = response.data.data;

        tokenStorage.setTokens(access_token, refresh_token);

        return response.data;
    },

    register: async (credentials) => {
        const response = await express.post('/users/login', credentials);

        console.log(response)

        return response.data;
    },

    verifyEmail: async (credentials) => {
        const response = await express.get('/users', credentials);

        console.log(response)

        return response.data;
    },

    logout: () => {
        tokenStorage.clearTokens();
    }
};