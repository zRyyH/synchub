import { directus } from '@/lib/directus';

export const catalogService = {
    getCatalog: async () => {
        const { data } = await directus.get(`/items/catalog`);
        return data?.data
    },
    deleteCatalog: async (id) => {
        const { data } = await directus.delete(`/items/catalog/${id}`);
        return data?.data
    },
    createCatalog: async (catalogData) => {
        const { data } = await directus.post(`/items/catalog`, catalogData);
        return data?.data
    },
    updateCatalog: async (id, catalogData) => {
        const { data } = await directus.patch(`/items/catalog/${id}`, catalogData);
        return data?.data
    },
};