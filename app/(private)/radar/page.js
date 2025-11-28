"use client";

import { Music2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OpportunityCard } from "@/components/common/Opportunity";
import { Card } from "@/components/ui/card";

export default function Radar() {
    return (
        <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Radar de Oportunidades
                </h1>
                <Alert className="bg-transparent border-none p-0 max-w-3xl">
                    <AlertDescription className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-yellow-500 text-lg">⚠️</span>
                        <span>
                            **Atualizado semanalmente:** aqui você só encontra **oportunidades reais e
                            ativas**. As vagas vencidas são removidas automaticamente, para que você foque
                            apenas no que pode enviar agora. Use os botões verdes{" "}
                            <span className="text-emerald-500 font-semibold">Ver oportunidade</span> para
                            acessar direto a página oficial.
                        </span>
                    </AlertDescription>
                </Alert>
            </div>

            <div className="grid grid-cols-3 gap-12">

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />
            </div>

            {/* Empty State Card */}
            <Card className="bg-[#18181b] border-gray-800 p-16">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6 text-gray-500">
                        <Music2 className="h-20 w-20 mx-auto" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-400 mb-3">
                        Nenhuma oportunidade encontrada
                    </h2>

                    <p className="text-gray-500 max-w-md">
                        Adicione briefings e oportunidades que você encontrar para organizar seus envios.
                    </p>
                </div>
            </Card>
        </div>
    );
}