"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Send, Target, TrendingUp, PieChart, Calendar, Percent, Lightbulb, CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";

export default function Statistics() {
    return (
        <div className="gap-4 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Estatísticas Avançadas</h1>
                    <p className="text-gray-400 text-sm">
                        Analise seu desempenho com métricas detalhadas sobre envios, resultados e engajamento.
                    </p>
                </div>
            </div>

            {/* Cards de Métricas */}
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

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="bg-[#18181b] border-gray-800">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-yellow-500" />
                            <CardTitle className="text-white">Distribuição por Uso</CardTitle>
                        </div>
                        <CardDescription className="text-gray-400">
                            Envios no período por tipo de oportunidade.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        <p className="text-gray-500">Nenhum dado para exibir.</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#18181b] border-gray-800">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-yellow-500" />
                            <CardTitle className="text-white">Linha do Tempo de Envios</CardTitle>
                        </div>
                        <CardDescription className="text-gray-400">
                            Seus envios mais recentes no período selecionado.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        <p className="text-gray-500">Nenhum envio no período selecionado.</p>
                    </CardContent>
                </Card>
            </div>

            {/* Resultados e Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            </div>
        </div>
    );
}