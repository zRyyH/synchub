"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SectionHeader({
    title = "Estatísticas Avançadas",
    description = "Analise seu desempenho com métricas detalhadas sobre envios, resultados e engajamento.",
    buttonText,
    onButtonClick,
    className
}) {
    return (
        <Card className={`bg-[#0f0f11] border-[#18181b] ${className}`}>
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-white">
                    {title}
                </CardTitle>
                <CardDescription className="text-gray-400">
                    {description}
                </CardDescription>
                {buttonText && onButtonClick && (
                    <CardAction>
                        <Button
                            onClick={onButtonClick}
                            className="bg-yellow-500 text-[#18181b] hover:bg-yellow-500/90 font-semibold"
                        >
                            {buttonText}
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
        </Card>
    );
}