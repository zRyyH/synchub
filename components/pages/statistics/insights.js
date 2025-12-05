"use client";

import { Lightbulb, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function StatisticsInsights() {
    return (
        <Card className="bg-[#18181b] border-gray-800">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-white">Insights Automáticos</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                    Dicas com base na sua atividade recente.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-[#0f0f11] border border-gray-800 rounded-lg p-4 flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Continue registrando seus envios para receber insights valiosos e acompanhar seu progresso.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}