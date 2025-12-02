import { directus } from '@/lib/directus';

export const opportunityService = {
    getOpportunity: async () => {
        const { data } = await directus.get(`/items/opportunities`);
        return data?.data
    },
    deleteOpportunity: async (id) => {
        const { data } = await directus.delete(`/items/opportunities/${id}`);
        return data?.data
    },
    createOpportunity: async (opportunityData) => {
        const { data } = await directus.post(`/items/opportunities`, opportunityData);
        return data?.data
    },
    updateOpportunity: async (id, opportunityData) => {
        const { data } = await directus.patch(`/items/opportunities/${id}`, opportunityData);
        return data?.data
    },
};