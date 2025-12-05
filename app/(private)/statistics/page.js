"use client";

import { StatisticsInsights } from "@/components/pages/statistics/insights";
import { StatisticsMetrics } from "@/components/pages/statistics/metrics";
import { StatisticsResults } from "@/components/pages/statistics/results";
import { StatisticsHeader } from "@/components/pages/statistics/header";

export default function Statistics() {
    return (
        <div className="gap-4 flex flex-col">
            <StatisticsHeader />
            <StatisticsMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <StatisticsResults />
                <StatisticsInsights
                    insights={[
                        "Continue registrando seus envios para receber insights valiosos e acompanhar seu progresso."
                    ]}
                />
            </div>
        </div>
    );
}