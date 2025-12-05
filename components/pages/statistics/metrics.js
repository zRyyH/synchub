"use client";

import { Music, Send, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatisticsMetrics() {
    return (
        <div className="gap-4 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#18181b] border-gray-800">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-2">Total de Músicas Enviadas</p>
                                <h3 className="text-4xl font-bold text-white mb-1">1</h3>
                                <p className="text-gray-500 text-xs">Desde o início</p>
                            </div>
                            <div className="bg-[#0f0f11] p-2 rounded-lg">
                                <Music className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181b] border-gray-800">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-2">Envios no Período</p>
                                <h3 className="text-4xl font-bold text-white mb-1">0</h3>
                            </div>
                            <div className="bg-[#0f0f11] p-2 rounded-lg">
                                <Send className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181b] border-gray-800">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-2">Taxa de Participação</p>
                                <h3 className="text-4xl font-bold text-white mb-1">0%</h3>
                                <p className="text-gray-500 text-xs">Oportunidades aproveitadas</p>
                            </div>
                            <div className="bg-[#0f0f11] p-2 rounded-lg">
                                <Target className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181b] border-gray-800">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-2">Pitches Aceitos</p>
                                <h3 className="text-4xl font-bold text-white mb-1">0</h3>
                                <p className="text-gray-500 text-xs">No período selecionado</p>
                            </div>
                            <div className="bg-[#0f0f11] p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}