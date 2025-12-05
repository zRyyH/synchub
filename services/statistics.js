import { directus } from '@/lib/directus';

export const statisticsService = {
    getStatistics: async () => {
        const params = directusToAxiosParams({
            limit: "1",
            sort: "-date_created"
        })

        const { data } = await directus.get(`/items/statistics`, { params });
        return data?.data
    },
};