"use client";

import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function StatisticsInsights({
    title = "Insights Automáticos",
    description = "Dicas com base na sua atividade recente.",
    insights = []
}) {
    return (
        <Card className="bg-[#18181b] border-gray-800">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-white">{title}</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {insights.map((insight, index) => (
                    <Alert
                        key={index}
                        className="bg-[#0f0f11] border-gray-800 text-gray-300"
                    >
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <AlertDescription>{insight}</AlertDescription>
                    </Alert>
                ))}
            </CardContent>
        </Card>
    );
}