import { directus as directus_api } from '@/config/directus';
import { setupInterceptors } from '@/interceptors/setup';

setupInterceptors();

export const directus = {
    get: (url, config = {}) => {
        try {
            return directus_api.get(url, config)
        } catch (e) {
            throw new Error(`Error GET: ${e}`);
        }
    },

    post: (url, data = {}, config = {}) => {
        try {
            return directus_api.post(url, data, config);
        } catch (e) {
            throw new Error(`Error POST: ${e}`);
        }
    },

    put: (url, data = {}, config = {}) => {
        try {
            return directus_api.put(url, data, config);
        } catch (e) {
            throw new Error(`Error PUT: ${e}`);
        }
    },

    patch: (url, data = {}, config = {}) => {
        try {
            return directus_api.patch(url, data, config);
        } catch (e) {
            throw new Error(`Error PATCH: ${e}`);
        }
    },

    delete: (url, config = {}) => {
        try {
            return directus_api.delete(url, config);
        } catch (e) {
            throw new Error(`Error DELETE: ${e}`);
        }
    },
};