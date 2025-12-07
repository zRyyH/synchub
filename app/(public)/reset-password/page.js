"use client";

import FormManager from "@/components/forms/FormManager";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { authService } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleBackToLogin = () => {
        router.push("/");
    };

    const handleSuccess = () => {
        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    const handleResetPassword = async (data) => {
        if (data.password !== data.confirmPassword) {
            throw new Error("As senhas não coincidem");
        }

        if (!token) {
            throw new Error("Token inválido ou expirado");
        }

        return await authService.resetPassword(data.password, token);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-[#18181b] to-[#0f0f11]">
            <FormManager
                queryKey="reset-password"
                createFn={handleResetPassword}
                redirectTo="/"
                initialData={{ password: "", confirmPassword: "" }}
                onSuccess={handleSuccess}
                messages={{
                    createSuccess: "Senha redefinida com sucesso! Faça login com sua nova senha.",
                    createError: "Erro ao redefinir senha. O token pode estar expirado.",
                }}
            >
                <ResetPasswordForm onBackToLogin={handleBackToLogin} />
            </FormManager>
        </div>
    );
}
