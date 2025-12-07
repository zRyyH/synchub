import { NEXT_PUBLIC_URL } from "@/config/next";
import { directus } from '@/config/directus';

export const portfolioService = {
    getCatalogs: async (id) => {
        const response = await directus.get(`/items/catalog?filter[user_created][_eq]=${id}`);

        const result = response.data.data.map((item) => {
            return {
                ...item,
                audio_file: `${NEXT_PUBLIC_URL}/assets/${item.audio_file}`
            }
        })

        console.log(result)
        return result;
    },
};