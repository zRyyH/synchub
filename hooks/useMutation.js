"use client";

import { useMutation as useMutationApi, useQueryClient } from '@tanstack/react-query';
import { useNotification } from "@/hooks/useNotification";
import { useRouter } from 'next/navigation';

export function useMutation(service, options = {}) {
    const { title, msg, redirect, invalidateQueryKey } = options;

    const { success, error } = useNotification();
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutationApi({
        mutationFn: async (...params) => service(...params),
        onSuccess: () => {
            if (title && msg) success(title, msg);
            if (redirect) router.push(redirect);
            if (invalidateQueryKey) queryClient.invalidateQueries([invalidateQueryKey]);
        },
        onError: (e) => {
            error(title, "Ops... ocorreu um erro :(");
        },
    });

    return { mutate: (...params) => mutation.mutateAsync(...params), ...mutation };
}