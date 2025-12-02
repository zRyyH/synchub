import { directusToAxiosParams } from "@/utils/serviceUtils";
import { directus } from '@/lib/directus';

export const pitcheService = {
    getPitche: async () => {
        const params = directusToAxiosParams({
            fields: ['*.*']
        })

        const { data } = await directus.get(`/items/pitches`, { params });
        return data?.data
    },
    deletePitche: async (id) => {
        const { data } = await directus.delete(`/items/pitches/${id}`);
        return data?.data
    },
    createPitche: async (pitcheData) => {
        const { data } = await directus.post(`/items/pitches`, pitcheData);
        return data?.data
    },
    updatePitche: async (id, pitcheData) => {
        const { data } = await directus.patch(`/items/pitches/${id}`, pitcheData);
        return data?.data
    },
};