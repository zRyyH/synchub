"use client";

import FormManager from "@/components/forms/FormManager";
import LoginForm from "@/components/forms/LoginForm";
import { authService } from "@/services/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-[#18181b] to-[#0f0f11]">
      <FormManager
        queryKey="auth"
        createFn={authService.login}
        redirectTo="/dashboard"
      >
        <LoginForm
          onForgotPassword={() => { }}
          onSignUp={() => { }}
          onGoogleSignIn={() => { }}
        />
      </FormManager>
    </div>
  );
}