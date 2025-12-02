"use client";

import { statisticsService } from "@/services/statistics";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Send, Target } from "lucide-react";
import { useQuery } from '@tanstack/react-query';

export function StatisticsSection() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['statistics'],
        queryFn: statisticsService.getStatistics,
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Aprovados */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1 flex-1">
                            <p className="text-sm text-gray-400">Aprovados</p>
                            <p className="text-4xl font-bold text-white">{data?.[0]?.approved}</p>
                            <p className="text-xs text-gray-500">Envios aprovados</p>
                        </div>
                        <Music className="size-5 text-gray-500" />
                    </div>
                </CardContent>
            </Card>

            {/* Aceitos */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1 flex-1">
                            <p className="text-sm text-gray-400">Aceitos</p>
                            <p className="text-4xl font-bold text-white">{data?.[0]?.accepted_pitches}</p>
                            <p className="text-xs text-gray-500">Envios aceitos</p>
                        </div>
                        <Send className="size-5 text-gray-500" />
                    </div>
                </CardContent>
            </Card>

            {/* Recusados */}
            <Card className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1 flex-1">
                            <p className="text-sm text-gray-400">Recusados</p>
                            <p className="text-4xl font-bold text-white">{data?.[0]?.refused}</p>
                            <p className="text-xs text-gray-500">Envios recusados</p>
                        </div>
                        <Target className="size-5 text-gray-500" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}