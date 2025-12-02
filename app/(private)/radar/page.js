"use client";

import { useQuery } from "@tanstack/react-query";
import { OpportunityCard } from "@/components/pages/radar/opportunity";
import { HeaderRadar } from "@/components/pages/radar/header";
import { EmptySection } from "@/components/common/Empty";
import { opportunityService } from "@/services/opportunity";

export default function Radar() {
    const { data: opportunities, isLoading } = useQuery({
        queryKey: ["opportunities"],
        queryFn: opportunityService.getOpportunity,
    });

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("pt-BR");
    };

    return (
        <div className="flex flex-col gap-12 animate-fadeSlideIn">
            <HeaderRadar />

            {isLoading ? (
                <div>Carregando...</div>
            ) : opportunities && opportunities.length > 0 ? (
                <div className="grid grid-cols-3 gap-12">
                    {opportunities.map((opportunity) => (
                        <OpportunityCard
                            key={opportunity.id}
                            title={opportunity.title}
                            style={opportunity.style}
                            usage={opportunity.use}
                            payment={opportunity.payment}
                            deadline={formatDate(opportunity.term)}
                            platform={opportunity.plataform}
                            url={opportunity.url}
                            buttonText="Ver Oportunidade"
                        />
                    ))}
                </div>
            ) : (
                <EmptySection
                    title={"Nenhuma oportunidade encontrada"}
                    description={"Adicione briefings e oportunidades que você encontrar para organizar seus envios."}
                />
            )}
        </div>
    );
}