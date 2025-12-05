"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Percent, CheckCircle2, XCircle, Clock } from "lucide-react";

export function StatisticsResults() {
    return (
        <Card className="bg-[#18181b] border-gray-800">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-white">Resultados Registrados</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                    Status dos envios no período.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-6 flex flex-col items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mb-3" />
                        <h4 className="text-3xl font-bold text-white mb-1">0</h4>
                        <p className="text-gray-400 text-sm">Aprovados</p>
                    </div>

                    <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-6 flex flex-col items-center justify-center">
                        <XCircle className="w-8 h-8 text-red-500 mb-3" />
                        <h4 className="text-3xl font-bold text-white mb-1">0</h4>
                        <p className="text-gray-400 text-sm">Recusados</p>
                    </div>

                    <div className="bg-yellow-950/30 border border-yellow-900/50 rounded-lg p-6 flex flex-col items-center justify-center">
                        <Clock className="w-8 h-8 text-yellow-500 mb-3" />
                        <h4 className="text-3xl font-bold text-white mb-1">0</h4>
                        <p className="text-gray-400 text-sm">Em análise</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}