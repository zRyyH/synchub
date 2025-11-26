"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, cloneElement } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useRouter, useParams } from "next/navigation";

export default function FormManager({
    children,
    queryKey,
    queryFn,
    createFn,
    updateFn,
    redirectTo,
    initialData = {},
    onSuccess,
    messages = {
        createSuccess: "Item criado com sucesso",
        updateSuccess: "Item atualizado com sucesso",
        createError: "Erro ao criar item",
        updateError: "Erro ao atualizar item",
    },
}) {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { success, error } = useNotification();

    const [formData, setFormData] = useState(initialData);
    const isEditMode = Boolean(params.id);

    // Fetch data para modo de edição
    const { data: fetchedData, isLoading: isLoadingData } = useQuery({
        queryKey: [queryKey, params.id],
        queryFn: () => queryFn(params.id),
        enabled: isEditMode && !!queryFn,
    });

    // Atualiza formData quando buscar dados
    useEffect(() => {
        if (fetchedData) {
            setFormData(fetchedData);
        }
    }, [fetchedData]);

    // Handlers de sucesso e erro
    const handleMutationSuccess = (data, successMessage) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        success("Sucesso", successMessage);
        onSuccess?.(data);

        if (redirectTo) {
            router.push(redirectTo);
        }
    };

    const handleMutationError = (err, errorMessage) => {
        const message = err?.message || errorMessage;
        error("Erro", message);
    };

    // Mutation para criar
    const createMutation = useMutation({
        mutationFn: (data) => createFn(data),
        onSuccess: (data) => handleMutationSuccess(data, messages.createSuccess),
        onError: (err) => handleMutationError(err, messages.createError),
    });

    // Mutation para atualizar
    const updateMutation = useMutation({
        mutationFn: (data) => updateFn(params.id, data),
        onSuccess: (data) => handleMutationSuccess(data, messages.updateSuccess),
        onError: (err) => handleMutationError(err, messages.updateError),
    });

    // Handlers do formulário
    const handleSubmit = (e) => {
        e?.preventDefault();
        const mutation = isEditMode ? updateMutation : createMutation;
        mutation.mutate(formData);
    };

    const handleCancel = () => {
        if (redirectTo) {
            router.push(redirectTo);
        }
    };

    // Props injetadas no children
    const childProps = {
        formData,
        setFormData,
        onSubmit: handleSubmit,
        onCancel: handleCancel,
        loading: isLoadingData || createMutation.isPending || updateMutation.isPending,
        mode: isEditMode ? "edit" : "create",
        error: createMutation.error || updateMutation.error,
    };

    return cloneElement(children, childProps);
}