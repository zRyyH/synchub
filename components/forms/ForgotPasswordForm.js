"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MusicIcon, ArrowLeftIcon } from "lucide-react";

export default function ForgotPasswordForm({
    formData = {},
    setFormData,
    onSubmit,
    loading = false,
    onBackToLogin
}) {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 animate-fadeSlideIn">
            <CardHeader className="space-y-6 pb-8">
                <div className="flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-zinc-800">
                        <MusicIcon className="size-8 text-yellow-500" strokeWidth={2} />
                    </div>
                </div>
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        Recuperar Senha
                    </h1>
                    <CardDescription className="text-zinc-400">
                        Digite seu email para receber o link de recuperação
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-white">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            className="h-11 border-zinc-800 bg-zinc-50 text-zinc-900 placeholder:text-zinc-500"
                            value={formData.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="h-11 w-full bg-yellow-500 text-zinc-900 hover:bg-yellow-600 font-medium"
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Enviar Link de Recuperação"}
                    </Button>
                </form>
            </CardContent>

            {onBackToLogin && (
                <CardFooter className="flex justify-center pb-8">
                    <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-sm font-medium text-yellow-500 hover:text-yellow-400 flex items-center gap-2"
                        onClick={onBackToLogin}
                        disabled={loading}
                    >
                        <ArrowLeftIcon className="size-4" />
                        Voltar para o login
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}