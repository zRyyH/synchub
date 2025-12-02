import { directus } from '@/lib/directus';

export const photosService = {
    upload: async (file) => {

        const formData = new FormData();
        formData.append('file', file);

        const { data } = await directus.post(`/files`, formData);

        return data.data.id
    }
};