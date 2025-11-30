import { directus } from '@/lib/directus';

export const userService = {
    getMe: async () => {
        const { data } = await directus.get(`/users/me`);
        return data?.data
    },
    updateGoal: async (data) => {
        const user = getMe()
        console.log("Hello", user)
        return await directus.patch(`/users/${user.id}`, data);
    },
};