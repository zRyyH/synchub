import { directus } from '@/lib/directus';

export const statisticsService = {
    getStatistics: async () => {
        const { data } = await directus.get(`/items/statistics`);
        console.log(data)
        return data?.data
    },
};