"use client";

import { Card, CardContent } from "@/components/ui/card";

export function StatisticsMetrics({
    metrics = []
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
                <Card key={index} className="bg-[#18181b] border-gray-800">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <p className="text-gray-400 text-sm">{metric.label}</p>
                                <h3 className="text-4xl font-bold text-white">{metric.value}</h3>
                                {metric.subtitle && (
                                    <p className="text-gray-500 text-xs">{metric.subtitle}</p>
                                )}
                            </div>
                            {metric.icon && (
                                <div className="bg-[#0f0f11] p-2 rounded-lg">
                                    <metric.icon className="w-5 h-5 text-yellow-500" />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}