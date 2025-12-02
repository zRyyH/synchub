"use client";

import { StatisticsSection } from "@/components/pages/dashboard/statistics";
import { MentoringSection } from "@/components/pages/dashboard/mentoring";
import { CatalogSection } from "@/components/pages/dashboard/catalog";
import { VideoLink } from "@/components/pages/dashboard/videoLink";
import { GoalSection } from "@/components/pages/dashboard/goal";
import { useQuery } from '@tanstack/react-query';
import { userService } from "@/services/user";

export default function Dashboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getMe,
    })

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fadeSlideIn">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-4xl text-white font-bold">Olá, {data?.first_name}!</h1>
                <p className="text-gray-400">
                    Este é o seu centro de comando. Visualize suas estatísticas, gerencie suas músicas
                    e encontre novas oportunidades.
                </p>
            </div>

            <VideoLink />
            <MentoringSection />
            <GoalSection />
            <StatisticsSection />
            <CatalogSection />
        </div>
    );
}