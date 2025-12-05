"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Percent, CheckCircle2, XCircle, Clock } from "lucide-react";

const STAT_VARIANTS = {
    approved: {
        icon: CheckCircle2,
        bgClass: "bg-green-950/30",
        borderClass: "border-green-900/50",
        iconClass: "text-green-500",
        label: "Aprovados"
    },
    rejected: {
        icon: XCircle,
        bgClass: "bg-red-950/30",
        borderClass: "border-red-900/50",
        iconClass: "text-red-500",
        label: "Recusados"
    },
    pending: {
        icon: Clock,
        bgClass: "bg-yellow-950/30",
        borderClass: "border-yellow-900/50",
        iconClass: "text-yellow-500",
        label: "Em análise"
    }
};

function StatItem({ type, value }) {
    const config = STAT_VARIANTS[type];
    const Icon = config.icon;

    return (
        <div className={`${config.bgClass} border ${config.borderClass} rounded-lg p-6 flex flex-col items-center justify-center`}>
            <Icon className={`w-8 h-8 ${config.iconClass} mb-3`} />
            <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
            <p className="text-gray-400 text-sm">{config.label}</p>
        </div>
    );
}

export function StatisticsResults({
    title = "Resultados Registrados",
    description = "Status dos envios no período.",
    approved = 0,
    rejected = 0,
    pending = 0
}) {
    return (
        <Card className="bg-[#18181b] border-gray-800">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-white">{title}</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    <StatItem type="approved" value={approved} />
                    <StatItem type="rejected" value={rejected} />
                    <StatItem type="pending" value={pending} />
                </div>
            </CardContent>
        </Card>
    );
}