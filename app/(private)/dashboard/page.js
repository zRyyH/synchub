"use client";

import { PlayCircle, Headphones, DollarSign, Lightbulb, ExternalLink, Music, Send, Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { userService } from "@/services/user";


export default function Dashboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getMe(),
    })

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fadeSlideIn">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-4xl text-white font-bold">Olá, { }!</h1>
                <p className="text-gray-400">
                    Este é o seu centro de comando. Visualize suas estatísticas, gerencie suas músicas
                    e encontre novas oportunidades.
                </p>
            </div>

            {/* Card de Ajuda */}
            <Card className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-[#2a2a4e]">
                <CardHeader>
                    <div className="flex items-start gap-3">
                        <PlayCircle className="size-5 text-blue-400 mt-0.5" />
                        <div className="space-y-2 flex-1">
                            <CardTitle className="text-xl font-semibold text-white">
                                Ajuda: Como funciona essa ferramenta
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                                Assista ao vídeo explicativo e aprenda a usar todas as funcionalidades do SyncHub.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <PlayCircle className="size-4 mr-2" />
                        Assistir Vídeo Explicativo
                    </Button>
                </CardContent>
            </Card>

            {/* Card de Mentoria */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] border-[#333333]">
                <CardHeader>
                    <div className="flex items-start gap-3">
                        <Headphones className="size-5 text-yellow-500 mt-0.5" />
                        <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-xl font-semibold text-white">
                                    Mentoria Rápida com IA
                                </CardTitle>
                                <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
                                    🔥 NOVO
                                </Badge>
                            </div>
                            <CardDescription className="text-gray-300">
                                Receba feedback instantâneo sobre o potencial de sua música.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">
                        Nossa curadoria inteligente analisa sua faixa em segundos, oferecendo insights sobre melodia,
                        arranjo, mixagem e potencial comercial.
                    </p>
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                        Analisar minha música
                        <span className="ml-2">→</span>
                    </Button>
                </CardContent>
            </Card>

            {/* Card de Meta Financeira */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] border-[#333333] relative">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <DollarSign className="size-5 text-yellow-500 mt-0.5" />
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-semibold text-white">
                                    Sua Meta Financeira Mensal
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Defina um objetivo para guiar seus esforços e acompanhar seu progresso.
                                </CardDescription>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <ExternalLink className="size-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-5xl font-bold text-yellow-500">
                        {"R$ 0,00"}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-2">
                            <Lightbulb className="size-5 text-yellow-500 mt-0.5 shrink-0" />
                            <p className="text-white font-semibold">Dicas para alcançar sua meta:</p>
                        </div>
                        <ul className="space-y-2 text-gray-300 text-sm ml-7">
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500">•</span>
                                <span>Adicione mais músicas ao seu catálogo para aumentar as chances de licenciamento.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500">•</span>
                                <span>Use o Radar de Oportunidades diariamente para não perder nenhum briefing.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-500">•</span>
                                <span>Crie um portfólio público e compartilhe seu trabalho com supervisores musicais.</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Músicas no Catálogo */}
                <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-1 flex-1">
                                <p className="text-sm text-gray-400">Músicas no Catálogo</p>
                                <p className="text-4xl font-bold text-white">0</p>
                                <p className="text-xs text-gray-500">Total de faixas gerenciadas</p>
                            </div>
                            <Music className="size-5 text-gray-500" />
                        </div>
                    </CardContent>
                </Card>

                {/* Pitches Enviados */}
                <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-1 flex-1">
                                <p className="text-sm text-gray-400">Pitches Enviados</p>
                                <p className="text-4xl font-bold text-white">0</p>
                                <p className="text-xs text-gray-500">Total de propostas enviadas</p>
                            </div>
                            <Send className="size-5 text-gray-500" />
                        </div>
                    </CardContent>
                </Card>

                {/* Oportunidades Pessoais */}
                <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-1 flex-1">
                                <p className="text-sm text-gray-400">Oportunidades Pessoais</p>
                                <p className="text-4xl font-bold text-white">0</p>
                                <p className="text-xs text-gray-500">Oportunidades salvas no seu radar</p>
                            </div>
                            <Target className="size-5 text-gray-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 border-0">
                <CardContent className="py-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-black">
                            Pronto para o próximo hit?
                        </h2>
                        <p className="text-black/80 text-base">
                            Adicione uma nova música ao seu catálogo e prepare-se para as melhores oportunidades de sync.
                        </p>
                        <Button
                            className="bg-black hover:bg-black/90 text-white font-semibold"
                            size="lg"
                        >
                            Ir para o Catálogo
                            <ArrowRight className="size-4 ml-2" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}