"use client";

import { StatisticsSection } from "@/components/pages/dashboard/statistics";
import { MentoringSection } from "@/components/pages/dashboard/mentoring";
import { CatalogSection } from "@/components/pages/dashboard/catalog";
import { VideoLink } from "@/components/pages/dashboard/videoLink";
import { GoalSection } from "@/components/pages/dashboard/goal";
import { SectionHeader } from "@/components/common/Header";

export default function Dashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fadeSlideIn">
            <SectionHeader
                title="Meu Dashboard"
                description="Veja suas métricas"
            />

            <VideoLink />
            <MentoringSection />
            <GoalSection />
            <StatisticsSection />
            <CatalogSection />
        </div>
    );
}