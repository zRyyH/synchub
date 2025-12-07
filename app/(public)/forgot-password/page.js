"use client";

import FormManager from "@/components/forms/FormManager";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const router = useRouter();

    const handleBackToLogin = () => {
        router.push("/");
    };

    const handleSuccess = () => {
        // Você pode redirecionar ou mostrar uma mensagem
        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-[#18181b] to-[#0f0f11]">
            <FormManager
                queryKey="forgot-password"
                createFn={(data) => authService.forgotPassword(data.email)}
                redirectTo="/"
                initialData={{ email: "" }}
                onSuccess={handleSuccess}
                messages={{
                    createSuccess: "Link de recuperação enviado com sucesso! Verifique seu email.",
                    createError: "Erro ao enviar email de recuperação. Tente novamente.",
                }}
            >
                <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
            </FormManager>
        </div>
    );
}