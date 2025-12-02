import { directus } from '@/lib/directus';

export const userService = {
    getMe: async () => {
        const { data } = await directus.get(`/users/me`);
        return data?.data
    },
    updateGoal: async ({ id, goal }) => {
        return await directus.patch(`/users/${id}`, { goal });
    },
};