import { directus } from '@/lib/directus';

export const synchubService = {
    getSyncHub: async () => {
        const { data } = await directus.get(`/items/synchub`);
        return data?.data
    },
};