"use client";

import { StatisticsInsights } from "@/components/pages/statistics/insights";
import { StatisticsMetrics } from "@/components/pages/statistics/metrics";
import { StatisticsResults } from "@/components/pages/statistics/results";
import { Music, Send, Target, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/common/Header";
import { statisticsService } from "@/services/statistics";
import { useQuery } from "@tanstack/react-query";

export default function Statistics() {
    const { data: statistics, isLoading } = useQuery({
        queryKey: ["statistics"],
        queryFn: statisticsService.getStatistics
    });

    const stats = statistics?.[0] || {};

    const metrics = [
        {
            label: "Total de Músicas Enviadas",
            value: stats.all_send_musics || "0",
            subtitle: "Desde o início",
            icon: Music
        },
        {
            label: "Envios no Período",
            value: stats.send_mounth || "0",
            icon: Send
        },
        {
            label: "Taxa de Participação",
            value: stats.participation_fee ? `${stats.participation_fee}%` : "0%",
            subtitle: "Oportunidades aproveitadas",
            icon: Target
        },
        {
            label: "Pitches Aceitos",
            value: stats.accepted_pitches || "0",
            subtitle: "No período selecionado",
            icon: TrendingUp
        }
    ];

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="gap-4 flex flex-col">
            <SectionHeader
                title="Estatísticas Avançadas"
                description="Veja suas métricas"
            />

            <StatisticsMetrics metrics={metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <StatisticsResults
                    title="Pedidos do Mês"
                    description="Análise de pedidos de novembro"
                    approved={parseInt(stats.approved) || 0}
                    rejected={parseInt(stats.refused) || 0}
                    pending={parseInt(stats.under_review) || 0}
                />

                <StatisticsInsights
                    insights={
                        stats.automatic_insights
                            ? [stats.automatic_insights]
                            : ["Continue registrando seus envios para receber insights valiosos e acompanhar seu progresso."]
                    }
                />
            </div>
        </div>
    );
}