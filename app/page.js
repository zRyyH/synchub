"use client";

import FormManager from "@/components/forms/FormManager";
import SyncHubLoginForm from "@/components/forms/LoginForm";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (credentials) => {
    const response = await authService.login(credentials);
    return response.data;
  };

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-[#18181b] to-[#0f0f11]">
      <div className="w-full max-w-md">
        <FormManager
          queryKey="login"
          createFn={handleLogin}
          onSuccess={handleSuccess}
          initialData={{ email: "", password: "" }}
          messages={{
            createSuccess: "Login realizado com sucesso!",
            createError: "Email ou senha inválidos",
          }}
        >
          <SyncHubLoginForm onForgotPassword={handleForgotPassword} />
        </FormManager>
      </div>
    </div>
  );
}