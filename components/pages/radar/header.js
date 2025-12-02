"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";

export function HeaderRadar() {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
                Radar de Oportunidades
            </h1>
            <Alert className="bg-transparent border-none p-0 max-w-3xl">
                <AlertDescription className="text-gray-400 text-sm flex items-start gap-2">
                    <span>
                        Atualizado semanalmente: aqui você só encontra oportunidades reais e
                        ativas. As vagas vencidas são removidas automaticamente, para que você foque
                        apenas no que pode enviar agora. Use os botões verdes{" "}
                        <span className="text-emerald-500 font-semibold">Ver oportunidade</span> para
                        acessar direto a página oficial.
                    </span>
                </AlertDescription>
            </Alert>
        </div>
    );
}