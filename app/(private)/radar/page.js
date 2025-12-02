"use client";

import { OpportunityCard } from "@/components/pages/radar/opportunity";
import { HeaderRadar } from "@/components/pages/radar/header";
import { EmptyRadar } from "@/components/common/Empty";

export default function Radar() {
    return (
        <div className="flex flex-col gap-12">
            <HeaderRadar />

            <div className="grid grid-cols-3 gap-12">
                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />

                <OpportunityCard
                    title="Seletiva Humilharte 2025 (Agenciamento Gospel)"
                    style="Gospel / Pop cristão"
                    usage="Seleção para gravação e agenciamento"
                    payment="Produção para selecionados"
                    deadline="15/12/2025"
                    platform="Humilharte Produções"
                    buttonText="Ver Oportunidade"
                    onButtonClick={() => { }}
                />
            </div>

            <EmptyRadar
                title={"Nenhuma oportunidade encontrada"}
                description={"Adicione briefings e oportunidades que você encontrar para organizar seus envios."}
            />
        </div>
    );
}